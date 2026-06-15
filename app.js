// =============================================
// PERSISTÊNCIA (localStorage)
// =============================================
const STORAGE_KEY = "cromosMundial_v1";
const HISTORY_KEY = "cromosMundial_ultimos_v1";
const MAX_ULTIMOS_CROMOS = 5;

function estruturaInicial() {
  const inicial = {};
  Object.keys(CADERNETA).forEach(s => inicial[s] = {});
  return inicial;
}

function carregarDados() {
  const dados = localStorage.getItem(STORAGE_KEY);
  if (!dados) return estruturaInicial();

  try {
    const parsed = JSON.parse(dados);
    return parsed && typeof parsed === "object" ? parsed : estruturaInicial();
  } catch {
    return estruturaInicial();
  }
}

function normalizarColecao(dados) {
  const normalizada = estruturaInicial();
  Object.entries(dados || {}).forEach(([sec, cromos]) => {
    normalizada[sec] = cromos && typeof cromos === "object" ? cromos : {};
  });
  return normalizada;
}

function guardarDados(dados) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

function carregarHistoricoAdicionados() {
  try {
    const dados = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(dados) ? dados.slice(0, MAX_ULTIMOS_CROMOS) : [];
  } catch {
    return [];
  }
}

function guardarHistoricoAdicionados() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(ultimosCromosAdicionados.slice(0, MAX_ULTIMOS_CROMOS)));
}

let colecao = normalizarColecao(carregarDados());
let ultimosCromosAdicionados = carregarHistoricoAdicionados();

// Estados temporários de seleção
let temporarioCadastro = {};      // { numeroCromo: quantidade }
let sequenciaCadastro = [];       // ordem real dos cliques no cadastro
let temporarioTrocaDei = {};      // { selecao: { numeroCromo: quantidade } }
let temporarioTrocaRecebi = {};   // { selecao: { numeroCromo: quantidade } }

let vistaAtual = "menu";
let indiceSelecaoLista = 0;
let selecaoDetalheAtual = null;
let selecaoCadastroAtual = "";

// =============================================
// AUXILIARES GERAIS
// =============================================
function nomesSelecoes() {
  return Object.keys(CADERNETA);
}

function escapeHtml(valor) {
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function totalQuantidades(obj) {
  return Object.values(obj || {}).reduce((soma, qtd) => soma + Math.max(0, Number(qtd) || 0), 0);
}

function temValoresPositivos(obj) {
  return totalQuantidades(obj) > 0;
}

function temValoresPositivosAgrupados(obj) {
  return Object.values(obj || {}).some(grupo => temValoresPositivos(grupo));
}

function cadastroTemAlteracoesPorGuardar() {
  return temValoresPositivos(temporarioCadastro);
}

function trocasTemAlteracoesPorGuardar() {
  return temValoresPositivosAgrupados(temporarioTrocaDei) || temValoresPositivosAgrupados(temporarioTrocaRecebi);
}

function existemAlteracoesPorGuardar() {
  return cadastroTemAlteracoesPorGuardar() || trocasTemAlteracoesPorGuardar();
}

function confirmarSaidaSemGuardar() {
  if (vistaAtual === "cadastrar" && cadastroTemAlteracoesPorGuardar()) {
    return confirm("Tens cromos selecionados no cadastro que ainda não foram guardados. Queres sair e perder esta seleção?");
  }

  if (vistaAtual === "trocas" && trocasTemAlteracoesPorGuardar()) {
    return confirm("Tens uma troca configurada que ainda não foi gravada. Queres sair e perder esta seleção?");
  }

  return true;
}

function limparTemporariosDaVista(vista) {
  if (vista === "cadastrar") {
    temporarioCadastro = {};
    sequenciaCadastro = [];
  }

  if (vista === "trocas") {
    temporarioTrocaDei = {};
    temporarioTrocaRecebi = {};
  }
}

function calcularResumoSelecao(sec) {
  const info = CADERNETA[sec];
  const total = info?.cromos.length || 0;
  const guardados = colecao[sec] || {};
  let tenho = 0;
  let repetidos = 0;

  for (let i = 1; i <= total; i++) {
    const q = Number(guardados[i] || 0);
    if (q >= 1) tenho++;
    if (q > 1) repetidos += (q - 1);
  }

  const pct = total ? (tenho / total) * 100 : 0;
  return { total, tenho, repetidos, falta: total - tenho, pct, completa: total > 0 && tenho === total };
}

function dadosCromo(sec, numero) {
  const info = CADERNETA[sec];
  return {
    sec,
    numero: Number(numero),
    tag: `${info.prefixo} ${numero}`,
    nome: info.cromos[Number(numero) - 1] || `Cromo ${numero}`
  };
}

// =============================================
// NAVEGAÇÃO
// =============================================
function mostrarVista(vista, opcoes = {}) {
  const targetView = document.getElementById(`view-${vista}`);
  if (!targetView) return;

  const forcar = Boolean(opcoes.forcar);
  if (!forcar && vista === vistaAtual) return;

  if (!forcar && vista !== vistaAtual) {
    if (!confirmarSaidaSemGuardar()) return;
    limparTemporariosDaVista(vistaAtual);
  }

  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  targetView.classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.querySelector(`.nav-btn[data-view="${vista}"]`)?.classList.add("active");

  vistaAtual = vista;

  // Limpa mensagens ao trocar de página
  ocultarMensagem("Cadastro");
  ocultarMensagem("Troca");
  ocultarMensagem("Dados");

  if (vista === "menu") renderEstatisticasGlobais();
  if (vista === "selecoes") renderListaSelecoes();
  if (vista === "cadastrar") prepararCadastro();
  if (vista === "trocas") renderTrocas();
  if (vista === "estatisticas") renderEstatisticasPagina();
  if (vista === "dados") renderDados();
}

document.querySelectorAll("[data-view]").forEach(el => {
  el.addEventListener("click", () => mostrarVista(el.dataset.view));
});

window.addEventListener("beforeunload", (event) => {
  if (!existemAlteracoesPorGuardar()) return;
  event.preventDefault();
  event.returnValue = "";
});

// Auxiliar para preencher os elementos <select> de forma unificada
function popularDropdowns() {
  const selects = [
    document.getElementById("selectSelecaoCadastro"),
    document.getElementById("selectSelecaoTrocaDei"),
    document.getElementById("selectSelecaoTrocaRecebi")
  ];

  selects.forEach(sel => {
    if (!sel || sel.options.length > 0) return;
    nomesSelecoes().forEach(sec => sel.add(new Option(sec, sec)));
  });
}

// Auxiliares de Feedback Visual
function mostrarMensagem(tipo, texto, erro = false) {
  const msgEl = document.getElementById(`mensagem${tipo}`);
  if (!msgEl) return;
  msgEl.textContent = texto;
  msgEl.classList.remove("hidden");
  msgEl.classList.toggle("erro", erro);
}

function ocultarMensagem(tipo) {
  const msgEl = document.getElementById(`mensagem${tipo}`);
  if (msgEl) msgEl.classList.add("hidden");
}

// =============================================
// MENU - Estatísticas Rápidas
// =============================================
function renderEstatisticasGlobais() {
  let total = 0, tenho = 0, repetidos = 0;

  nomesSelecoes().forEach(sec => {
    const resumo = calcularResumoSelecao(sec);
    total += resumo.total;
    tenho += resumo.tenho;
    repetidos += resumo.repetidos;
  });

  const pct = total ? ((tenho / total) * 100).toFixed(1) : "0.0";
  const globalStats = document.getElementById("globalStats");
  if (!globalStats) return;

  globalStats.innerHTML = `
    <div class="stats-hero">
      <span class="eyebrow">Progresso total</span>
      <strong>${pct}%</strong>
      <span>${tenho} / ${total} cromos colecionados</span>
      <small>🔁 ${repetidos} repetidos disponíveis</small>
    </div>
  `;
}

// =============================================
// SELEÇÕES - Lista e Detalhe Interno
// =============================================
function selecoesFiltradas() {
  const filtro = document.getElementById("filtroSelecoes")?.value.toLowerCase().trim() || "";
  return nomesSelecoes().filter(sec => !filtro || sec.toLowerCase().includes(filtro));
}

function atualizarIndicadorLista(nomes) {
  const indicador = document.getElementById("indicadorSelecaoLista");
  if (!indicador) return;
  indicador.textContent = nomes.length ? `${indiceSelecaoLista + 1} / ${nomes.length}` : "0 / 0";
}

function renderListaSelecoes() {
  document.getElementById("detalheSelecao")?.classList.add("hidden");
  document.getElementById("listaSelecoes")?.classList.remove("hidden");
  document.getElementById("filtroSelecoes")?.classList.remove("hidden");
  document.getElementById("navSelecoesLista")?.classList.remove("hidden");

  const nomes = selecoesFiltradas();
  const cont = document.getElementById("listaSelecoes");
  if (!cont) return;
  cont.innerHTML = "";

  if (indiceSelecaoLista >= nomes.length) indiceSelecaoLista = 0;
  if (indiceSelecaoLista < 0) indiceSelecaoLista = Math.max(0, nomes.length - 1);
  atualizarIndicadorLista(nomes);

  if (nomes.length === 0) {
    cont.innerHTML = "<p class='empty-state'>Nenhuma seleção encontrada.</p>";
    return;
  }

  nomes.forEach((sec, index) => {
    const resumo = calcularResumoSelecao(sec);
    const pctArredondada = resumo.pct.toFixed(0);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `selecao-card ${resumo.completa ? "completa" : ""} ${index === indiceSelecaoLista ? "em-foco" : ""}`;
    card.dataset.selecao = sec;
    card.innerHTML = `
      <div class="selecao-card-topo">
        <h3>${escapeHtml(sec)}</h3>
        <span class="mini-pct">${pctArredondada}%</span>
      </div>
      ${resumo.completa ? `<div class="completo-destaque"><strong>100%</strong><span>Completa</span></div>` : ""}
      <div class="progresso">${resumo.tenho} / ${resumo.total}</div>
      <div class="barra-progresso"><div class="preenchido" style="width:${resumo.pct}%"></div></div>
    `;
    card.addEventListener("click", () => mostrarDetalheSelecao(sec));
    cont.appendChild(card);
  });
}

function navegarListaSelecoes(delta) {
  const nomes = selecoesFiltradas();
  if (nomes.length === 0) return;
  indiceSelecaoLista = (indiceSelecaoLista + delta + nomes.length) % nomes.length;
  renderListaSelecoes();

  requestAnimationFrame(() => {
    const alvo = Array.from(document.querySelectorAll(".selecao-card"))
      .find(card => card.dataset.selecao === nomes[indiceSelecaoLista]);
    alvo?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  });
}

function mostrarDetalheSelecao(sec) {
  if (!CADERNETA[sec]) return;
  selecaoDetalheAtual = sec;

  document.getElementById("listaSelecoes")?.classList.add("hidden");
  document.getElementById("filtroSelecoes")?.classList.add("hidden");
  document.getElementById("navSelecoesLista")?.classList.add("hidden");
  document.getElementById("detalheSelecao")?.classList.remove("hidden");
  document.getElementById("nomeSelecao").textContent = sec;

  const nomes = nomesSelecoes();
  const idx = nomes.indexOf(sec);
  const indicador = document.getElementById("indicadorSelecaoDetalhe");
  if (indicador) indicador.textContent = `${idx + 1} / ${nomes.length}`;

  const info = CADERNETA[sec];
  const total = info.cromos.length;
  const cromosGuardados = colecao[sec] || {};
  const tenho = [], falta = [], repetidos = [];

  for (let i = 1; i <= total; i++) {
    const q = Number(cromosGuardados[i] || 0);
    const itemDados = { tag: `${info.prefixo} ${i}`, nome: info.cromos[i - 1], qtd: q };

    if (q === 0) falta.push(itemDados);
    else {
      tenho.push(itemDados);
      if (q > 1) repetidos.push({ ...itemDados, repetidosQtd: q - 1 });
    }
  }

  document.getElementById("countTenho").textContent = tenho.length;
  document.getElementById("countFalta").textContent = falta.length;
  document.getElementById("countRepetidos").textContent = repetidos.length;

  const mapearHtmlCromo = (classe, c, extra = "") => `
    <div class="cromo ${classe}">
      <span class="num">${escapeHtml(c.tag)}</span>
      <span class="nome">${escapeHtml(c.nome)}</span>
      ${extra}
    </div>
  `;

  document.getElementById("listaTenho").innerHTML = tenho.map(c => mapearHtmlCromo("tenho", c)).join("") || "<em>Nenhum</em>";
  document.getElementById("listaFalta").innerHTML = falta.map(c => mapearHtmlCromo("falta", c)).join("") || "<em>Nenhum</em>";
  document.getElementById("listaRepetidos").innerHTML = repetidos.map(c => mapearHtmlCromo("repetido", c, `<span class="qtd">x${c.repetidosQtd}</span>`)).join("") || "<em>Nenhum</em>";
}

function navegarDetalheSelecao(delta) {
  const nomes = nomesSelecoes();
  const atual = nomes.indexOf(selecaoDetalheAtual);
  const proximo = (atual + delta + nomes.length) % nomes.length;
  mostrarDetalheSelecao(nomes[proximo]);
}

document.getElementById("filtroSelecoes")?.addEventListener("input", () => {
  indiceSelecaoLista = 0;
  renderListaSelecoes();
});
document.getElementById("voltarSelecoes")?.addEventListener("click", renderListaSelecoes);
document.getElementById("btnSelecaoAnteriorLista")?.addEventListener("click", () => navegarListaSelecoes(-1));
document.getElementById("btnSelecaoSeguinteLista")?.addEventListener("click", () => navegarListaSelecoes(1));
document.getElementById("btnSelecaoAnteriorDetalhe")?.addEventListener("click", () => navegarDetalheSelecao(-1));
document.getElementById("btnSelecaoSeguinteDetalhe")?.addEventListener("click", () => navegarDetalheSelecao(1));

// =============================================
// CADASTRAR - Adicionar novos cromos
// =============================================
function prepararCadastro() {
  popularDropdowns();
  const sel = document.getElementById("selectSelecaoCadastro");
  if (!sel) return;
  if (!selecaoCadastroAtual) selecaoCadastroAtual = sel.value || nomesSelecoes()[0] || "";
  sel.value = selecaoCadastroAtual;
  renderCadastro();
}

function atualizarIndicadorCadastro(sec) {
  const indicador = document.getElementById("indicadorCadastro");
  if (!indicador) return;

  const nomes = nomesSelecoes();
  const idx = nomes.indexOf(sec);
  indicador.textContent = idx >= 0 ? `${idx + 1} / ${nomes.length}` : "0 / 0";
}

function renderCadastro() {
  popularDropdowns();
  const sel = document.getElementById("selectSelecaoCadastro");
  const sec = selecaoCadastroAtual || sel?.value;
  if (!sec || !CADERNETA[sec]) return;

  if (sel) sel.value = sec;
  atualizarIndicadorCadastro(sec);

  const info = CADERNETA[sec];
  const total = info.cromos.length;
  const cont = document.getElementById("cromosCadastro");
  if (!cont) return;
  cont.innerHTML = "";

  for (let i = 1; i <= total; i++) {
    const nome = info.cromos[i - 1];
    const tagCompleta = `${info.prefixo} ${i}`;
    const qtdTemp = Number(temporarioCadastro[i] || 0);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `cromo-btn ${qtdTemp > 0 ? "selecionado" : ""}`;
    btn.innerHTML = `
      <span class="num-cromo">${escapeHtml(tagCompleta)}</span>
      <span class="nome-cromo" title="${escapeHtml(nome)}">${escapeHtml(nome)}</span>
      ${qtdTemp > 0 ? `<span class="badge">${qtdTemp}</span>` : ""}
    `;
    btn.addEventListener("click", () => {
      temporarioCadastro[i] = (Number(temporarioCadastro[i]) || 0) + 1;
      sequenciaCadastro.push(i);
      ocultarMensagem("Cadastro");
      renderCadastro();
    });
    cont.appendChild(btn);
  }
}

function alterarSelecaoCadastro(novaSec) {
  const sel = document.getElementById("selectSelecaoCadastro");
  if (!novaSec || novaSec === selecaoCadastroAtual) {
    if (sel) sel.value = selecaoCadastroAtual;
    return;
  }

  if (cadastroTemAlteracoesPorGuardar()) {
    const sair = confirm("Tens cromos selecionados que ainda não foram cadastrados. Queres mudar de seleção e perder esta escolha?");
    if (!sair) {
      if (sel) sel.value = selecaoCadastroAtual;
      return;
    }
  }

  temporarioCadastro = {};
  sequenciaCadastro = [];
  selecaoCadastroAtual = novaSec;
  ocultarMensagem("Cadastro");
  renderCadastro();
}

function navegarCadastro(delta) {
  const nomes = nomesSelecoes();
  if (nomes.length === 0) return;

  const atual = nomes.indexOf(selecaoCadastroAtual || document.getElementById("selectSelecaoCadastro")?.value);
  const proximo = (atual + delta + nomes.length) % nomes.length;
  alterarSelecaoCadastro(nomes[proximo]);
}

function registarHistoricoAdicionados(itens) {
  if (!Array.isArray(itens) || itens.length === 0) return;

  const agora = new Date().toISOString();
  const novos = itens.map((item, index) => ({ ...item, data: agora, id: `${Date.now()}-${index}` })).reverse();
  ultimosCromosAdicionados = [...novos, ...ultimosCromosAdicionados].slice(0, MAX_ULTIMOS_CROMOS);
  guardarHistoricoAdicionados();
}

function formatarUltimosAdicionados() {
  if (ultimosCromosAdicionados.length === 0) return "";

  return ultimosCromosAdicionados
    .slice(0, MAX_ULTIMOS_CROMOS)
    .map((c, index) => `${index + 1}. ${c.tag} — ${c.nome} (${c.sec})`)
    .join("\n");
}

document.getElementById("selectSelecaoCadastro")?.addEventListener("change", (e) => alterarSelecaoCadastro(e.target.value));
document.getElementById("btnCadastroAnterior")?.addEventListener("click", () => navegarCadastro(-1));
document.getElementById("btnCadastroSeguinte")?.addEventListener("click", () => navegarCadastro(1));

document.getElementById("btnLimparSelecao")?.addEventListener("click", () => {
  temporarioCadastro = {};
  sequenciaCadastro = [];
  renderCadastro();
  ocultarMensagem("Cadastro");
});

document.getElementById("btnConfirmarCadastro")?.addEventListener("click", () => {
  const sec = document.getElementById("selectSelecaoCadastro")?.value;
  if (!sec || totalQuantidades(temporarioCadastro) === 0) {
    mostrarMensagem("Cadastro", "Nenhum cromo selecionado para cadastro!", true);
    return;
  }

  if (!colecao[sec]) colecao[sec] = {};
  let somados = 0;

  Object.entries(temporarioCadastro).forEach(([num, qtd]) => {
    const n = Number(num);
    const quantidade = Number(qtd) || 0;
    if (quantidade <= 0) return;
    colecao[sec][n] = (Number(colecao[sec][n]) || 0) + quantidade;
    somados += quantidade;
  });

  const adicionadosDaConfirmacao = sequenciaCadastro.length
    ? sequenciaCadastro.map(num => dadosCromo(sec, num))
    : Object.entries(temporarioCadastro).flatMap(([num, qtd]) => Array.from({ length: Number(qtd) || 0 }, () => dadosCromo(sec, num)));

  registarHistoricoAdicionados(adicionadosDaConfirmacao);
  guardarDados(colecao);
  temporarioCadastro = {};
  sequenciaCadastro = [];
  renderCadastro();

  const ultimos = formatarUltimosAdicionados();
  mostrarMensagem(
    "Cadastro",
    `Sucesso! Adicionados ${somados} cromos à equipa ${sec}.\n\nÚltimos ${Math.min(MAX_ULTIMOS_CROMOS, ultimosCromosAdicionados.length)} cromos adicionados:\n${ultimos}`,
    false
  );
});

// =============================================
// TROCAS - Gerir saídas e entradas
// =============================================
function renderTrocas() {
  popularDropdowns();
  renderTrocaDei();
  renderTrocaRecebi();
}

function renderTrocaDei() {
  const sec = document.getElementById("selectSelecaoTrocaDei")?.value;
  const cont = document.getElementById("cromosTrocaDei");
  if (!cont) return;
  cont.innerHTML = "";
  if (!sec) return;

  const info = CADERNETA[sec];
  const total = info.cromos.length;
  const guardados = colecao[sec] || {};

  for (let i = 1; i <= total; i++) {
    const totalQtd = Number(guardados[i] || 0);
    const repDisponiveis = totalQtd > 1 ? totalQtd - 1 : 0;
    const qtdTemp = Number(temporarioTrocaDei[sec]?.[i] || 0);

    if (repDisponiveis === 0 && qtdTemp === 0) continue;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `cromo-btn ${qtdTemp > 0 ? "selecionado" : ""}`;
    btn.innerHTML = `
      <span class="num-cromo">${escapeHtml(info.prefixo)} ${i}</span>
      <span class="nome-cromo">${escapeHtml(info.cromos[i - 1])}</span>
      <small class="hint-cromo">Repetidos: ${repDisponiveis}</small>
      ${qtdTemp > 0 ? `<span class="badge">${qtdTemp}</span>` : ""}
    `;
    btn.addEventListener("click", () => {
      if (!temporarioTrocaDei[sec]) temporarioTrocaDei[sec] = {};
      if (qtdTemp < repDisponiveis) {
        temporarioTrocaDei[sec][i] = qtdTemp + 1;
      } else {
        delete temporarioTrocaDei[sec][i];
      }
      ocultarMensagem("Troca");
      renderTrocaDei();
    });
    cont.appendChild(btn);
  }

  if (cont.innerHTML === "") {
    cont.innerHTML = "<em class='empty-state'>Sem repetidos nesta seleção.</em>";
  }
}

function renderTrocaRecebi() {
  const sec = document.getElementById("selectSelecaoTrocaRecebi")?.value;
  const cont = document.getElementById("cromosTrocaRecebi");
  if (!cont) return;
  cont.innerHTML = "";
  if (!sec) return;

  const info = CADERNETA[sec];
  const total = info.cromos.length;

  for (let i = 1; i <= total; i++) {
    const qtdTemp = Number(temporarioTrocaRecebi[sec]?.[i] || 0);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `cromo-btn ${qtdTemp > 0 ? "selecionado" : ""}`;
    btn.innerHTML = `
      <span class="num-cromo">${escapeHtml(info.prefixo)} ${i}</span>
      <span class="nome-cromo">${escapeHtml(info.cromos[i - 1])}</span>
      ${qtdTemp > 0 ? `<span class="badge">${qtdTemp}</span>` : ""}
    `;
    btn.addEventListener("click", () => {
      if (!temporarioTrocaRecebi[sec]) temporarioTrocaRecebi[sec] = {};
      temporarioTrocaRecebi[sec][i] = (Number(temporarioTrocaRecebi[sec][i]) || 0) + 1;
      ocultarMensagem("Troca");
      renderTrocaRecebi();
    });
    cont.appendChild(btn);
  }
}

document.getElementById("selectSelecaoTrocaDei")?.addEventListener("change", renderTrocaDei);
document.getElementById("selectSelecaoTrocaRecebi")?.addEventListener("change", renderTrocaRecebi);

document.getElementById("btnLimparTroca")?.addEventListener("click", () => {
  temporarioTrocaDei = {};
  temporarioTrocaRecebi = {};
  renderTrocas();
  ocultarMensagem("Troca");
});

document.getElementById("btnConfirmarTroca")?.addEventListener("click", () => {
  let alterado = false;
  let dados = 0;
  let recebidos = 0;

  // Remover os que dei
  Object.entries(temporarioTrocaDei).forEach(([sec, itens]) => {
    Object.entries(itens).forEach(([num, qtd]) => {
      const quantidade = Number(qtd) || 0;
      if (quantidade > 0 && colecao[sec]?.[num]) {
        colecao[sec][num] = Math.max(0, Number(colecao[sec][num]) - quantidade);
        alterado = true;
        dados += quantidade;
      }
    });
  });

  // Adicionar os que recebi
  Object.entries(temporarioTrocaRecebi).forEach(([sec, itens]) => {
    if (!colecao[sec]) colecao[sec] = {};
    Object.entries(itens).forEach(([num, qtd]) => {
      const quantidade = Number(qtd) || 0;
      if (quantidade > 0) {
        colecao[sec][num] = (Number(colecao[sec][num]) || 0) + quantidade;
        alterado = true;
        recebidos += quantidade;
      }
    });
  });

  if (!alterado) {
    mostrarMensagem("Troca", "Nenhum cromo configurado para a troca.", true);
    return;
  }

  guardarDados(colecao);
  temporarioTrocaDei = {};
  temporarioTrocaRecebi = {};
  renderTrocas();
  mostrarMensagem("Troca", `Troca efetuada e gravada com sucesso!\n📤 Dados: ${dados}\n📥 Recebidos: ${recebidos}`, false);
});

// =============================================
// ESTATÍSTICAS - Painel Completo Detalhado
// =============================================
function renderEstatisticasPagina() {
  let gTotal = 0, gTenho = 0, gRepetidos = 0;
  let htmlFilas = "";

  nomesSelecoes().forEach(sec => {
    const resumo = calcularResumoSelecao(sec);
    gTotal += resumo.total;
    gTenho += resumo.tenho;
    gRepetidos += resumo.repetidos;

    htmlFilas += `
      <div class="stat-row ${resumo.completa ? "completa" : ""}">
        <div class="info-sel">
          <span class="nome-sel">${escapeHtml(sec)}</span>
          <span class="detalhes">Adquiridos: ${resumo.tenho} | Restam: ${resumo.falta} | Repetidos: ${resumo.repetidos}</span>
        </div>
        <span class="pct">${resumo.pct.toFixed(0)}%</span>
      </div>
    `;
  });

  const gFalta = gTotal - gTenho;
  const gPct = gTotal ? ((gTenho / gTotal) * 100).toFixed(1) : "0.0";

  document.getElementById("statsGerais").innerHTML = `
    <div class="stat-card primary"><span class="valor">${gPct}%</span><span class="label">Concluído</span></div>
    <div class="stat-card success"><span class="valor">${gTenho}</span><span class="label">Colecionados</span></div>
    <div class="stat-card danger"><span class="valor">${gFalta}</span><span class="label">Em falta</span></div>
    <div class="stat-card warning"><span class="valor">${gRepetidos}</span><span class="label">Repetidos</span></div>
  `;

  document.getElementById("statsSelecoes").innerHTML = htmlFilas;
}

// =============================================
// GESTÃO DE DADOS - Backup, Reset & Cloud Sync
// =============================================
function renderDados() {
  const token = localStorage.getItem("gh_token") || "";
  const gistId = localStorage.getItem("gh_gist_id") || "";

  const tokenInp = document.getElementById("ghToken");
  const gistInp = document.getElementById("ghGistId");

  if (tokenInp && !tokenInp.value) tokenInp.value = token;
  if (gistInp && !gistInp.value) gistInp.value = gistId;
}

document.getElementById("btnExportar")?.addEventListener("click", () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(colecao, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", `backup_caderneta_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  mostrarMensagem("Dados", "Ficheiro JSON exportado!", false);
});

document.getElementById("inputImportar")?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const parsed = JSON.parse(evt.target.result);
      if (parsed && typeof parsed === "object") {
        colecao = normalizarColecao(parsed);
        guardarDados(colecao);
        mostrarMensagem("Dados", "Backup importado com sucesso!", false);
      } else {
        throw new Error();
      }
    } catch {
      mostrarMensagem("Dados", "Erro: Ficheiro JSON inválido ou corrompido.", true);
    }
  };
  reader.readAsText(file);
});

document.getElementById("btnReset")?.addEventListener("click", () => {
  if (confirm("ATENÇÃO: Tens a certeza absoluta de que queres apagar TODA a tua coleção local?")) {
    colecao = estruturaInicial();
    guardarDados(colecao);
    mostrarMensagem("Dados", "A tua caderneta foi totalmente limpa.", false);
  }
});

document.getElementById("btnSaveConfig")?.addEventListener("click", () => {
  const token = document.getElementById("ghToken").value.trim();
  const gistId = document.getElementById("ghGistId").value.trim();
  localStorage.setItem("gh_token", token);
  localStorage.setItem("gh_gist_id", gistId);
  mostrarMensagem("Dados", "Configurações guardadas neste browser.", false);
});

document.getElementById("btnSaveCloud")?.addEventListener("click", async () => {
  const token = document.getElementById("ghToken").value.trim();
  let gistId = document.getElementById("ghGistId").value.trim();

  if (!token) {
    mostrarMensagem("Dados", "Erro: O GitHub Token é obrigatório.", true);
    return;
  }

  mostrarMensagem("Dados", "A enviar dados para o Gist...", false);

  const payload = {
    description: "Backup da Caderneta de Cromos Mundial 2026",
    public: false,
    files: { "cromos_mundial.json": { content: JSON.stringify(colecao, null, 2) } }
  };

  const url = gistId ? `https://api.github.com/gists/${gistId}` : "https://api.github.com/gists";
  const method = gistId ? "PATCH" : "POST";

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error();

    const data = await res.json();
    if (!gistId) {
      gistId = data.id;
      document.getElementById("ghGistId").value = gistId;
      localStorage.setItem("gh_gist_id", gistId);
    }
    localStorage.setItem("gh_token", token);
    mostrarMensagem("Dados", `Sincronizado! Dados salvos na nuvem.\nGist ID: ${gistId}`, false);
  } catch {
    mostrarMensagem("Dados", "Erro na comunicação remota com a API do GitHub.", true);
  }
});

document.getElementById("btnLoadCloud")?.addEventListener("click", async () => {
  const token = document.getElementById("ghToken").value.trim();
  const gistId = document.getElementById("ghGistId").value.trim();

  if (!token || !gistId) {
    mostrarMensagem("Dados", "Falta introduzir o Token ou o Gist ID.", true);
    return;
  }

  mostrarMensagem("Dados", "A descarregar da nuvem...", false);

  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "GET",
      headers: { "Authorization": `token ${token}`, "Accept": "application/vnd.github.v3+json" }
    });

    if (!res.ok) throw new Error();

    const data = await res.json();
    const content = data.files["cromos_mundial.json"]?.content;

    if (content) {
      colecao = normalizarColecao(JSON.parse(content));
      guardarDados(colecao);
      mostrarMensagem("Dados", "Fantástico! Dados descarregados da nuvem e aplicados localmente.", false);
    } else {
      mostrarMensagem("Dados", "Ficheiro 'cromos_mundial.json' inexistente no Gist informado.", true);
    }
  } catch {
    mostrarMensagem("Dados", "Erro ao obter dados da nuvem. Verifica os teus acessos.", true);
  }
});

// =============================================
// INICIALIZAÇÃO DA APLICAÇÃO
// =============================================
guardarDados(colecao);
mostrarVista("menu", { forcar: true });

// =============================================
// PERSISTÊNCIA (localStorage)
// =============================================
const STORAGE_KEY = "cromosMundial_v1";

function carregarDados() {
  const dados = localStorage.getItem(STORAGE_KEY);
  if (dados) return JSON.parse(dados);
  
  // Cria a estrutura inicial com base na CADERNETA carregada do cromos.js
  const inicial = {};
  Object.keys(CADERNETA).forEach(s => inicial[s] = {});
  return inicial;
}

function guardarDados(dados) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

let colecao = carregarDados();

// Estados temporários de seleção
let temporarioCadastro = {};   // { numeroCromo: quantidade }
let temporarioTrocaDei = {};    // { selecao: { numeroCromo: quantidade } }
let temporarioTrocaRecebi = {}; // { selecao: { numeroCromo: quantidade } }

// =============================================
// NAVEGAÇÃO
// =============================================
function mostrarVista(vista) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const targetView = document.getElementById(`view-${vista}`);
  if (targetView) targetView.classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.querySelector(`.nav-btn[data-view="${vista}"]`)?.classList.add("active");

  // Limpa mensagens ao trocar de página
  ocultarMensagem("Cadastro");
  ocultarMensagem("Troca");
  ocultarMensagem("Dados");

  if (vista === "menu") renderEstatisticasGlobais();
  if (vista === "selecoes") renderListaSelecoes();
  if (vista === "cadastrar") { temporarioCadastro = {}; renderCadastro(); }
  if (vista === "trocas") { temporarioTrocaDei = {}; temporarioTrocaRecebi = {}; renderTrocas(); }
  if (vista === "estatisticas") renderEstatisticasPagina();
  if (vista === "dados") renderDados();
}

document.querySelectorAll("[data-view]").forEach(el => {
  el.addEventListener("click", () => mostrarVista(el.dataset.view));
});

// Auxiliar para preencher os elementos <select> de forma unificada
function popularDropdowns() {
  const selCadastro = document.getElementById("selectSelecaoCadastro");
  const selTrocaDei = document.getElementById("selectSelecaoTrocaDei");
  const selTrocaRecebi = document.getElementById("selectSelecaoTrocaRecebi");

  if (selCadastro && selCadastro.options.length === 0) {
    Object.keys(CADERNETA).forEach(sec => {
      selCadastro.add(new Option(sec, sec));
      selTrocaDei.add(new Option(sec, sec));
      selTrocaRecebi.add(new Option(sec, sec));
    });
  }
}

// Auxiliares de Feedback Visual
function mostrarMensagem(tipo, texto, erro = false) {
  const msgEl = document.getElementById(`mensagem${tipo}`);
  if (msgEl) {
    msgEl.textContent = texto;
    msgEl.classList.remove("hidden");
    if (erro) msgEl.classList.add("erro");
    else msgEl.classList.remove("erro");
  }
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

  Object.entries(CADERNETA).forEach(([sec, info]) => {
    const qtdSeccao = info.cromos.length;
    total += qtdSeccao;
    const cromosGuardados = colecao[sec] || {};

    for (let i = 1; i <= qtdSeccao; i++) {
      const q = cromosGuardados[i] || 0;
      if (q >= 1) tenho++;
      if (q > 1) repetidos += (q - 1);
    }
  });

  const pct = total ? ((tenho / total) * 100).toFixed(1) : 0;
  const globalStats = document.getElementById("globalStats");
  if (globalStats) {
    globalStats.innerHTML = `
      <h3>Progresso Total</h3>
      <p style="font-size:1.5rem;margin:0.5rem 0;">${tenho} / ${total} cromos (${pct}%)</p>
      <p style="color:var(--text-dim);">🔁 ${repetidos} repetidos</p>
    `;
  }
}

// =============================================
// SELEÇÕES - Lista e Detalhe Interno
// =============================================
function renderListaSelecoes() {
  document.getElementById("detalheSelecao").classList.add("hidden");
  document.getElementById("listaSelecoes").classList.remove("hidden");
  document.getElementById("filtroSelecoes").classList.remove("hidden");

  const filtro = document.getElementById("filtroSelecoes").value.toLowerCase();
  const cont = document.getElementById("listaSelecoes");
  cont.innerHTML = "";

  Object.entries(CADERNETA).forEach(([sec, info]) => {
    if (filtro && !sec.toLowerCase().includes(filtro)) return;
    
    const qtdTotal = info.cromos.length;
    const cromosGuardados = colecao[sec] || {};
    
    let tenho = 0;
    for (let i = 1; i <= qtdTotal; i++) {
      if ((cromosGuardados[i] || 0) >= 1) tenho++;
    }
    const pct = (tenho / qtdTotal) * 100;

    const card = document.createElement("div");
    card.className = "selecao-card";
    card.innerHTML = `
      <h3>${sec}</h3>
      <div class="progresso">${tenho} / ${qtdTotal}</div>
      <div class="barra-progresso"><div class="preenchido" style="width:${pct}%"></div></div>
    `;
    card.addEventListener("click", () => mostrarDetalheSelecao(sec));
    cont.appendChild(card);
  });
}

document.getElementById("filtroSelecoes").addEventListener("input", renderListaSelecoes);
document.getElementById("voltarSelecoes").addEventListener("click", renderListaSelecoes);

function mostrarDetalheSelecao(sec) {
  document.getElementById("listaSelecoes").classList.add("hidden");
  document.getElementById("filtroSelecoes").classList.add("hidden");
  document.getElementById("detalheSelecao").classList.remove("hidden");
  document.getElementById("nomeSelecao").textContent = sec;

  const info = CADERNETA[sec];
  const total = info.cromos.length;
  const cromosGuardados = colecao[sec] || {};
  const tenho = [], falta = [], repetidos = [];

  for (let i = 1; i <= total; i++) {
    const q = cromosGuardados[i] || 0;
    const nomeJogador = info.cromos[i - 1];
    const itemDados = { tag: `${info.prefixo} ${i}`, nome: nomeJogador, qtd: q };

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
      <span class="num">${c.tag}</span>
      <span class="nome">${c.nome}</span>
      ${extra}
    </div>
  `;

  document.getElementById("listaTenho").innerHTML = tenho.map(c => mapearHtmlCromo("tenho", c)).join("") || "<em>Nenhum</em>";
  document.getElementById("listaFalta").innerHTML = falta.map(c => mapearHtmlCromo("falta", c)).join("") || "<em>Nenhum</em>";
  document.getElementById("listaRepetidos").innerHTML = repetidos.map(c => mapearHtmlCromo("repetido", c, `<span class="qtd">x${c.repetidosQtd}</span>`)).join("") || "<em>Nenhum</em>";
}

// =============================================
// CADASTRAR - Adicionar novos cromos
// =============================================
function renderCadastro() {
  popularDropdowns();
  const sec = document.getElementById("selectSelecaoCadastro").value;
  if (!sec) return;

  const info = CADERNETA[sec];
  const total = info.cromos.length;
  const cont = document.getElementById("cromosCadastro");
  cont.innerHTML = "";

  for (let i = 1; i <= total; i++) {
    const nome = info.cromos[i - 1];
    const tagCompleta = `${info.prefixo} ${i}`;
    const qtdTemp = temporarioCadastro[i] || 0;

    const btn = document.createElement("button");
    btn.className = `cromo-btn ${qtdTemp > 0 ? "selecionado" : ""}`;
    btn.innerHTML = `
      <span class="num-cromo">${tagCompleta}</span>
      <span class="nome-cromo" title="${nome}">${nome}</span>
      ${qtdTemp > 0 ? `<span class="badge">${qtdTemp}</span>` : ""}
    `;
    btn.addEventListener("click", () => {
      temporarioCadastro[i] = (temporarioCadastro[i] || 0) + 1;
      renderCadastro();
    });
    cont.appendChild(btn);
  }
}

document.getElementById("selectSelecaoCadastro").addEventListener("change", () => {
  temporarioCadastro = {};
  renderCadastro();
});

document.getElementById("btnLimparSelecao").addEventListener("click", () => {
  temporarioCadastro = {};
  renderCadastro();
  ocultarMensagem("Cadastro");
});

document.getElementById("btnConfirmarCadastro").addEventListener("click", () => {
  const sec = document.getElementById("selectSelecaoCadastro").value;
  if (!sec || Object.keys(temporarioCadastro).length === 0) {
    mostrarMensagem("Cadastro", "Nenhum cromo selecionado para cadastro!", true);
    return;
  }

  if (!colecao[sec]) colecao[sec] = {};
  let somados = 0;

  Object.entries(temporarioCadastro).forEach(([num, qtd]) => {
    const n = parseInt(num);
    colecao[sec][n] = (colecao[sec][n] || 0) + qtd;
    somados += qtd;
  });

  guardarDados(colecao);
  temporarioCadastro = {};
  renderCadastro();
  mostrarMensagem("Cadastro", `Sucesso! Adicionados ${somados} cromos à equipa do ${sec}.`, false);
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
  const sec = document.getElementById("selectSelecaoTrocaDei").value;
  const cont = document.getElementById("cromosTrocaDei");
  cont.innerHTML = "";
  if (!sec) return;

  const info = CADERNETA[sec];
  const total = info.cromos.length;
  const guardados = colecao[sec] || {};

  for (let i = 1; i <= total; i++) {
    const totalQtd = guardados[i] || 0;
    const repDisponiveis = totalQtd > 1 ? totalQtd - 1 : 0;
    const qtdTemp = temporarioTrocaDei[sec]?.[i] || 0;

    if (repDisponiveis === 0 && qtdTemp === 0) continue;

    const btn = document.createElement("button");
    btn.className = `cromo-btn ${qtdTemp > 0 ? "selecionado" : ""}`;
    btn.innerHTML = `
      <span class="num-cromo">${info.prefixo} ${i}</span>
      <span class="nome-cromo">${info.cromos[i - 1]}</span>
      <small style="display:block;opacity:0.6;font-size:0.65rem;">Repetidos: ${repDisponiveis}</small>
      ${qtdTemp > 0 ? `<span class="badge">${qtdTemp}</span>` : ""}
    `;
    btn.addEventListener("click", () => {
      if (!temporarioTrocaDei[sec]) temporarioTrocaDei[sec] = {};
      if (qtdTemp < repDisponiveis) {
        temporarioTrocaDei[sec][i] = qtdTemp + 1;
      } else {
        temporarioTrocaDei[sec][i] = 0;
      }
      renderTrocaDei();
    });
    cont.appendChild(btn);
  }

  if (cont.innerHTML === "") {
    cont.innerHTML = "<em style='padding:0.5rem;display:block;color:var(--text-dim);font-size:0.9rem;'>Sem repetidos nesta seleção.</em>";
  }
}

function renderTrocaRecebi() {
  const sec = document.getElementById("selectSelecaoTrocaRecebi").value;
  const cont = document.getElementById("cromosTrocaRecebi");
  cont.innerHTML = "";
  if (!sec) return;

  const info = CADERNETA[sec];
  const total = info.cromos.length;

  for (let i = 1; i <= total; i++) {
    const qtdTemp = temporarioTrocaRecebi[sec]?.[i] || 0;

    const btn = document.createElement("button");
    btn.className = `cromo-btn ${qtdTemp > 0 ? "selecionado" : ""}`;
    btn.innerHTML = `
      <span class="num-cromo">${info.prefixo} ${i}</span>
      <span class="nome-cromo">${info.cromos[i - 1]}</span>
      ${qtdTemp > 0 ? `<span class="badge">${qtdTemp}</span>` : ""}
    `;
    btn.addEventListener("click", () => {
      if (!temporarioTrocaRecebi[sec]) temporarioTrocaRecebi[sec] = {};
      temporarioTrocaRecebi[sec][i] = (temporarioTrocaRecebi[sec][i] || 0) + 1;
      renderTrocaRecebi();
    });
    cont.appendChild(btn);
  }
}

document.getElementById("selectSelecaoTrocaDei").addEventListener("change", renderTrocaDei);
document.getElementById("selectSelecaoTrocaRecebi").addEventListener("change", renderTrocaRecebi);

document.getElementById("btnLimparTroca").addEventListener("click", () => {
  temporarioTrocaDei = {};
  temporarioTrocaRecebi = {};
  renderTrocas();
  ocultarMensagem("Troca");
});

document.getElementById("btnConfirmarTroca").addEventListener("click", () => {
  let alterado = false;

  // Remover os que dei
  Object.entries(temporarioTrocaDei).forEach(([sec, itens]) => {
    Object.entries(itens).forEach(([num, qtd]) => {
      if (qtd > 0 && colecao[sec]?.[num]) {
        colecao[sec][num] -= qtd;
        alterado = true;
      }
    });
  });

  // Adicionar os que recebi
  Object.entries(temporarioTrocaRecebi).forEach(([sec, itens]) => {
    if (!colecao[sec]) colecao[sec] = {};
    Object.entries(itens).forEach(([num, qtd]) => {
      if (qtd > 0) {
        colecao[sec][num] = (colecao[sec][num] || 0) + qtd;
        alterado = true;
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
  mostrarMensagem("Troca", "Troca efetuada e gravada com sucesso!", false);
});

// =============================================
// ESTATÍSTICAS - Painel Completo Detalhado
// =============================================
function renderEstatisticasPagina() {
  let gTotal = 0, gTenho = 0, gRepetidos = 0;
  let htmlFilas = "";

  Object.entries(CADERNETA).forEach(([sec, info]) => {
    const totalSec = info.cromos.length;
    gTotal += totalSec;
    const guardados = colecao[sec] || {};

    let tenhoSec = 0, repSec = 0;
    for (let i = 1; i <= totalSec; i++) {
      const q = guardados[i] || 0;
      if (q >= 1) tenhoSec++;
      if (q > 1) repSec += (q - 1);
    }

    gTenho += tenhoSec;
    gRepetidos += repSec;
    const faltaSec = totalSec - tenhoSec;
    const pctSec = totalSec ? ((tenhoSec / totalSec) * 100).toFixed(0) : 0;

    htmlFilas += `
      <div class="stat-row">
        <div class="info-sel">
          <span class="nome-sel">${sec}</span>
          <span class="detalhes">Adquiridos: ${tenhoSec} | Restam: ${faltaSec} | Repetidos: ${repSec}</span>
        </div>
        <span class="pct">${pctSec}%</span>
      </div>
    `;
  });

  const gFalta = gTotal - gTenho;
  const gPct = gTotal ? ((gTenho / gTotal) * 100).toFixed(1) : "0.0";

  document.getElementById("statsGerais").innerHTML = `
    <div class="stat-card primary"><span class="valor">${gPct}%</span><span class="label">Concluído</span></div>
    <div class="stat-card success"><span class="valor">${gTenho}</span><span class="label">Colecionados</span></div>
    <div class="stat-card danger"><span class="valor">${gFalta}</span><span class="label">Em Falta</span></div>
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

document.getElementById("btnExportar").addEventListener("click", () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(colecao, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", `backup_caderneta_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  mostrarMensagem("Dados", "Ficheiro JSON exportado!", false);
});

document.getElementById("inputImportar").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const parsed = JSON.parse(evt.target.result);
      if (parsed && typeof parsed === "object") {
        colecao = parsed;
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

document.getElementById("btnReset").addEventListener("click", () => {
  if (confirm("ATENÇÃO: Tens a certeza absoluta de que queres apagar TODA a tua coleção local?")) {
    colecao = {};
    Object.keys(CADERNETA).forEach(s => colecao[s] = {});
    guardarDados(colecao);
    mostrarMensagem("Dados", "A tua caderneta foi totalmente limpa.", false);
  }
});

document.getElementById("btnSaveConfig").addEventListener("click", () => {
  const token = document.getElementById("ghToken").value.trim();
  const gistId = document.getElementById("ghGistId").value.trim();
  localStorage.setItem("gh_token", token);
  localStorage.setItem("gh_gist_id", gistId);
  mostrarMensagem("Dados", "Configurações guardadas neste browser.", false);
});

document.getElementById("btnSaveCloud").addEventListener("click", async () => {
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
    mostrarMensagem("Dados", `Sincronizado! Dados salvos na Nuvem.\nGist ID: ${gistId}`, false);
  } catch {
    mostrarMensagem("Dados", "Erro na comunicação remota com a API do GitHub.", true);
  }
});

document.getElementById("btnLoadCloud").addEventListener("click", async () => {
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
      colecao = JSON.parse(content);
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
mostrarVista("menu");
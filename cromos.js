// =============================================================
// DADOS DOS CROMOS — Caderneta Panini FIFA World Cup 2026
// Total: 980 cromos (8 especiais FWC + 48 seleções × 20 + 12 extras)
// Edita aqui os nomes dos jogadores conforme tens na caderneta.
// =============================================================

const CADERNETA = {
  "FWC - Especiais": {
    prefixo: "FWC",
    cromos: [
      "WC Logo (1)",
      "WC Logo (2)",
      "Mascotes Oficiais",
      "Slogan Oficial",
      "Bola Oficial",
      "Emblema do pais sede - CAN",
      "Emblema do pais sede - MEX",
      "Emblema do pais sede - USA",
      "Itália 1934",
      "Uruguai 1950",
      "Alemanha 1954",
      "Brazil 1962",
      "Alemanha 1974",
      "Argentina 1986",
      "Brazil 1994",
      "Brazil 2002",
      "Italia 2006",
      "Alemanha 2014",
      "Argentina 2022",

    ]
  }, // Grp A
  "México (MEX)": {
    prefixo: "MEX",
    cromos: ["Escudo", "Luis Malagón", "Johan Vásquez", "Jorge Sánchez", "César Montes", "Jesús Gallardo", "Israel Reyes", "Diego Lainez", "Carlos Rodríguez", "Edson Álvarez", "Orbelín Pineda", "Marcel Ruiz", "Foto de equipa", "Hirving Lozano", "Raúl Jiménez", "Santiago Giménez", "Alexis Vega", "Julián Quiñones", "Henry Martín", "Uriel Antuna"]
  }, 
  "África do Sul (RSA)": {
    prefixo: "RSA",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Coreia do Sul (KOR)": {
    prefixo: "KOR",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Chéquia (CZE)": {
    prefixo: "CZE",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, //Grp B
  "Canadá (CAN)": {
    prefixo: "CAN",
    cromos: ["Escudo", "Maxime Crépeau", "Dayne St. Clair", "Alistair Johnston", "Moïse Bombito", "Derek Cornelius", "Sam Adekugbe", "Alphonso Davies", "Stephen Eustáquio", "Jonathan Osorio", "Ismaël Koné", "Mathieu Choinière", "Foto de equipa", "Tajon Buchanan", "Jacob Shaffelburg", "Jonathan David", "Cyle Larin", "Lucas Cavallini", "Theo Bair", "Daniel Jebbison"]
  },
  "Bósnia e Herzegovina (BIH)": {
    prefixo: "BIH",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Qatar (QAT)": {
    prefixo: "QAT",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Suíça (SUI)": {
    prefixo: "SUI",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, // Grp C
  "Brasil (BRA)": {
    prefixo: "BRA",
    cromos: ["Escudo", "Alisson", "Bento", "Danilo", "Marquinhos", "Gabriel Magalhães", "Éder Militão", "Wendell", "Bruno Guimarães", "Casemiro", "Lucas Paquetá", "Rodrygo", "Foto de equipa", "Vinícius Júnior", "Endrick", "Gabriel Jesus", "Richarlison", "Savinho", "Raphinha", "Estêvão"]
  },
  "Marrocos (MAR)": {
    prefixo: "MAR",
    cromos: ["Escudo", "Yassine Bounou", "Munir El Kajoui", "Achraf Hakimi", "Noussair Mazraoui", "Nayef Aguerd", "Romain Saïss", "Jawad El Yamiq", "Adam Masina", "Sofyan Amrabat", "Azzedine Ounahi", "Eliesse Ben Seghir", "Foto de equipa", "Bilal El Khannouss", "Ismael Saibari", "Youssef En-Nesyri", "Abde Ezzalzouli", "Soufiane Rahimi", "Brahim Díaz", "Ayoub El Kaabi"]
  },
  "Haiti (HAI)": {
    prefixo: "HAI",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Escócia (SCO)": {
    prefixo: "SCO",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, // Grp D
  "EUA (USA)": {
    prefixo: "USA",
    cromos: ["Escudo", "Matt Turner", "Sergiño Dest", "Chris Richards", "Tim Ream", "Antonee Robinson", "Joe Scally", "Tyler Adams", "Weston McKennie", "Yunus Musah", "Gio Reyna", "Malik Tillman", "Foto de equipa", "Brenden Aaronson", "Christian Pulisic", "Tim Weah", "Folarin Balogun", "Ricardo Pepi", "Haji Wright", "Josh Sargent"]
  },
  "Paraguai (PAR)": {
    prefixo: "PAR",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Austrália (AUS)": {
    prefixo: "AUS",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Turquia (TUR)": {
    prefixo: "TUR",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, // Grp E
  "Alemanha (GER)": {
    prefixo: "GER",
    cromos: ["Escudo", "Marc-André ter Stegen", "Oliver Baumann", "Joshua Kimmich", "Antonio Rüdiger", "Jonathan Tah", "Nico Schlotterbeck", "David Raum", "Pascal Groß", "Robert Andrich", "Aleksandar Pavlović", "Florian Wirtz", "Foto de equipa", "Jamal Musiala", "Leroy Sané", "Kai Havertz", "Niclas Füllkrug", "Maximilian Beier", "Deniz Undav", "Karim Adeyemi"]
  },
  "Curaçao (CUW)": {
    prefixo: "CUW",
    cromos: ["Team Logo", "Eloy Room", "Armando Obispo", "Sherel Floranus", "Jurien Gaari", "Joshua Brenet", "Roshon Van Eijma", "Shurandy Sambo", "Livano Comenencia", "Godfried Roemeratoe", "Juninho Bacuna", "Leandro Bacuna", "Team Photo", "Tahith Chong", "Kenji Gorre", "Jearl Margaritha", "Jurgen Locadia", "Jeremy Antonisse", "Gervane Kastaneer", "Sontje Hansen"]
  },
  "Costa do Marfim (CIV)": {
    prefixo: "CIV",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Equador (ECU)": {
    prefixo: "ECU",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, //Grp F
  "Países Baixos (NED)": {
    prefixo: "NED",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, 
  "Japão (JPN)": {
    prefixo: "JPN",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },  
  "Suécia (SWE)": {
    prefixo: "SWE",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Tunísia (TUN)": {
    prefixo: "TUN",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, //Grp G
  "Bélgica (BEL)": {
    prefixo: "BEL",
    cromos: ["Escudo", "Koen Casteels", "Matz Sels", "Wout Faes", "Zeno Debast", "Arthur Theate", "Maxim De Cuyper", "Thomas Meunier", "Youri Tielemans", "Amadou Onana", "Nicolas Raskin", "Alexis Saelemaekers", "Foto de equipa", "Hans Vanaken", "Kevin De Bruyne", "Jérémy Doku", "Charles De Ketelaere", "Leandro Trossard", "Loïs Openda", "Romelu Lukaku"]
  },  
  "Egito (EGY)": {
    prefixo: "EGY",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, 
  "Irão (IRN)": {
    prefixo: "IRN",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Nova Zelândia (NZL)": {
    prefixo: "NZL",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, // Grp H
  "Espanha (ESP)": {
    prefixo: "ESP",
    cromos: ["Escudo", "Unai Simón", "David Raya", "Dani Carvajal", "Pau Cubarsí", "Robin Le Normand", "Aymeric Laporte", "Marc Cucurella", "Rodri", "Pedri", "Fabián Ruiz", "Martín Zubimendi", "Foto de equipa", "Mikel Merino", "Dani Olmo", "Lamine Yamal", "Nico Williams", "Álvaro Morata", "Mikel Oyarzabal", "Ferran Torres"]
  },
  "Cabo Verde (CPV)": {
    prefixo: "CPV",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Arábia Saudita (KSA)": {
    prefixo: "KSA",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Uruguai (URU)": {
    prefixo: "URU",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, // Grp I
  "França (FRA)": {
    prefixo: "FRA",
    cromos: ["Escudo", "Mike Maignan", "Brice Samba", "Jules Koundé", "William Saliba", "Dayot Upamecano", "Ibrahima Konaté", "Theo Hernández", "Aurélien Tchouaméni", "N'Golo Kanté", "Manu Koné", "Adrien Rabiot", "Foto de equipa", "Michael Olise", "Ousmane Dembélé", "Bradley Barcola", "Désiré Doué", "Kingsley Coman", "Hugo Ekitiké", "Kylian Mbappé"]
  },
  "Senegal (SEN)": {
    prefixo: "SEN",
    cromos: ["Escudo", "Eduardo Mendy", "Yehvann Diouf", "Moussa Niakhaté", "Abdoulaye Sec", "Ismail Jakobs", "El Hadji Malick Diouf", "Kalidou Koulibaly", "Idrissa Gana Gueye", "Pape Matar Sarr", "Pape Gueye", "Habib Diarra", "Foto de equipa", "Lamine Camara", "Sadio Mané", "Ismaïla Sarr", "Boulaye Dia", "Iliman Ndiaye", "Nicolas Jackson", "Chérif Ndiaye"]
  },
  "Iraque (IRQ)": {
    prefixo: "IRQ",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Noruega (NOR)": {
    prefixo: "NOR",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, // Grp J
  "Argentina (ARG)": {
    prefixo: "ARG",
    cromos: ["Escudo", "Emiliano Martínez", "Gerónimo Rulli", "Nahuel Molina", "Cristian Romero", "Nicolás Otamendi", "Lisandro Martínez", "Nicolás Tagliafico", "Leandro Paredes", "Rodrigo De Paul", "Alexis Mac Allister", "Enzo Fernández", "Foto de equipa", "Giovani Lo Celso", "Ángel Di María", "Lionel Messi", "Lautaro Martínez", "Julián Álvarez", "Nico González", "Alejandro Garnacho"]
  },  
  "Argélia (ALG)": {
    prefixo: "ALG",
    cromos: ["Escudo", "Alexis Guendouz", "Anthony Mandrea", "Rayan Ait-Nouri", "Ramy Bensebaini", "Yousef Atal", "Aissa Mandi", "Mohamed Tougai", "Nabil Bentaleb", "Houssem Aouar", "Ismaël Bennacer", "Rachid Ghezzal", "Foto de equipa", "Riyad Mahrez", "Said Benrahma", "Baghdad Bounedjah", "Amine Gouiri", "Mohamed Amoura", "Adam Ounas", "Islam Slimani"]
  },
  "Áustria (AUT)": {
    prefixo: "AUT",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Jordânia (JOR)": {
    prefixo: "JOR",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, // Grp K
  "Portugal (POR)": {
    prefixo: "POR",
    cromos: ["Escudo", "Diogo Costa", "Rui Silva", "João Cancelo", "Rúben Dias", "Gonçalo Inácio", "Nuno Mendes", "Diogo Dalot", "Vitinha", "João Neves", "Rúben Neves", "Bernardo Silva", "Foto de equipa", "Bruno Fernandes", "Cristiano Ronaldo", "Rafael Leão", "Pedro Neto", "Gonçalo Ramos", "João Félix", "Francisco Conceição"]
  },
  "Congo DR (COD)": {
    prefixo: "COD",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Uzbequistão (UZB)": {
    prefixo: "UZB",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Colômbia (COL)": {
    prefixo: "COL",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }, // Grp L
  "Inglaterra (ENG)": {
    prefixo: "ENG",
    cromos: ["Escudo", "Jordan Pickford", "Dean Henderson", "Kyle Walker", "John Stones", "Marc Guéhi", "Ezri Konsa", "Luke Shaw", "Declan Rice", "Jude Bellingham", "Cole Palmer", "Phil Foden", "Foto de equipa", "Bukayo Saka", "Jarrod Bowen", "Harry Kane", "Anthony Gordon", "Ollie Watkins", "Eberechi Eze", "Marcus Rashford"]
  },
  "Croácia (CRO)": {
    prefixo: "CRO",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Gana (GHA)": {
    prefixo: "GHA",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  },
  "Panamá (PAN)": {
    prefixo: "PAN",
    cromos: Array.from({length: 20}, (_, i) => i === 0 ? "Escudo" : i === 12 ? "Foto de equipa" : `Jogador ${i+1}`)
  }
};
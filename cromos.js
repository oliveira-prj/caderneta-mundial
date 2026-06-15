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
    cromos: ["Escudo", "Luis Malagón", "Johan Vásquez", "Jorge Sánchez", "César Montes", "Jesús Gallardo", "Israel Reyes", "Diego Lainez", "Carlos Rodríguez", "Edson Álvarez", "Orbelín Pineda", "Marcel Ruiz", "Foto de equipa", "Erick Sánchez", "Hirving Lozano", "Santiago Giménez", "Raúl Jiménez", "Alexis Vega", "Roberto Alvarado", "César Huerta"]
  }, 
  "África do Sul (RSA)": {
    prefixo: "RSA",
    cromos: ["Escudo", "Ronwen Williams", "Sipho Chaine", "Aubrey Modiba", "Samukele Kabini", "Siyabonga Ngezana", "Khuliso Mudau", "Melusi Buthelezi", "Nkosinaathi Sibisi", "Bathusi Aubaas", "Teboho Mokoena", "Thulani Mkhitri", "Foto de equipa", "Iqraam Rayners", "Sipho Mbule", "Thapelo Maseko", "Zakhele Lepasa", "Dale Foster", "Mshau Nkota", "Oswin Appollis"]
  },
  "Coreia do Sul (KOR)": {
    prefixo: "KOR",
    cromos: ["Escudo", "Hyeonwoo Jo", "Seunggyu Kim", "Minjae Kim", "Yumin Cho", "Youngwoo Seol", "Hanbeom Lee", "Taeseok Lee", "Myungjae Lee", "Jaeung Lee", "Inbeom Hwang", "Kangin Lee", "Foto de equipa", "Seungho Paik", "Jens Castrop", "Donggyeong Lee", "Guesung Cho", "Heungmin Son", "Heechan Hwang", "Hyeongyu Oh"]
  },
  "Chéquia (CZE)": {
    prefixo: "CZE",
 cromos: ["Escudo", "Matěj Kovář", "Jindřich Staněk", "Tomáš Holeš", "Ladislav Krejčí", "Jaroslav Zelený", "Vladimír Coufal", "David Zima", "Michal Sadílek", "Lukáš Provod", "Pavel Šulc", "Tomáš Souček", "Foto de equipa", "Lukáš Červ", "Matěj Vydra", "Vasil Kušej", "Tomáš Chorý", "Václav Černý", "Adam Hložek", "Patrik Schick"]
  }, //Grp B
  "Canadá (CAN)": {
    prefixo: "CAN",
    cromos: ["Escudo", "Dayne St. Clair", "Alphonso Davies", "Alistair Johnston", "Samuel Adekugbe", "Richie Laryea", "Derek Cornelius", "Moïse Bombito", "Kamal Miller", "Stephen Eustáquio", "Ismaël Koné", "Jonathan Osorio", "Foto de equipa", "Jacob Shaffelburg", "Mathieu Choinière", "Niko Sigur", "Tajon Buchanan", "Liam Millar", "Cyle Larin", "Jonathan David"]
  },
  "Bósnia e Herzegovina (BIH)": {
    prefixo: "BIH",
    cromos: ["Escudo", "Nikola Vasilj", "Anel Ahmedhodžić", "Dennis Hadžikadunić", "Tarik Muharemović", "Sead Kolašinac", "Nikola Katić", "Amar Dedić", "Amir Hadžiahmetović", "Benjamin Tahirović", "Ivan Šunjić", "Nail Omerović", "Foto de equipa", "Dženis Burnić", "Esmir Bajraktarević", "Amar Memić", "Mihailo Mudrik", "Edin Džeko", "Samed Baždar", "Ermedin Demirović"]
  },
  "Qatar (QAT)": {
    prefixo: "QAT",
    cromos: ["Escudo", "Meshaal Barsham", "Sultan Al-Brake", "Lucas Mendes", "Homam Ahmed", "Tarek Salman", "Pedro Miguel", "Mohammed Waad", "Karim Boudiaf", "Assim Madibo", "Hamed Ismail", "Akram Afif", "Foto de equipa", "Mohammed Waad", "Abdulaziz Hatem", "Hassan Al-Haydos", "Edmilson Junior", "Almoez Ali", "Ahmed Al-Ganehi", "Ahmed Alaaeldin"]
  },
  "Suíça (SUI)": {
    prefixo: "SUI",
    cromos: ["Escudo", "Gregor Kobel", "Yvon Mvogo", "Manuel Akanji", "Ricardo Rodríguez", "Nico Elvedi", "Aurèle Amenda", "Silvan Widmer", "Granit Xhaka", "Denis Zakaria", "Remo Freuler", "Ardon Jashari", "Foto de equipa", "Fabian Rieder", "J those", "Michel Aebischer", "Breel Embolo", "Ruben Vargas", "Dan Ndoye", "Zeki Amdouni"]
  }, // Grp C
  "Brasil (BRA)": {
    prefixo: "BRA",
    cromos: ["Escudo", "Alisson", "Bento", "Marquinhos", "Éder Militão", "Gabriel Magalhães", "Danilo", "Wesley", "Lucas Paquetá", "Casemiro", "Bruno Guimarães", "Luiz Henrique", "Foto de equipa", "Vinícius Júnior", "Rodrygo", "João Pedro", "Raphinha", "Gabriel Martinelli", "Matheus Cunha", "Estêvão"]
  },
  "Marrocos (MAR)": {
    prefixo: "MAR",
    cromos: ["Escudo", "Yassine Bounou", "Munir El Kajoui", "Achraf Hakimi", "Noussair Mazraoui", "Nayef Aguerd", "Romain Saïss", "Jawad El Yamiq", "Adam Masina", "Sofyan Amrabat", "Azzedine Ounahi", "Bilal El Khannouss", "Foto de equipa", "Ismael Saibari", "Youssef En-Nesyri", "Abde Ezzalzouli", "Sofiane Boufal", "Hakim Ziyech", "Ayoub El Kaabi", "Amine Harit"]
  },
  "Haiti (HAI)": {
    prefixo: "HAI",
    cromos: ["Escudo", "Johny Placide", "Carlens Arcus", "Martin Expérience", "Jean-Kevin Duverne", "Richelor Sprangers", "Duke Lacroix", "Garissone Innocent", "Hanes Delcroix", "Leverton Pierre", "Danley Jean Jacques", "Jean-Ricner Bellegarde", "Foto de equipa", "Christopher Attys", "Derrick Etienne Jr.", "Josué Casimir", "Ruben Providence", "Duckens Nazon", "Louicius Don Deedson", "Frantzdy Pierrot"]
  },
  "Escócia (SCO)": {
    prefixo: "SCO",
    cromos: ["Escudo", "Angus Gunn", "Jack Hendry", "Kieran Tierney", "Aaron Hickey", "Andrew Robertson", "Scott McKenna", "John Souttar", "Anthony Ralston", "Grant Hanley", "Lewis Ferguson", "Billy Gilmour", "Foto de equipa", "Scott McTominay", "Ryan Christie", "Kenny McLean", "John McGinn", "Lyndon Dykes", "Che Adams", "Ben Gannon-Doak"]
  }, // Grp D
  "EUA (USA)": {
    prefixo: "USA",
    cromos: ["Escudo", "Matt Turner", "Chris Richards", "Tyler Adams", "Tanner Tessmann", "Weston McKennie", "Antonee Robinson", "Tim Ream", "Mark McKenzie", "Alex Freeman", "Cristian Roldan", "Timothy Weah", "Foto de equipa", "Diego Luna", "Malik Tillman", "Christian Pulisic", "Brenden Aaronson", "Ricardo Pepi", "Haji Wright", "Folarin Balogun"]
  },
  "Paraguai (PAR)": {
    prefixo: "PAR",
    cromos: ["Escudo", "Roberto Fernández", "Gustavo Gómez", "Fabián Balbuena", "Juan José Cáceres", "Omar Alderete", "Júnior Alonso", "Matías Villasanti", "Diego Gómez", "Damian Bobadilla", "Andrés Cubas", "Matías Galarza Fonda", "Foto de equipa", "Julio Enciso", "Alejandro Romero Gamarra", "Miguel Almirón", "Ramón Sosa", "Ángel Romero", "Antonio Sanabria", "Adam Bareiro"]
  },
  "Austrália (AUS)": {
    prefixo: "AUS",
    cromos: ["Escudo", "Mathew Ryan", "Harry Souttar", "Alessandro Circati", "Jordan Bos", "Kye Rowles", "Aziz Behich", "Cameron Burgess", "Lewis Miller", "Milos Degenek", "Jackson Irvine", "Riley McGree", "Foto de equipa", "Aiden O'Neill", "Connor Metcalfe", "Patrick Yazbek", "Craig Goodwin", "Kusini Yengi", "Nestory Irankunda", "Mohamed Touré"]
  },
  "Turquia (TUR)": {
    prefixo: "TUR",
    cromos: ["Escudo", "Uğurcan Çakir", "Mert Müldür", "Zeki Çelik", "Abdülkerim Bardakci", "Çağlar Söyüncü", "Merih Demiral", "Ferdi Kadioğlu", "Kaan Ayhan", "İsmail Yüksek", "Hakan Çalhanoğlu", "Orkun Kökçü", "Foto de equipa", "Arda Güler", "İrfan Can Kahveci", "Yunus Akgün", "Can Uzun", "Bariş Alper Yilmaz", "Kerem Aktürkoğlu", "Kenan Yildiz"]
  }, // Grp E
  "Alemanha (GER)": {
    prefixo: "GER",
    cromos: ["Escudo", "Marc-André ter Stegen", "Jonathan Tah", "David Raum", "Nico Schlotterbeck", "Antonio Rüdiger", "Waldemar Anton", "Ridle Baku", "Maximilian Mittelstädt", "Joshua Kimmich", "Florian Wirtz", "Felix Nmecha", "Foto de equipa", "Leon Goretzka", "Jamal Musiala", "Serge Gnabry", "Kai Havertz", "Leroy Sané", "Karim Adeyemi", "Nick Woltemade"]
  },
  "Curaçao (CUW)": {
    prefixo: "CUW",
    cromos: ["Escudo", "Eloy Room", "Armando Obispo", "Sherel Floranus", "Juriën Gaari", "Joshua Brenet", "Roshon van Eijma", "Shurandy Sambo", "Liamo Conmencia", "Godfried Roemeratoe", "Juninho Bacuna", "Leandro Bacuna", "Foto de equipa", "Tahith Chong", "Kenji Gorré", "Jearl Margaritha", "Jürgen Locadia", "Jeremy Antonisse", "Gervane Kastaneer", "Sontje Hansen"]
  },
  "Costa do Marfim (CIV)": {
    prefixo: "CIV",
    cromos: ["Escudo", "Vahia Fofana", "Ghislain Konan", "Wilfried Singo", "Odilon Kossounou", "Evan Ndicka", "Willy Boly", "Emmanuel Agbadou", "Ousmane Diomande", "Franck Kessié", "Seko Fofana", "Ibrahim Sangaré", "Foto de equipa", "Jean-Philippe Gbamin", "Amad Diallo", "Sébastien Haller", "Simon Adingra", "Yann Diomande", "Evann Guessand", "Oumar Diakité"]
  },
  "Equador (ECU)": {
    prefixo: "ECU",
    cromos: ["Escudo", "Hernán Galíndez", "Gonzalo Valle", "Piero Hincapié", "Pervis Estupiñán", "William Pacho", "Joel Ordóñez", "Moises Caicedo", "Alan Franco", "Foto de equipa", "Kendry Páez", "Pedro Vite", "Foto de equipa", "John Yeboah", "Leonardo Campana", "Gonzalo Plata", "Nilson Angulo", "Alan Minda", "Kevin Rodríguez", "Enner Valencia"]
  }, //Grp F
  "Países Baixos (NED)": {
    prefixo: "NED",
    cromos: ["Escudo", "Bart Verbruggen", "Nathan Aké", "Virgil van Dijk", "Micky van de Ven", "Jurriën Timber", "Denzel Dumfries", "Jeremie Frimpong", "Jan Paul van Hecke", "Tijjani Reijnders", "Ryan Gravenberch", "Teun Koopmeiners", "Foto de equipa", "Frenkie de Jong", "Xavi Simons", "Justin Kluivert", "Memphis Depay", "Donyell Malen", "Wout Weghorst", "Cody Gakpo"]
  }, 
  "Japão (JPN)": {
    prefixo: "JPN",
    cromos: ["Escudo", "Zion Suzuki", "Henry Heroki Mochizuki", "Ayumu Seko", "Junya Suzuki", "Shogo Taniguchi", "Tsuyoshi Watanabe", "Kaishu Sano", "Yuki Soma", "Ao Tanaka", "Daichi Kamada", "Ritsu Doan", "Foto de equipa", "Keito Nakamura", "Hidemasa Morita", "Takuma Minamino", "Shuto Machino", "Junya Ito", "Koki Ogawa", "Ayase Ueda"]
  },  
  "Suécia (SWE)": {
    prefixo: "SWE",
    cromos: ["Escudo", "Viktor Johansson", "Gustaf Lagerbielke", "Isak Hien", "Gabriel Gudmundsson", "Emil Holm", "Victor Nilsson Lindelöf", "Lucas Bergvall", "Hugo Larsson", "Jesper Karlström", "Yasin Ayari", "Mattias Svanberg", "Foto de equipa", "Daniel Svensson", "Ken Sema", "Roony Bardghji", "Dejan Kulusevski", "Anthony Elanga", "Alexander Isak", "Viktor Gyökeres"]
  },
  "Tunísia (TUN)": {
    prefixo: "TUN",
    cromos: ["Escudo", "Bechir Ben Saïd", "Aymen Dahmen", "Valery Valery", "Montassar Talbi", "Yassine Meriah", "Dylan Bronn", "Ellyes Skhiri", "Aïssa Laïdouni", "Haythem Jouini", "Cromo 11", "Mohamed Ali Ben Romdhane", "Foto de equipa", "Hannibal Mejbri", "Elias Achouri", "Elias Saad", "Hazem Mastouri", "Ismaël Gharbi", "Sayfallah Ltaief", "Naim Sliti"]
  }, //Grp G
  "Bélgica (BEL)": {
    prefixo: "BEL",
    cromos: ["Escudo", "Thibaut Courtois", "Arthur Theate", "Timothy Castagne", "Zeno Debast", "Brandon Mechele", "Maxim De Cuyper", "Thomas Meunier", "Youri Tielemans", "Amadou Onana", "Nicolas Raskin", "Alexis Saelemaekers", "Foto de equipa", "Hans Vanaken", "Kevin De Bruyne", "Jérémy Doku", "Charles De Ketelaere", "Leandro Trossard", "Loïs Openda", "Romelu Lukaku"]
  },  
  "Egito (EGY)": {
    prefixo: "EGY",
    cromos: ["Escudo", "Mohamed El-Shenawy", "Mohamed Hany", "Mohamed Hamdy", "Yasser Ibrahim", "Khalid Sobhi", "Ramy Rabia", "Hossam Abdelmaguid", "Ahmed Fatouh", "Marwan Attia", "Zizo", "Hamdy Fathy", "Foto de equipa", "Mohanad Lasheen", "Emam Ashour", "Hamdi Fathi", "Mohamed Salah", "Mostafa Mohamed", "Trezeguet", "Omar Marmoush"]
  }, 
  "Irão (IRN)": {
    prefixo: "IRN",
    cromos: ["Escudo", "Alireza Beiranvand", "Morteza Pouraliganji", "Ehsan Hajsafi", "Milad Mohammadi", "Shojae Khalilzadeh", "Ramin Rezaeian", "Hossein Kanaanizadegan", "Sadegh Moharrami", "Saleh Hardani", "Saeid Ezatolahi", "Saman Ghoddos", "Foto de equipa", "Omid Noorafkan", "Roozbeh Cheshmi", "Mohammad Mohebi", "Sardar Azmoun", "Mehdi Taremi", "Alireza Jahanbakhsh", "Ali Gholizadeh"]
  },
  "Nova Zelândia (NZL)": {
    prefixo: "NZL",
    cromos: ["Escudo", "Max Crocombe", "Alex Paulsen", "Michael Boxall", "Liberato Cacace", "Tim Payne", "Tyler Bindon", "Francis De Vries", "Finn Surman", "Joe Bell", "Sarpreet Singh", "Ryan Thomas", "Foto de equipa", "Matthew Garbett", "Marko Stamenic", "Ben Old", "Chris Wood", "Elijah Just", "Callum McCowatt", "Kosta Barbarouses"]
  }, // Grp H
  "Espanha (ESP)": {
    prefixo: "ESP",
    cromos: ["Escudo", "Unai Simón", "Robin Le Normand", "Aymeric Laporte", "Dean Huijsen", "Pedro Porro", "Dan Carvajal", "Marc Cucurella", "Martín Zubimendi", "Rodri", "Pedri", "Fabián Ruiz", "Foto de equipa", "Mikel Merino", "Lamine Yamal", "Dani Olmo", "Nico Williams", "Ferran Torres", "Álvaro Morata", "Mikel Oyarzabal"]
  },
  "Cabo Verde (CPV)": {
    prefixo: "CPV",
    cromos: ["Escudo", "Vozinha", "Logan Costa", "Pico", "Diney", "Steven Moreira", "Wagner Pina", "João Paulo", "Yannick Semedo", "Kevin Pina", "Patrick Andrade", "Jamiro Monteiro", "Foto de equipa", "Deroy Duarte", "Garry Rodrigues", "Jovane Cabral", "Ryan Mendes", "Dailon Livramento", "Willy Semedo", "Bebé"]
  },
  "Arábia Saudita (KSA)": {
    prefixo: "KSA",
    cromos: ["Escudo", "Nawaf Alaqidi", "Abdulrahman Alsanbi", "Saud Abdulhamid", "Nasser Al-Dawsari", "KSA 6", "Moteb Alharbi", "Hassan Altambakti", "Musab Al-Juwayr", "Ziyad Al-Johani", "Abdullah Al-Khaibari", "Saleh Abu Al-Shamat", "Foto de equipa", "Marwan Al-Sahafi", "Feras Al-Brikan", "KSA 16", "KSA 17", "Salem Al-Dawsari", "Saleh Al-Shehri", "Abdullah Al-Hamdan"]
  },
  "Uruguai (URU)": {
    prefixo: "URU",
    cromos: ["Escudo", "Sergio Rochet", "Santiago Mele", "Ronald Araújo", "José María Giménez", "Guillermo Varela", "Mathías Olivera", "Sebastián Cáceres", "Nahitan Nández", "Federico Valverde", "Giorgian de Arrascaeta", "Rodrigo Bentancur", "Foto de equipa", "Manuel Ugarte", "Nicolás de la Cruz", "Maxi Araújo", "Darwin Núñez", "Federico Viñas", "Rodrigo Aguirre", "Facundo Pellistri"]
  }, // Grp I
  "França (FRA)": {
    prefixo: "FRA",
    cromos: ["Escudo", "Mike Maignan", "Théo Hernandez", "William Saliba", "Jules Koundé", "Ibrahima Konaté", "FRA 7", "Lucas Digne", "Aurélien Tchouamén", "Eduardo Camavinga", "Manu Koné", "Adrien Rabiot", "Foto de equipa", "Michael Olise", "Ousmane Dembélé", "Bradley Barcola", "Kingsley Coman", "Hugo Ekitike", "Kylian Mbappé", "Youssouf Fofana"]
  },
  "Senegal (SEN)": {
    prefixo: "SEN",
    cromos: ["Escudo", "Edouard Mendy", "Bingourou Kamara", "Moussa Niakhaté", "Abdoulaye Seck", "Ismail Jakobs", "El Hadji Malick Diouf", "Kalidou Koulibaly", "Idrissa Gana Gueye", "Pape Matar Sarr", "Pape Gueye", "Habib Diarra", "Foto de equipa", "Lamine Camara", "Sadio Mané", "SEN 16", "Ismaïla Sarr", "Lamine Camara", "Nicolas Jackson", "Krépin Diatta"]
  },
  "Iraque (IRQ)": {
    prefixo: "IRQ",
    cromos: ["Escudo", "Jalal Hassan", "Rebin Sulaka", "Hussein Ali", "IRQ 5", "Zaid Tahseen", "Manaf Younis", "Zidane Iqbal", "Amir Al-Ammari", "Akam Hashem", "Ibrahim Bayesh", "Ali Jasim", "Foto de equipa", "Youssef Amyn", "Merchas Doski", "Ayman Hussein", "Osama Rashid", "Ali Al-Hamadi", "Youssef Amyn", "Mohanad Ali"]
  },
  "Noruega (NOR)": {
    prefixo: "NOR",
    cromos: ["Escudo", "Ørjan Nyland", "Julian Ryerson", "Leo Østigård", "NOR 5", "Marcus Holmgren Pedersen", "David Møller Wolfe", "Torbjørn Heggem", "Morten Thorsby", "Martin Ødegaard", "Patrick Berg", "Andreas Schjelderup", "Foto de equipa", "Sander Berge", "Erling Haaland", "Alexander Sørloth", "Antonio Nusa", "Jørgen Strand Larsen", "NOR 19", "Oscar Bobb"]
  }, // Grp J
  "Argentina (ARG)": {
    prefixo: "ARG",
    cromos: ["Escudo", "Emiliano Martínez", "Nahuel Molina", "Cristian Romero", "Nicolás Otamendi", "Enzo Fernández", "Leonardo Balerdi", "Alexis Mac Allister", "Rodrigo De Paul", "Nicolás Tagliafico", "Exequiel Palacios", "Leandro Paredes", "Foto de equipa", "Nico Paz", "Franco Mastantuono", "Lautaro Martínez", "Lionel Messi", "Nico González", "Julián Álvarez", "Giuliano Simeone"]
  },  
  "Argélia (ALG)": {
    prefixo: "ALG",
    cromos: ["Escudo", "Alexis Guendouz", "Rayan Aït-Nouri", "Youcef Atal", "Ramy Bensebaini", "Mohamed Amine Tougai", "Aïssa Mandi", "Ismaël Bennacer", "Houssem Aouar", "Hicham Boudaoui", "Ramiz Zerrouki", "Nabil Bentaleb", "Foto de equipa", "Farès Chaïbi", "Riyad Mahrez", "Saïd Benrahma", "Anis Hadj Moussa", "Amine Gouiri", "Baghdad Bounedjah", "Mohamed Amoura"]
  },
  "Áustria (AUT)": {
    prefixo: "AUT",
    cromos: ["AUT 1", "Alexander Schlager", "Patrick Pentz", "David Alaba", "Kevin Danso", "Philipp Lienhart", "Stefan Posch", "Phillipp Mwene", "Alexander Prass", "Xaver Schlager", "Marcel Sabitzer", "Konrad Laimer", "Foto de equipa", "Florian Grillitsch", "Nicolas Seiwald", "Romano Schmid", "Patrick Wimmer", "Christoph Baumgartner", "Michael Gregoritsch", "Marko Arnautović"]
  },
  "Jordânia (JOR)": {
    prefixo: "JOR",
    cromos: ["Escudo", "Vazeed Abu Laila", "Ihsan Haddad", "Mohammad Abu Hashish", "Yazan Al-Arab", "Abdallah Nasib", "Salem Al-Ajalin", "Mohammad Abu Zrayq", "Ibrahim Saadeh", "Nizar Al-Rashdan", "Noor Al-Rawabdeh", "Ali Olwan", "Foto de equipa", "Amer Jamous", "Mousa Al-Taamari", "Yazan Al-Naimat", "Mahmoud Al-Mardi", "Ali Olwan", "Mohammad Abu Zrayq", "Ibrahim Saadeh"]
  }, // Grp K
  "Portugal (POR)": {
    prefixo: "POR",
    cromos: ["Escudo", "Diogo Costa", "José Sá", "Rúben Dias", "João Cancelo", "Diogo Dalot", "Nuno Mendes", "Gonçalo Inácio", "Bernardo Silva", "Bruno Fernandes", "Rúben Neves", "Vitinha", "Foto de equipa", "João Neves", "Cristiano Ronaldo", "Francisco Trincão", "João Félix", "Gonçalo Ramos", "Pedro Neto", "Rafael Leão"]
  },
  "Congo DR (COD)": {
    prefixo: "COD",
    cromos: ["Escudo", "Lionel Mpasi", "Aaron Wan-Bissaka", "Axel Tuanzebe", "Arthur Masuaku", "Chancel Mbemba", "Joris Kayembe", "Charles Pickel", "Ngal'ayel Mukau", "Edo Kayembe", "Samuel Moutoussamy", "Noah Sadiki", "Foto de equipa", "Théo Bongonda", "Meshack Elia", "Yoane Wissa", "Brian Cipenga", "Fiston Mayele", "Cédric Bakambu", "Nathanaël Mbuku"]
  },
  "Uzbequistão (UZB)": {
    prefixo: "UZB",
    cromos: ["UZB 1", "Utkir Yusupov", "Farrukh Sayfiev", "Sherzod Nasrullaev", "Umar Eshmurodov", "Husniddin Aliqulov", "Rustam Ashurmatov", "Khojiakbar Alijonov", "Abdukodir Khusanov", "Otabek Shukurov", "Otabek Shukurov", "Jamshid Iskanderov", "Foto de equipa", "Azizbek Turgunboev", "Khojimat Erkinov", "Eldor Shomurodov", "Oston Urunov", "Jaloliddin Masharipov", "Igor Sergeev", "Abbosbek Fayzullaev"]
  },
  "Colômbia (COL)": {
    prefixo: "COL",
    cromos: ["Escudo", "Camilo Vargas", "David Ospina", "Davinson Sánchez", "Yerry Mina", "Daniel Muñoz", "Johan Mojica", "Jhon Lucumí", "Santiago Arias", "Jefferson Lerma", "Kevin Castaño", "Richard Ríos", "Foto de equipa", "James Rodríguez", "Jhon Arias", "Jorge Carrascal", "Jhon Arias", "Jhon Córdoba", "Luis Suárez", "Luis Díaz"]
  }, // Grp L
  "Inglaterra (ENG)": {
    prefixo: "ENG",
    cromos: ["Escudo", "Jordan Pickford", "John Stones", "Marc Guéhi", "Ezri Konsa", "Trent Alexander-Arnold", "Reece James", "Dan Burn", "Jordan Henderson", "Declan Rice", "Jude Bellingham", "Cole Palmer", "Foto de equipa", "Morgan Rogers", "Anthony Gordon", "Phil Foden", "Bukayo Saka", "Harry Kane", "Marcus Rashford", "Ollie Watkins"]
  },
  "Croácia (CRO)": {
    prefixo: "CRO",
    cromos: ["Escudo", "Dominik Livaković", "Duje Ćaleta-Car", "Joško Gvardiol", "Josip Stanišić", "Luka Vušković", "Josip Šutalo", "Kristijan Jakić", "Luka Modrić", "Mateo Kovačić", "Martin Baturina", "Lovro Majer", "Foto de equipa", "Mario Pašalić", "Petar Sučić", "Ivan Perišić", "Marco Pašalić", "Ante Budimir", "Andrej Kramarić", "Franjo Ivanović"]
  },
  "Gana (GHA)": {
    prefixo: "GHA",
    cromos: ["Escudo", "Lawrence Ati-Zigi", "Tariq Lamptey", "Mohammed Salisu", "Alidu Seidu", "Alexander Djiku", "Gideon Mensah", "Caleb Yirenkyi", "Abdul Issahaku Fatawu", "Thomas Partey", "Salis Abdul Samed", "Kamaldeen Sulemana", "Foto de equipa", "Mohammed Kudus", "Inaki Williams", "Jordan Ayew", "André Ayew", "Joseph Paintsil", "Osman Bukari", "Antoine Semenyo"]
  },
  "Panamá (PAN)": {
    prefixo: "PAN",
    cromos: ["Escudo", "Orlando Mosquera", "Luis Mejía", "Fidel Escobar", "Andrés Andrade", "Michael Amir Murillo", "César Blackman", "Cristian Martínez", "José Córdoba", "César Blackman", "Edgardo Fariña", "Adalberto Carrasquilla", "Foto de equipa", "Édgar Bárcenas", "Carlos Harvey", "Ismael Díaz", "José Fajardo", "Cecilio Waterman", "José Luis Rodríguez", "Alberto Quintero"]
  }
};
export const MODULES = [
  {
    id: 1,
    title: "Fundamentos da Energia",
    description: "A base de tudo: o que é energia e como ela se transforma.",
    lessons: [
      {
        id: "1-1",
        title: "O que é energia?",
        intro:
          "Energia é a capacidade de realizar trabalho — de fazer algo se mover, esquentar, iluminar ou funcionar. Sem energia, nada acontece: nem o chuveiro esquenta, nem o celular carrega.",
        points: [
          "Energia não se cria nem se destrói: ela se transforma (Lei da Conservação da Energia).",
          "A unidade de medida da energia no sistema internacional é o joule (J).",
          "Na conta de luz, a energia aparece em quilowatt-hora (kWh).",
        ],
      },
      {
        id: "1-2",
        title: "Formas de energia",
        intro:
          "A energia existe em várias formas, e entender cada uma ajuda a enxergar como ela circula no nosso dia a dia.",
        points: [
          "Elétrica: a que chega pelas tomadas e alimenta os aparelhos.",
          "Térmica: ligada ao calor, como a do sol ou de um chuveiro.",
          "Mecânica (cinética e potencial): ligada ao movimento e à posição dos corpos.",
          "Química: armazenada em pilhas, baterias e nos alimentos.",
          "Luminosa: a energia da luz, emitida por lâmpadas e pelo sol.",
        ],
      },
      {
        id: "1-3",
        title: "Fontes de energia",
        intro:
          "Toda energia vem de alguma fonte. As fontes se dividem em dois grandes grupos, e essa diferença cai muito na ONEE.",
        points: [
          "Renováveis: se reabastecem na natureza — sol, vento, água dos rios, biomassa.",
          "Não renováveis: existem em quantidade limitada — petróleo, carvão mineral, gás natural.",
          "A escolha da fonte impacta o meio ambiente e o custo da energia.",
        ],
      },
      {
        id: "1-4",
        title: "Transformação de energia",
        intro:
          "Nenhum aparelho 'cria' energia: todos transformam uma forma em outra. É assim que a eletricidade vira luz, calor ou movimento.",
        points: [
          "Lâmpada: energia elétrica → luminosa (e um pouco de térmica).",
          "Chuveiro: energia elétrica → térmica (Efeito Joule).",
          "Ventilador: energia elétrica → mecânica (movimento).",
          "Usina hidrelétrica: energia mecânica da água → elétrica.",
        ],
      },
      {
        id: "1-5",
        title: "Revisão",
        intro:
          "Revise os pontos principais antes do quiz: energia é capacidade de realizar trabalho, medida em joule ou kWh.",
        points: [
          "Energia se transforma, nunca se perde (conservação).",
          "Fontes renováveis se reabastecem; não renováveis se esgotam.",
          "Todo aparelho é um transformador de energia.",
        ],
      },
      {
        id: "1-6",
        title: "Quiz do módulo",
        quiz: [
          {
            q: "Qual é a unidade de energia usada na conta de luz?",
            options: ["Joule", "Quilowatt-hora (kWh)", "Watt", "Volt"],
            answer: 1,
          },
          {
            q: "Segundo a Lei da Conservação da Energia, a energia...",
            options: [
              "é criada pelos aparelhos",
              "se destrói com o uso",
              "se transforma de uma forma em outra",
              "desaparece quando a conta é paga",
            ],
            answer: 2,
          },
          {
            q: "Qual destas é uma fonte renovável de energia?",
            options: ["Petróleo", "Carvão mineral", "Energia solar", "Gás natural"],
            answer: 2,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Eletricidade",
    description: "Corrente, tensão, resistência e circuitos sem mistério.",
    lessons: [
      {
        id: "2-1",
        title: "O que é eletricidade?",
        intro:
          "Eletricidade é o movimento ordenado de partículas carregadas (os elétrons) por um material condutor, como o fio de cobre.",
        points: [
          "Condutores (cobre, alumínio) deixam a corrente passar; isolantes (borracha, plástico) bloqueiam.",
          "A eletricidade que usamos em casa é corrente alternada (CA).",
          "Raios são eletricidade estática descarregando na atmosfera.",
        ],
      },
      {
        id: "2-2",
        title: "Corrente, tensão e resistência",
        intro:
          "O trio mais importante da eletricidade. Uma analogia com água ajuda: tensão é a pressão, corrente é o fluxo e resistência é o estreitamento do cano.",
        points: [
          "Tensão (volt, V): a 'força' que empurra os elétrons. Tomadas brasileiras: 127 V ou 220 V.",
          "Corrente (ampère, A): a quantidade de carga que passa por segundo.",
          "Resistência (ohm, Ω): a dificuldade que o material oferece à passagem da corrente.",
          "Lei de Ohm: V = R × I (tensão = resistência × corrente).",
        ],
      },
      {
        id: "2-3",
        title: "Circuitos elétricos",
        intro:
          "Um circuito é o caminho fechado por onde a corrente circula: fonte, fios e aparelhos. Se o caminho abrir, a corrente para.",
        points: [
          "Circuito em série: um único caminho — se uma lâmpada queima, todas apagam.",
          "Circuito em paralelo: vários caminhos — como as tomadas da sua casa.",
          "Fusíveis e disjuntores protegem o circuito desligando quando a corrente sobe demais.",
        ],
      },
      {
        id: "2-4",
        title: "Quiz do módulo",
        quiz: [
          {
            q: "A tensão elétrica é medida em:",
            options: ["Ampère", "Volt", "Ohm", "Watt"],
            answer: 1,
          },
          {
            q: "Nas instalações das casas, as tomadas são ligadas em:",
            options: ["Série", "Paralelo", "Curto-circuito", "Triângulo"],
            answer: 1,
          },
          {
            q: "Pela Lei de Ohm, se a resistência aumenta e a tensão continua igual, a corrente:",
            options: ["Aumenta", "Diminui", "Não muda", "Zera sempre"],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Consumo de Energia",
    description: "Potência, kWh e como ler a conta de luz.",
    lessons: [
      {
        id: "3-1",
        title: "Potência elétrica",
        intro:
          "Potência é a velocidade com que um aparelho consome energia. É medida em watt (W) e vem escrita em todo aparelho.",
        points: [
          "Quanto maior a potência, mais energia o aparelho consome por hora.",
          "Um chuveiro (5.500 W) consome muito mais que uma lâmpada LED (9 W).",
          "Potência = tensão × corrente (P = V × I).",
        ],
      },
      {
        id: "3-2",
        title: "kWh na prática",
        intro:
          "O quilowatt-hora é a medida do consumo: potência (em kW) multiplicada pelo tempo de uso (em horas).",
        points: [
          "Fórmula: consumo (kWh) = potência (kW) × horas de uso.",
          "Exemplo: chuveiro de 5,5 kW ligado por 30 min = 5,5 × 0,5 = 2,75 kWh.",
          "Para calcular o gasto mensal, some o consumo diário e multiplique por 30.",
        ],
      },
      {
        id: "3-3",
        title: "Lendo a conta de luz",
        intro:
          "A conta mostra quantos kWh você consumiu no mês, o preço de cada kWh e as bandeiras tarifárias.",
        points: [
          "Bandeira verde: condições normais, sem cobrança extra.",
          "Bandeiras amarela e vermelha: geração mais cara, valor adicional por kWh.",
          "Comparar o consumo mês a mês ajuda a perceber desperdícios.",
        ],
      },
      {
        id: "3-4",
        title: "Quiz do módulo",
        quiz: [
          {
            q: "Um aparelho de 1.000 W ligado por 2 horas consome:",
            options: ["0,5 kWh", "1 kWh", "2 kWh", "20 kWh"],
            answer: 2,
          },
          {
            q: "A potência elétrica é medida em:",
            options: ["Volt", "Watt", "kWh", "Ampère-hora"],
            answer: 1,
          },
          {
            q: "A bandeira tarifária que não adiciona custo extra é a:",
            options: ["Amarela", "Vermelha", "Verde", "Preta"],
            answer: 2,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Eficiência Energética",
    description: "Fazer mais gastando menos energia.",
    lessons: [
      {
        id: "4-1",
        title: "O que é eficiência energética?",
        intro:
          "Eficiência energética é obter o mesmo resultado usando menos energia — sem abrir mão do conforto.",
        points: [
          "Uma lâmpada LED ilumina igual a uma incandescente gastando até 80% menos.",
          "Desperdício não é uso: luz acesa em cômodo vazio é consumo sem benefício.",
          "Eficiência reduz a conta e o impacto ambiental ao mesmo tempo.",
        ],
      },
      {
        id: "4-2",
        title: "Selo Procel e etiquetas",
        intro:
          "O Selo Procel indica os aparelhos mais eficientes do mercado brasileiro. A etiqueta de eficiência classifica de A (mais eficiente) para baixo.",
        points: [
          "Prefira aparelhos com classificação A na etiqueta.",
          "O Selo Procel existe para geladeiras, chuveiros, lâmpadas e muito mais.",
          "Aparelho barato e ineficiente pode sair mais caro ao longo dos anos.",
        ],
      },
      {
        id: "4-3",
        title: "Eficiência em casa",
        intro:
          "Pequenas mudanças de hábito geram economia real no fim do mês.",
        points: [
          "Tire aparelhos da tomada: o modo standby consome energia sem parar.",
          "Banho mais curto e chuveiro na posição 'verão' economizam muito.",
          "Geladeira longe do fogão e com borracha vedada trabalha menos.",
        ],
      },
      {
        id: "4-4",
        title: "Quiz do módulo",
        quiz: [
          {
            q: "O Selo Procel indica:",
            options: [
              "Os aparelhos mais baratos",
              "Os aparelhos mais eficientes",
              "Os aparelhos importados",
              "Os aparelhos mais potentes",
            ],
            answer: 1,
          },
          {
            q: "Na etiqueta de eficiência, a melhor classificação é:",
            options: ["E", "C", "B", "A"],
            answer: 3,
          },
          {
            q: "Aparelhos em standby:",
            options: [
              "Não consomem energia",
              "Consomem energia continuamente",
              "Consomem só de dia",
              "Geram energia",
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Fontes de Energia",
    description: "Renováveis, não renováveis e a matriz elétrica brasileira.",
    lessons: [
      {
        id: "5-1",
        title: "Fontes renováveis",
        intro:
          "Fontes renováveis são aquelas que a natureza reabastece continuamente.",
        points: [
          "Solar: painéis convertem luz do sol em eletricidade.",
          "Eólica: turbinas aproveitam a força dos ventos.",
          "Hidráulica: a força da água dos rios gira as turbinas das usinas.",
          "Biomassa: energia de matéria orgânica, como bagaço de cana.",
        ],
      },
      {
        id: "5-2",
        title: "Fontes não renováveis",
        intro:
          "São recursos limitados que demoram milhões de anos para se formar — um dia acabam.",
        points: [
          "Combustíveis fósseis: petróleo, carvão mineral e gás natural.",
          "A queima de fósseis emite gases de efeito estufa.",
          "Energia nuclear: usa urânio; não emite CO₂ na geração, mas gera rejeitos radioativos.",
        ],
      },
      {
        id: "5-3",
        title: "Matriz elétrica brasileira",
        intro:
          "O Brasil é referência mundial em energia limpa: a maior parte da nossa eletricidade vem de fontes renováveis.",
        points: [
          "As hidrelétricas são a principal fonte da matriz elétrica brasileira.",
          "Energia solar e eólica crescem rapidamente no país.",
          "Em períodos de seca, usinas termelétricas entram em ação — e a energia fica mais cara (bandeiras).",
        ],
      },
      {
        id: "5-4",
        title: "Quiz do módulo",
        quiz: [
          {
            q: "A principal fonte da matriz elétrica brasileira é:",
            options: ["Nuclear", "Carvão mineral", "Hidráulica", "Solar"],
            answer: 2,
          },
          {
            q: "Qual fonte NÃO é renovável?",
            options: ["Eólica", "Petróleo", "Biomassa", "Solar"],
            answer: 1,
          },
          {
            q: "Em períodos de seca prolongada, o Brasil costuma acionar:",
            options: [
              "Usinas termelétricas",
              "Somente painéis solares",
              "Energia das marés",
              "Usinas nucleares apenas",
            ],
            answer: 0,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Sustentabilidade",
    description: "Energia, meio ambiente e consumo consciente.",
    lessons: [
      {
        id: "6-1",
        title: "Impactos ambientais",
        intro:
          "Toda forma de geração de energia causa algum impacto — o desafio é escolher as de menor dano.",
        points: [
          "Termelétricas a fósseis emitem CO₂ e agravam o efeito estufa.",
          "Hidrelétricas alagam grandes áreas e alteram ecossistemas.",
          "Fontes limpas (solar, eólica) têm impacto bem menor na operação.",
        ],
      },
      {
        id: "6-2",
        title: "Consumo consciente",
        intro:
          "Consumo consciente é usar apenas a energia necessária, entendendo de onde ela vem e o que ela custa ao planeta.",
        points: [
          "Economizar energia também economiza recursos naturais.",
          "A energia mais limpa é aquela que nem precisa ser gerada.",
          "Escolhas individuais, somadas, mudam a demanda do país inteiro.",
        ],
      },
      {
        id: "6-3",
        title: "Sustentabilidade no dia a dia",
        intro:
          "Atitudes simples conectam energia e sustentabilidade na prática.",
        points: [
          "Aproveite a luz natural e ventile os ambientes em vez de ligar o ar-condicionado.",
          "Lave roupas em quantidade cheia e seque no varal.",
          "Participe de programas de reciclagem de pilhas e eletrônicos.",
        ],
      },
      {
        id: "6-4",
        title: "Quiz do módulo",
        quiz: [
          {
            q: "A principal fonte de emissão de CO₂ na geração elétrica vem de:",
            options: ["Painéis solares", "Termelétricas a fósseis", "Usinas eólicas", "Hidrelétricas"],
            answer: 1,
          },
          {
            q: "'A energia mais limpa é a que...'",
            options: [
              "vem do carvão",
              "nem precisa ser gerada",
              "vem da nuclear",
              "é importada",
            ],
            answer: 1,
          },
          {
            q: "Uma atitude sustentável em casa é:",
            options: [
              "Deixar a TV em standby",
              "Usar luz natural sempre que possível",
              "Tomar banhos mais longos",
              "Trocar lâmpadas LED por incandescentes",
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Segurança Elétrica",
    description: "Como se proteger dos riscos da eletricidade.",
    lessons: [
      {
        id: "7-1",
        title: "Riscos elétricos",
        intro:
          "A eletricidade é útil, mas exige respeito: choque, curto-circuito e incêndio são os principais riscos em casa.",
        points: [
          "O choque elétrico acontece quando a corrente atravessa o corpo.",
          "Água e eletricidade nunca combinam: nunca toque em aparelhos com as mãos molhadas.",
          "Instalações antigas e sobrecarregadas são causas comuns de incêndio.",
        ],
      },
      {
        id: "7-2",
        title: "Prevenção de acidentes",
        intro:
          "Quase todos os acidentes elétricos domésticos podem ser evitados com hábitos simples.",
        points: [
          "Não use 'benjamins' (adaptadores) em excesso na mesma tomada.",
          "Em caso de choque em outra pessoa: desligue a energia antes de tocar nela.",
          "Deixe reparos elétricos para profissionais qualificados.",
        ],
      },
      {
        id: "7-3",
        title: "Quiz do módulo",
        quiz: [
          {
            q: "Se alguém estiver sofrendo um choque elétrico, a primeira atitude é:",
            options: [
              "Puxar a pessoa pelo braço",
              "Jogar água na pessoa",
              "Desligar a fonte de energia",
              "Tocar com um objeto de metal",
            ],
            answer: 2,
          },
          {
            q: "Usar muitos aparelhos na mesma tomada com adaptadores pode causar:",
            options: [
              "Economia de energia",
              "Sobrecarga e risco de incêndio",
              "Melhora no sinal da TV",
              "Nada, é sempre seguro",
            ],
            answer: 1,
          },
          {
            q: "Manusear aparelhos elétricos com as mãos molhadas é perigoso porque:",
            options: [
              "A água estraga o aparelho",
              "A água conduz eletricidade e aumenta o risco de choque",
              "O aparelho fica mais lento",
              "Não é perigoso",
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
];

export const TOTAL_LESSONS = MODULES.reduce((sum, m) => sum + m.lessons.length, 0);

export const moduleProgress = (module, completedLessons) => {
  const done = module.lessons.filter((l) => completedLessons.includes(l.id)).length;
  return Math.round((done / module.lessons.length) * 100);
};

export const isModuleUnlocked = (moduleIndex, completedLessons) => {
  if (moduleIndex === 0) return true;
  return moduleProgress(MODULES[moduleIndex - 1], completedLessons) === 100;
};

export const nextLesson = (completedLessons) => {
  for (const m of MODULES) {
    if (!isModuleUnlocked(m.id - 1, completedLessons)) return null;
    const pending = m.lessons.find((l) => !completedLessons.includes(l.id));
    if (pending) return { module: m, lesson: pending };
  }
  return null;
};

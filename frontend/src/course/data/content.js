export const SIMULADO_QUESTIONS = [
  {
    q: "O que o kWh mede?",
    options: ["A potência do aparelho", "A energia consumida ao longo do tempo", "A tensão da tomada", "A corrente máxima do circuito"],
    answer: 1,
  },
  {
    q: "Um chuveiro de 5.500 W fica ligado por 30 minutos. O consumo é de:",
    options: ["1,1 kWh", "2,75 kWh", "5,5 kWh", "11 kWh"],
    answer: 1,
  },
  {
    q: "O Selo Procel serve para:",
    options: ["Indicar os aparelhos mais eficientes", "Garantir desconto na conta", "Medir a voltagem", "Certificar aparelhos importados"],
    answer: 0,
  },
  {
    q: "Qual destas é uma fonte renovável de energia?",
    options: ["Carvão mineral", "Gás natural", "Energia eólica", "Petróleo"],
    answer: 2,
  },
  {
    q: "A matriz elétrica brasileira é predominantemente:",
    options: ["Térmica a carvão", "Nuclear", "Solar", "Hidrelétrica"],
    answer: 3,
  },
  {
    q: "Quando a bandeira tarifária é vermelha, significa que:",
    options: [
      "A energia está mais cara naquele mês",
      "Haverá corte de energia",
      "O consumo foi isento de taxas",
      "A tensão da rede está alta",
    ],
    answer: 0,
  },
  {
    q: "O Efeito Joule é:",
    options: [
      "A transformação de energia elétrica em calor",
      "O desligamento automático do disjuntor",
      "A geração de energia solar",
      "A perda de carga da bateria",
    ],
    answer: 0,
  },
  {
    q: "Uma lâmpada LED em comparação com uma incandescente de mesma luminosidade:",
    options: ["Consome mais energia", "Consome menos energia", "Consome igual", "Não usa eletricidade"],
    answer: 1,
  },
  {
    q: "Aparelhos em standby (luzinha acesa):",
    options: [
      "Não consomem energia",
      "Consomem energia continuamente e devem ser tirados da tomada",
      "Consomem só à noite",
      "Recarregam a rede elétrica",
    ],
    answer: 1,
  },
  {
    q: "Ao presenciar alguém sofrendo choque elétrico, você deve primeiro:",
    options: ["Puxar a vítima com as mãos", "Jogar água na vítima", "Desligar a fonte de energia", "Chutar o fio para longe"],
    answer: 2,
  },
];

export const FLASHCARDS = [
  { front: "O que é energia?", back: "Capacidade de realizar trabalho — mover, aquecer, iluminar. Medida em joule (J) ou kWh." },
  { front: "O que é kWh?", back: "Quilowatt-hora: energia de um aparelho de 1.000 W ligado por 1 hora. Unidade da conta de luz." },
  { front: "O que é potência elétrica?", back: "Velocidade de consumo de energia, medida em watt (W). P = V × I." },
  { front: "O que é eficiência energética?", back: "Obter o mesmo resultado usando menos energia, sem perder conforto." },
  { front: "O que indica o Selo Procel?", back: "Os aparelhos mais eficientes de cada categoria no mercado brasileiro." },
  { front: "Diferença entre fonte renovável e não renovável?", back: "Renovável se reabastece na natureza (sol, vento, água). Não renovável é limitada (petróleo, carvão, gás)." },
  { front: "O que é tensão elétrica?", back: "A 'força' que empurra os elétrons, medida em volts (V). Tomadas: 127 V ou 220 V." },
  { front: "O que é corrente elétrica?", back: "O fluxo de elétrons pelo condutor, medido em ampères (A)." },
  { front: "Circuito em série vs. em paralelo?", back: "Série: um caminho só (um queima, tudo apaga). Paralelo: vários caminhos (tomadas de casa)." },
  { front: "O que é o Efeito Joule?", back: "Transformação de energia elétrica em calor — princípio do chuveiro e do ferro de passar." },
  { front: "O que são as bandeiras tarifárias?", back: "Sistema que ajusta o preço do kWh: verde (normal), amarela e vermelha (mais caro)." },
  { front: "Regra de ouro em caso de choque elétrico?", back: "Desligue a fonte de energia ANTES de tocar na vítima. Nunca puxe com as mãos." },
];

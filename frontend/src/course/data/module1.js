export const MODULE_ONE = {
  id: 1,
  title: "Fundamentos da Energia",
  description: "A base de tudo: o que é energia, suas formas, fontes e transformações.",
  lessons: [
    {
      id: "1-1",
      title: "O que é energia?",
      goal: "Entender o que é energia, a lei da conservação e as unidades joule e kWh.",
      blocks: [
        {
          type: "intro",
          text: "Olhe ao seu redor por um instante. Quase tudo que acontece perto de você só acontece porque existe energia envolvida — mesmo quando a gente não percebe.",
        },
        {
          type: "examples",
          title: "A energia está em praticamente tudo",
          items: [
            { icon: "bulb", text: "A lâmpada acendendo quando você aperta o interruptor" },
            { icon: "shower", text: "O chuveiro aquecendo a água do banho" },
            { icon: "phone", text: "O celular carregando na tomada" },
            { icon: "car", text: "O carro se movimentando pela rua" },
            { icon: "run", text: "Você correndo na educação física" },
          ],
          footnote:
            "Repare: são coisas bem diferentes entre si. Mas todas têm algo em comum — alguma mudança está acontecendo. E é aí que entra o conceito de energia.",
        },
        {
          type: "concept",
          term: "Energia é a capacidade de provocar mudanças ou realizar trabalho.",
          paragraphs: [
            "Leia de novo, devagar. \"Provocar mudanças\" significa fazer algo acontecer: acender, aquecer, mover, carregar. \"Realizar trabalho\" é o jeito que a física diz a mesma coisa: aplicar força e causar deslocamento ou transformação.",
            "Então, sempre que algo muda — a água esquenta, o carro anda, a tela acende — existe energia sendo usada. Sem energia, nada muda. Nada acontece.",
          ],
        },
        {
          type: "law",
          title: "Lei da Conservação da Energia",
          statement: "A energia não pode ser criada nem destruída. Ela pode ser transformada de uma forma para outra.",
          explanation:
            "Isso significa que a energia elétrica que chega à sua casa não \"some\" quando você usa o chuveiro: ela vira calor na água. A energia nunca aparece do nada e nunca desaparece — ela troca de forma.",
        },
        {
          type: "flow",
          title: "Veja a transformação acontecendo",
          steps: [
            { icon: "zap", label: "Energia elétrica" },
            { icon: "bulb", label: "Energia luminosa" },
            { icon: "flame", label: "Energia térmica" },
          ],
          note: "Na lâmpada, a energia elétrica se transforma principalmente em luz — e uma parte sempre vira calor. Por isso lâmpada acesa esquenta.",
        },
        { type: "lampdemo" },
        {
          type: "units",
          items: [
            {
              name: "Joule (J)",
              what: "A unidade oficial de energia no Sistema Internacional, usada na física e nas provas científicas.",
              example: "Levantar uma maçã de 100 g por 1 metro consome cerca de 1 joule.",
            },
            {
              name: "Quilowatt-hora (kWh)",
              what: "A unidade usada para medir o consumo de energia elétrica na prática.",
              example: "Um aparelho de 1.000 W ligado por 1 hora consome exatamente 1 kWh.",
            },
          ],
          note: "Por que a conta de luz usa kWh e não joule? Porque o joule é muito pequeno: 1 kWh equivale a 3,6 milhões de joules. Para uma casa inteira, o kWh deixa os números legíveis.",
        },
        {
          type: "minichallenge",
          q: "Uma lâmpada acesa está transformando energia elétrica principalmente em:",
          options: [
            "Energia luminosa e energia térmica",
            "Energia sonora",
            "Energia química",
            "Energia nuclear",
          ],
          answer: 0,
          why: "A lâmpada transforma energia elétrica em luz (luminosa) — e parte sempre vira calor (térmica). É por isso que ela esquenta depois de um tempo acesa.",
        },
      ],
    },
    {
      id: "1-2",
      title: "Formas de energia",
      goal: "Reconhecer as principais formas de energia e identificá-las em situações do dia a dia.",
      blocks: [
        {
          type: "intro",
          text: "A energia é uma só, mas ela se apresenta de várias formas. Saber reconhecer cada uma é o que permite entender as transformações — tema favorito das provas.",
        },
        {
          type: "formgrid",
          title: "As 8 formas que você precisa conhecer",
          forms: [
            { icon: "run", name: "Cinética", def: "Energia do movimento.", example: "Carro andando, bola rolando, pessoa correndo." },
            { icon: "mountain", name: "Potencial", def: "Energia da posição ou condição.", example: "Objeto no alto de uma estante, água represada." },
            { icon: "heat", name: "Térmica", def: "Ligada à agitação das partículas e à temperatura.", example: "Água quente, chuveiro ligado." },
            { icon: "zap", name: "Elétrica", def: "Associada às cargas elétricas.", example: "Tomada, aparelhos ligados." },
            { icon: "food", name: "Química", def: "Armazenada nas ligações químicas.", example: "Alimentos, combustíveis, baterias." },
            { icon: "sun", name: "Luminosa", def: "Transportada pela luz.", example: "Sol, lâmpada acesa." },
            { icon: "sound", name: "Sonora", def: "Relacionada às ondas sonoras.", example: "Alto-falante, trovão." },
            { icon: "atom", name: "Nuclear", def: "Associada ao núcleo dos átomos.", example: "Usinas nucleares, reações do Sol." },
          ],
        },
        {
          type: "concept",
          term: "Uma mesma situação pode envolver várias formas ao mesmo tempo.",
          paragraphs: [
            "Um carro em movimento tem energia cinética (por estar andando), mas a fonte desse movimento é a energia química do combustível. Na hora de identificar a forma principal, pergunte-se: \"o que está acontecendo de mais evidente aqui?\"",
          ],
        },
        {
          type: "identify",
          title: "Treine o olhar: qual é a forma principal de energia?",
          rounds: [
            {
              situation: "Um carro está se movimentando pela avenida.",
              options: ["Cinética", "Química", "Sonora", "Nuclear"],
              answer: 0,
              why: "O movimento é o destaque da cena — e energia associada ao movimento é cinética.",
            },
            {
              situation: "Um livro está parado no alto da estante.",
              options: ["Térmica", "Potencial", "Elétrica", "Luminosa"],
              answer: 1,
              why: "O livro está em uma posição elevada: tem energia potencial gravitacional \"guardada\", pronta para virar movimento se ele cair.",
            },
            {
              situation: "A água do chuveiro está esquentando.",
              options: ["Sonora", "Cinética", "Térmica", "Química"],
              answer: 2,
              why: "O aquecimento está ligado à agitação das partículas da água — energia térmica.",
            },
            {
              situation: "Um sanduíche esperando na sua mochila.",
              options: ["Química", "Nuclear", "Cinética", "Sonora"],
              answer: 0,
              why: "Os alimentos armazenam energia nas ligações químicas — é essa energia que seu corpo usa.",
            },
            {
              situation: "Um alto-falante tocando música alta.",
              options: ["Luminosa", "Térmica", "Potencial", "Sonora"],
              answer: 3,
              why: "A música se propaga por ondas sonoras — energia sonora (que veio da elétrica!).",
            },
            {
              situation: "Uma bateria de celular carregada, ainda desligada.",
              options: ["Cinética", "Química", "Térmica", "Sonora"],
              answer: 1,
              why: "A bateria guarda energia nas ligações químicas, pronta para virar energia elétrica quando o aparelho ligar.",
            },
          ],
        },
        {
          type: "minichallenge",
          q: "Uma bola parada no topo de uma rampa tem principalmente energia:",
          options: ["Cinética", "Térmica", "Potencial", "Sonora"],
          answer: 2,
          why: "Parada, ela não tem movimento (cinética é zero). Mas a posição no alto guarda energia potencial — que vira cinética quando a bola desce.",
        },
      ],
    },
    {
      id: "1-3",
      title: "Fontes de energia",
      goal: "Diferenciar forma de fonte de energia e conhecer as principais fontes renováveis e não renováveis.",
      blocks: [
        { type: "intro", text: "Aqui mora uma das confusões mais comuns da prova — e a gente vai resolver isso agora." },
        {
          type: "compare",
          left: {
            title: "Forma de energia",
            text: "É COMO a energia se apresenta: elétrica, térmica, cinética, luminosa...",
            example: "A luz do Sol é energia luminosa.",
          },
          right: {
            title: "Fonte de energia",
            text: "É DE ONDE a energia vem: o sol, o vento, a água, o petróleo...",
            example: "O Sol é a fonte dessa luz.",
          },
          note: "Macete: fonte = origem (de onde vem). Forma = aparência (como ela está na hora).",
        },
        {
          type: "text",
          text: "As fontes se dividem em dois grandes grupos. As renováveis se reabastecem naturalmente em ritmo humano: o sol nasce todo dia, o vento sopra, os rios correm. As não renováveis existem em quantidade limitada e levam milhões de anos para se formar: um dia, acabam.",
        },
        {
          type: "picker",
          title: "Toque em cada fonte para explorar",
          sources: [
            {
              icon: "sun", name: "Solar", tag: "Renovável",
              what: "Energia obtida diretamente da luz e do calor do Sol.",
              how: "Painéis fotovoltaicos convertem a radiação solar em energia elétrica.",
              where: "Telhados de casas, usinas solares, calculadoras, placas de rua.",
              pros: ["Inesgotável", "Não polui durante o uso", "Cresce rápido no Brasil"],
              cons: ["Não gera à noite", "Depende do clima", "Painéis ainda têm custo alto"],
            },
            {
              icon: "wind", name: "Eólica", tag: "Renovável",
              what: "Energia obtida da força dos ventos.",
              how: "O vento gira as pás de grandes aerogeradores, que produzem eletricidade.",
              where: "Parques eólicos, principalmente no Nordeste brasileiro.",
              pros: ["Limpa", "Fonte gratuita (o vento)", "Ocupa pouco solo útil"],
              cons: ["Só funciona onde venta bem", "Visual e ruído incomodam alguns", "Intermitente"],
            },
            {
              icon: "water", name: "Hidrelétrica", tag: "Renovável",
              what: "Energia obtida do movimento da água dos rios.",
              how: "A água represada desce com força e gira turbinas ligadas a geradores.",
              where: "Grandes usinas como Itaipu — principal fonte da matriz elétrica do Brasil.",
              pros: ["Grande potência", "Reservatório armazena energia", "Não emite CO₂ na geração"],
              cons: ["Alaga grandes áreas", "Afeta ecossistemas e comunidades", "Sofre com períodos de seca"],
            },
            {
              icon: "plant", name: "Biomassa", tag: "Renovável",
              what: "Energia de matéria orgânica: bagaço de cana, restos de madeira, dejetos.",
              how: "A queima ou decomposição do material gera calor, que produz eletricidade ou biogás.",
              where: "Usinas ligadas a usinas de açúcar e áreas rurais.",
              pros: ["Aproveita resíduos", "Pode gerar sob demanda", "Renovável se bem manejada"],
              cons: ["Queima emite poluentes", "Compete com uso de terra para alimentos"],
            },
            {
              icon: "oil", name: "Petróleo", tag: "Não renovável",
              what: "Combustível fóssil formado por restos de organismos ao longo de milhões de anos.",
              how: "Refinado, vira gasolina e diesel; também é queimado em termelétricas.",
              where: "Transporte (carros, caminhões, aviões) e geração elétrica.",
              pros: ["Muito energético", "Infraestrutura já existente"],
              cons: ["Vai acabar um dia", "Queima emite gases de efeito estufa", "Risco de vazamentos no mar"],
            },
            {
              icon: "coal", name: "Carvão mineral", tag: "Não renovável",
              what: "Rocha combustível fóssil, uma das fontes mais antigas da indústria.",
              how: "Queimado em termelétricas para aquecer água, gerar vapor e girar turbinas.",
              where: "Usinas termelétricas e indústrias siderúrgicas.",
              pros: ["Abundante em alguns países", "Tecnologia simples"],
              cons: ["Um dos maiores poluidores", "Mineração degrada o solo", "Finito"],
            },
          ],
        },
        {
          type: "text",
          text: "E o urânio? Ele é a fonte da energia nuclear: não renovável (existe em quantidade limitada), mas sua geração não queima nada — não emite CO₂ durante a operação. O problema são os rejeitos radioativos, que exigem cuidado por milhares de anos.",
        },
        {
          type: "minichallenge",
          q: "Qual destas opções é uma FONTE de energia?",
          options: ["Energia cinética", "O vento", "Energia sonora", "Energia elétrica"],
          answer: 1,
          why: "Vento é fonte — é de onde vem a energia eólica. Cinética, sonora e elétrica são formas de energia (como ela se apresenta).",
        },
      ],
    },
    {
      id: "1-4",
      title: "Transformação de energia",
      goal: "Identificar cadeias de transformação de energia em aparelhos e situações reais.",
      blocks: [
        {
          type: "intro",
          text: "A energia nunca fica parada: ela está o tempo todo mudando de forma. Nesta aula você vai ver quatro transformações do dia a dia, passo a passo — e perceber que toda transformação conta uma história de causa e efeito.",
        },
        {
          type: "flow",
          title: "Exemplo 1 — O chuveiro elétrico",
          steps: [
            { icon: "zap", label: "Energia elétrica" },
            { icon: "shower", label: "Resistência do chuveiro" },
            { icon: "flame", label: "Energia térmica" },
          ],
          note: "A corrente atravessa a resistência, que esquenta muito (Efeito Joule) e transfere o calor para a água. Elétrica → térmica.",
        },
        {
          type: "flow",
          title: "Exemplo 2 — O celular carregando",
          steps: [
            { icon: "plug", label: "Energia elétrica da tomada" },
            { icon: "battery", label: "Energia química na bateria" },
          ],
          note: "Ao carregar, a energia elétrica é guardada como energia química dentro da bateria.",
        },
        {
          type: "flow",
          title: "O mesmo celular em uso",
          steps: [
            { icon: "battery", label: "Química" },
            { icon: "zap", label: "Elétrica" },
            { icon: "bulb", label: "Luz" },
            { icon: "sound", label: "Som" },
            { icon: "flame", label: "Calor" },
          ],
          note: "Na hora de usar, o caminho se inverte e se divide: a bateria libera energia elétrica, que vira luz na tela, som no alto-falante e um pouco de calor.",
        },
        {
          type: "flow",
          title: "Exemplo 3 — O painel solar",
          steps: [
            { icon: "sun", label: "Radiação solar" },
            { icon: "zap", label: "Energia elétrica" },
          ],
          note: "Os painéis fotovoltaicos convertem a energia da luz do Sol diretamente em eletricidade, sem partes móveis.",
        },
        {
          type: "flow",
          title: "Exemplo 4 — O carro a gasolina",
          steps: [
            { icon: "oil", label: "Energia química" },
            { icon: "flame", label: "Energia térmica" },
            { icon: "car", label: "Energia mecânica" },
          ],
          note: "A queima da gasolina libera calor (térmica), que empurra os pistões e move o carro (mecânica). Repare: boa parte da energia se perde como calor no motor.",
        },
        {
          type: "concept",
          term: "Transformações reais quase sempre envolvem várias formas — e perdas.",
          paragraphs: [
            "Nenhuma transformação é perfeita: parte da energia sempre \"escapa\" como calor ou som indesejados. É por isso que um motor esquenta e uma lâmpada antiga queimava energia demais — ela produzia mais calor do que luz.",
            "Quando a prova mostrar uma situação, monte a cadeia: de qual forma a energia começa? Em qual forma ela é aproveitada? O que se perde no caminho?",
          ],
        },
        {
          type: "minichallenge",
          q: "Uma pessoa coloca o celular para carregar. Qual transformação representa melhor o armazenamento de energia na bateria durante o carregamento?",
          options: [
            "Energia elétrica em energia química",
            "Energia térmica em energia sonora",
            "Energia luminosa em energia cinética",
            "Energia sonora em energia térmica",
          ],
          answer: 0,
          why: "Durante o carregamento, a energia elétrica da tomada é guardada na bateria como energia química — para ser liberada depois, na hora de usar.",
        },
      ],
    },
    {
      id: "1-5",
      title: "Revisão",
      goal: "Consolidar tudo o que o módulo ensinou e checar se você está pronto para o quiz.",
      blocks: [
        {
          type: "keypoints",
          title: "Você precisa saber",
          items: [
            "Energia é a capacidade de provocar mudanças ou realizar trabalho.",
            "Energia não se cria nem se destrói: ela se transforma (Lei da Conservação).",
            "Joule (J) é a unidade oficial; kWh é a unidade prática da conta de luz (1 kWh = 3,6 milhões de J).",
            "As formas de energia: cinética, potencial, térmica, elétrica, química, luminosa, sonora e nuclear.",
            "Fonte é de onde a energia vem; forma é como ela se apresenta.",
            "Fontes renováveis se reabastecem (solar, eólica, hidrelétrica, biomassa); não renováveis se esgotam (petróleo, carvão, gás natural, urânio).",
            "Toda transformação tem perdas: parte da energia sempre vira calor ou som não aproveitados.",
          ],
        },
        {
          type: "map",
          nodes: [
            { title: "ENERGIA", desc: "Capacidade de provocar mudanças" },
            { title: "Formas de energia", desc: "Como ela se apresenta (cinética, térmica, elétrica...)" },
            { title: "Fontes de energia", desc: "De onde ela vem (sol, vento, petróleo...)" },
            { title: "Transformações", desc: "Como ela muda de uma forma para outra" },
          ],
        },
        {
          type: "mistakes",
          title: "Erros comuns — não caia neles",
          items: [
            {
              wrong: "\"Fonte de energia e forma de energia são a mesma coisa.\"",
              right: "Fonte é a origem (sol, vento, petróleo). Forma é a aparência (elétrica, térmica, cinética).",
            },
            {
              wrong: "\"Quando desligo a lâmpada, a energia foi destruída.\"",
              right: "Energia nunca é destruída. Enquanto acesa, ela foi transformada em luz e calor.",
            },
            {
              wrong: "\"Potência e energia são a mesma coisa.\"",
              right: "Potência (W) é a velocidade de consumo; energia (kWh) é potência × tempo de uso.",
            },
          ],
        },
        {
          type: "quickcheck",
          title: "Perguntas rápidas",
          questions: [
            {
              q: "Energia pode ser criada do nada?",
              options: ["Sim, pelos geradores", "Não, ela só se transforma"],
              answer: 1,
              why: "Lei da Conservação: energia não se cria nem se destrói.",
            },
            {
              q: "O Sol é uma fonte ou uma forma de energia?",
              options: ["Fonte", "Forma"],
              answer: 0,
              why: "O Sol é a fonte; a luz que ele emite é a forma (luminosa).",
            },
            {
              q: "Carvão mineral é renovável?",
              options: ["Sim", "Não, é fóssil e finito"],
              answer: 1,
              why: "Leva milhões de anos para se formar — é não renovável.",
            },
          ],
        },
        {
          type: "checklist",
          title: "Antes do quiz, confira:",
          items: [
            "Entendi o que é energia",
            "Sei o que é a conservação da energia",
            "Sei diferenciar as formas de energia",
            "Sei diferenciar fontes renováveis e não renováveis",
            "Consigo identificar transformações de energia",
          ],
        },
      ],
    },
    {
      id: "1-6",
      title: "Quiz do módulo",
      goal: "Testar de verdade o que você aprendeu — com conceito, interpretação e raciocínio.",
      requiresPrevious: true,
      quiz: [
        {
          q: "Segundo a definição física, energia é melhor descrita como:",
          options: [
            "Uma substância que os aparelhos consomem",
            "A capacidade de provocar mudanças ou realizar trabalho",
            "Uma força que existe só em objetos ligados na tomada",
            "O movimento das partículas de qualquer material",
          ],
          answer: 1,
          why: "Energia não é uma substância nem existe só na tomada: é a capacidade de fazer coisas acontecerem — acender, aquecer, mover.",
        },
        {
          q: "Uma lâmpada ficou acesa por horas e depois foi desligada. O que aconteceu com a energia elétrica consumida?",
          options: [
            "Foi destruída pelo uso",
            "Ficou guardada dentro da lâmpada",
            "Foi transformada, principalmente em luz e calor",
            "Voltou para a usina",
          ],
          answer: 2,
          why: "Pela Lei da Conservação, energia nunca é destruída: enquanto acesa, a elétrica virou luminosa e térmica.",
        },
        {
          q: "Um ventilador ligado na tomada realiza principalmente qual transformação?",
          options: [
            "Elétrica → mecânica (movimento das pás)",
            "Química → térmica",
            "Térmica → elétrica",
            "Sonora → luminosa",
          ],
          answer: 0,
          why: "A energia elétrica alimenta o motor, que gira as pás: o resultado aproveitado é movimento — energia mecânica/cinética.",
        },
        {
          q: "Uma pessoa correndo na esteira da academia tem, naquele momento, principalmente energia:",
          options: ["Potencial", "Química", "Cinética", "Nuclear"],
          answer: 2,
          why: "Correndo, o que aparece é o movimento — energia cinética. A energia química dos alimentos é a origem, mas a forma principal da cena é a cinética.",
        },
        {
          q: "Qual conjunto contém APENAS fontes renováveis?",
          options: [
            "Solar, eólica e carvão mineral",
            "Hidrelétrica, biomassa e solar",
            "Petróleo, gás natural e eólica",
            "Biomassa, urânio e hidrelétrica",
          ],
          answer: 1,
          why: "Carvão, petróleo, gás natural e urânio são não renováveis. Solar, eólica, hidrelétrica e biomassa se reabastecem naturalmente.",
        },
        {
          q: "\"A energia elétrica da minha casa veio da água de uma usina.\" Nessa frase, a água e a eletricidade são, respectivamente:",
          options: [
            "Forma e fonte de energia",
            "Fonte e forma de energia",
            "As duas são formas",
            "As duas são fontes",
          ],
          answer: 1,
          why: "A água do rio é a fonte (de onde vem); a energia elétrica é a forma em que ela chega à sua casa.",
        },
        {
          q: "Uma pessoa coloca um celular para carregar. Qual transformação representa melhor o armazenamento de energia na bateria durante o carregamento?",
          options: [
            "Energia elétrica em energia química",
            "Energia térmica em energia sonora",
            "Energia luminosa em energia cinética",
            "Energia sonora em energia térmica",
          ],
          answer: 0,
          why: "Ao carregar, a elétrica da tomada é armazenada como energia química na bateria. Em uso, o caminho se inverte.",
        },
        {
          q: "Uma geladeira (150 W) consome mais energia por mês do que um liquidificador (500 W), mesmo tendo potência menor. Por quê?",
          options: [
            "Porque a geladeira é mais antiga",
            "Porque energia consumida depende da potência E do tempo de uso — e a geladeira fica ligada o dia inteiro",
            "Porque o liquidificador não usa energia elétrica",
            "Porque a potência não influencia o consumo",
          ],
          answer: 1,
          why: "Consumo (kWh) = potência (kW) × horas de uso. O liquidificador é potente, mas liga por minutos; a geladeira trabalha 24h por dia.",
        },
      ],
    },
  ],
};

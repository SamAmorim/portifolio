
import { 
  Award, Globe2, Layers, // Para Stats
  Github, Linkedin, Mail, // Para Footer/Hero
  Database, Brain, Cloud, // Para Hero Cards
  Terminal, // Para Logo
  ShieldCheck, Zap, TrendingUp, // Para KPIs
  MessageSquare, // Para Global
  CalendarClock, // Novo icone para tempo de experiencia
  MapPin, // Novo icone para local
  Sword, Scroll, // RPG Icons (Mantidos apenas para compatibilidade de tipos)
  Code2, 
  Cpu,
  Server,
  BarChart3,
  Network,
  Users, // Adicionado para o KPI de usuários
  Share2 // Icone para posts
} from 'lucide-react';
import { SkillPoint, SkillCategory, TimelineItem, Project, Stat, EducationItem, CertificationItem, LinkedinPost } from './types';

// =================================================================================
// 1. INFORMAÇÕES GERAIS & HERO
// =================================================================================
export const heroData = {
  pt: {
    logoName: "Samuel",
    logoSurname: "Amorim",
    openToWork: true,
    openToWorkText: "Open to Work: Data Science & Analytics",
    title: "Samuel",
    titleHighlight: "Amorim.",
    description: (
      <>
        Transformando dados complexos em <strong>Vantagem Competitiva</strong>.
        <br className="hidden md:block" />
        Especialista em <strong>Engenharia de Dados</strong> robusta, <strong>Advanced Analytics</strong> e <strong>AI</strong> para suportar decisões críticas de negócio.
      </>
    ),
    primaryCtaText: "Ver Projetos",
    secondaryCtaText: "Linkedin",
    secondaryCtaLink: "https://linkedin.com/in/samamorim",
    githubLink: "https://github.com/SamAmorim",
    heroImage: "https://media.licdn.com/dms/image/v2/D4D03AQFShUiExc_lgA/profile-displayphoto-scale_400_400/B4DZoTTcF4G8Ag-/0/1761260456153?e=1768435200&v=beta&t=kTSr5nyvDfTqm7ogk-CyHcaBQSztg7S6zHjgQ0bgji8", 
    floatCard1: {
      icon: Database, 
      label: "Stack Principal", 
      text: "Azure & Databricks"
    },
    floatCard2: {
      icon: Brain, 
      label: "Especialidade",
      text: "Machine Learning"
    }
  },
  en: {
    logoName: "Samuel",
    logoSurname: "Amorim",
    openToWork: true,
    openToWorkText: "Open to Work: Data Science & Analytics",
    title: "Samuel",
    titleHighlight: "Amorim.",
    description: (
      <>
        Transforming complex data into <strong>Competitive Advantage</strong>.
        <br className="hidden md:block" />
        Specialist in robust <strong>Data Engineering</strong>, <strong>Advanced Analytics</strong>, and <strong>AI</strong> to support critical business decisions.
      </>
    ),
    primaryCtaText: "View Projects",
    secondaryCtaText: "Linkedin",
    secondaryCtaLink: "https://linkedin.com/in/samamorim",
    githubLink: "https://github.com/SamAmorim",
    heroImage: "https://media.licdn.com/dms/image/v2/D4D03AQFShUiExc_lgA/profile-displayphoto-scale_400_400/B4DZoTTcF4G8Ag-/0/1761260456153?e=1768435200&v=beta&t=kTSr5nyvDfTqm7ogk-CyHcaBQSztg7S6zHjgQ0bgji8", 
    floatCard1: {
      icon: Database, 
      label: "Main Stack", 
      text: "Azure & Databricks"
    },
    floatCard2: {
      icon: Brain, 
      label: "Specialty",
      text: "Machine Learning"
    }
  }
};

// =================================================================================
// 2. ESTATÍSTICAS (Barra Limpa e Profissional)
// =================================================================================
export const statsData = {
  pt: [
    { label: 'Experiência em Dados', value: '3+ Anos', icon: CalendarClock }, 
    { label: 'Projetos Globais', value: 'Multinacionais', icon: Globe2 }, 
    { label: 'Foco Técnico', value: 'Data & AI', icon: Layers }, 
  ],
  en: [
    { label: 'Data Experience', value: '3+ Years', icon: CalendarClock }, 
    { label: 'Global Projects', value: 'Multinationals', icon: Globe2 }, 
    { label: 'Tech Focus', value: 'Data & AI', icon: Layers }, 
  ]
};

// =================================================================================
// 3. SKILLS DASHBOARD
// =================================================================================

// CORES DO CONTROLE PLAYSTATION (HEX EXATO FORNECIDO)
// Azul Celta: #2E6DB4 | Verde Persa: #00AC9F | Papoula Dourada: #F3C300 | Vermelho Cádmio: #DF0024
export const skillColors: Record<SkillCategory, string> = {
  'Engenharia de Dados': '#2E6DB4', // Azul Celta
  'Data Engineering': '#2E6DB4',
  'Data Science & AI': '#00AC9F',   // Verde Persa
  'Data Science & AI (EN)': '#00AC9F',
  'Analytics & Viz': '#F3C300',     // Papoula Dourada
  'Analytics & Viz (EN)': '#F3C300',
  'Estratégia & Soft Skills': '#DF0024', // Vermelho Cádmio
  'Strategy & Soft Skills': '#DF0024'    
};

export const skillsClusterData = {
  pt: [
    // --- Engenharia de Dados (Azul) ---
    { name: 'Python', x: 95, y: 95, z: 110, category: 'Engenharia de Dados' },
    { name: 'SQL', x: 85, y: 90, z: 105, category: 'Engenharia de Dados' },
    { name: 'PySpark', x: 80, y: 85, z: 100, category: 'Engenharia de Dados' },
    { name: 'Databricks', x: 90, y: 60, z: 105, category: 'Engenharia de Dados' },
    { name: 'ADF', x: 75, y: 55, z: 95, category: 'Engenharia de Dados' },
    { name: 'Lakehouse', x: 70, y: 70, z: 100, category: 'Engenharia de Dados' },
    { name: 'Microservices', x: 50, y: 30, z: 80, category: 'Engenharia de Dados' },
    { name: 'REST API', x: 65, y: 45, z: 85, category: 'Engenharia de Dados' },
    // --- Data Science & AI (Verde) ---
    { name: 'ML', x: 65, y: 20, z: 95, category: 'Data Science & AI' },
    { name: 'TensorFlow', x: 60, y: 10, z: 90, category: 'Data Science & AI' },
    { name: 'Keras', x: 62, y: 12, z: 85, category: 'Data Science & AI' },
    { name: 'Statistics', x: 80, y: 5, z: 90, category: 'Data Science & AI' },
    { name: 'Scikit-Learn', x: 75, y: 15, z: 85, category: 'Data Science & AI' },
    { name: 'MLflow', x: 70, y: 25, z: 80, category: 'Data Science & AI' },
    // --- Analytics & Viz (Amarelo) ---
    { name: 'Power BI', x: 30, y: 90, z: 100, category: 'Analytics & Viz' },
    { name: 'DAX', x: 40, y: 80, z: 95, category: 'Analytics & Viz' },
    { name: 'Star Schema', x: 35, y: 60, z: 90, category: 'Analytics & Viz' },
    // --- Estratégia & Soft Skills (Vermelho) ---
    { name: 'Governance', x: -50, y: 70, z: 90, category: 'Estratégia & Soft Skills' },
    { name: 'Agile', x: -40, y: 50, z: 85, category: 'Estratégia & Soft Skills' },
    { name: 'Six Sigma', x: -30, y: 40, z: 80, category: 'Estratégia & Soft Skills' },
    { name: 'Prob. Solving', x: -70, y: 80, z: 95, category: 'Estratégia & Soft Skills' },
  ] as SkillPoint[],
  en: [
    // --- Data Engineering ---
    { name: 'Python', x: 95, y: 95, z: 110, category: 'Data Engineering' },
    { name: 'SQL', x: 85, y: 90, z: 105, category: 'Data Engineering' },
    { name: 'PySpark', x: 80, y: 85, z: 100, category: 'Data Engineering' },
    { name: 'Databricks', x: 90, y: 60, z: 105, category: 'Data Engineering' },
    { name: 'ADF', x: 75, y: 55, z: 95, category: 'Data Engineering' },
    { name: 'Lakehouse', x: 70, y: 70, z: 100, category: 'Data Engineering' },
    { name: 'Microservices', x: 50, y: 30, z: 80, category: 'Data Engineering' },
    { name: 'REST API', x: 65, y: 45, z: 85, category: 'Data Engineering' },
    // --- Data Science & AI ---
    { name: 'ML', x: 65, y: 20, z: 95, category: 'Data Science & AI (EN)' },
    { name: 'TensorFlow', x: 60, y: 10, z: 90, category: 'Data Science & AI (EN)' },
    { name: 'Keras', x: 62, y: 12, z: 85, category: 'Data Science & AI (EN)' },
    { name: 'Statistics', x: 80, y: 5, z: 90, category: 'Data Science & AI (EN)' },
    { name: 'Scikit-Learn', x: 75, y: 15, z: 85, category: 'Data Science & AI (EN)' },
    { name: 'MLflow', x: 70, y: 25, z: 80, category: 'Data Science & AI (EN)' },
    // --- Analytics & Viz ---
    { name: 'Power BI', x: 30, y: 90, z: 100, category: 'Analytics & Viz (EN)' },
    { name: 'DAX', x: 40, y: 80, z: 95, category: 'Analytics & Viz (EN)' },
    { name: 'Star Schema', x: 35, y: 60, z: 90, category: 'Analytics & Viz (EN)' },
    // --- Strategy & Soft Skills ---
    { name: 'Governance', x: -50, y: 70, z: 90, category: 'Strategy & Soft Skills' },
    { name: 'Agile', x: -40, y: 50, z: 85, category: 'Strategy & Soft Skills' },
    { name: 'Six Sigma', x: -30, y: 40, z: 80, category: 'Strategy & Soft Skills' },
    { name: 'Prob. Solving', x: -70, y: 80, z: 95, category: 'Strategy & Soft Skills' },
  ] as SkillPoint[]
};

// KPIs DE IMPACTO - REFINADOS PARA PERFIL TÉCNICO & ESTRATÉGICO
export const impactMetrics = {
  pt: [
    {
      id: 1,
      label: "Modelagem de Dados",
      value: "Architecture",
      suffix: "& Governance",
      description: "Design de arquiteturas escaláveis (Lakehouse/Medallion) garantindo integridade, segurança e performance.",
      icon: Database,
      color: "text-ps-blue", 
      bg: "bg-ps-blue/10",
      border: "border-ps-blue/20"
    },
    {
      id: 2,
      label: "Programação & Eng.",
      value: "Python",
      suffix: "SQL / Spark",
      description: "Construção de pipelines de dados resilientes, APIs e automação de fluxos de trabalho complexos.",
      icon: Code2,
      color: "text-ps-yellow",
      bg: "bg-ps-yellow/10",
      border: "border-ps-yellow/20"
    },
    {
      id: 3,
      label: "Data Driven Strategy",
      value: "Business",
      suffix: "Intelligence",
      description: "Transformação de dados brutos em insights acionáveis para guiar decisões executivas (C-Level).",
      icon: TrendingUp,
      color: "text-ps-red",
      bg: "bg-ps-red/10",
      border: "border-ps-red/20"
    },
    {
      id: 4,
      label: "AI & Machine Learning",
      value: "Applied",
      suffix: "AI Solutions",
      description: "Desenvolvimento de modelos preditivos e algoritmos aplicados para resolver dores reais do negócio.",
      icon: Brain,
      color: "text-ps-green",
      bg: "bg-ps-green/10",
      border: "border-ps-green/20"
    }
  ],
  en: [
    {
      id: 1,
      label: "Data Modeling",
      value: "Architecture",
      suffix: "& Governance",
      description: "Design of scalable architectures (Lakehouse/Medallion) ensuring data integrity, security, and performance.",
      icon: Database,
      color: "text-ps-blue",
      bg: "bg-ps-blue/10",
      border: "border-ps-blue/20"
    },
    {
      id: 2,
      label: "Programming & Eng.",
      value: "Python",
      suffix: "SQL / Spark",
      description: "Building resilient data pipelines, APIs, and automating complex workflows.",
      icon: Code2,
      color: "text-ps-yellow",
      bg: "bg-ps-yellow/10",
      border: "border-ps-yellow/20"
    },
    {
      id: 3,
      label: "Data Driven Strategy",
      value: "Business",
      suffix: "Intelligence",
      description: "Transforming raw data into actionable insights to guide executive (C-Level) decision-making.",
      icon: TrendingUp,
      color: "text-ps-red",
      bg: "bg-ps-red/10",
      border: "border-ps-red/20"
    },
    {
      id: 4,
      label: "AI & Machine Learning",
      value: "Applied",
      suffix: "AI Solutions",
      description: "Development of predictive models and algorithms applied to solve real business pain points.",
      icon: Brain,
      color: "text-ps-green",
      bg: "bg-ps-green/10",
      border: "border-ps-green/20"
    }
  ]
};

// DADOS DE COLABORAÇÃO GLOBAL (Global Collaboration)
export const globalLocations = {
  pt: [
    { country: "Brasil", flag: "🇧🇷", city: "São Paulo", role: "HQ & Data Engineering", status: "Active" },
    { country: "EUA", flag: "🇺🇸", city: "St. Louis / NJ", role: "Stakeholder Management", status: "Active" },
    { country: "Alemanha", flag: "🇩🇪", city: "Leverkusen", role: "Strategy & Directives", status: "Sync" },
    { country: "Índia", flag: "🇮🇳", city: "Bangalore", role: "Dev & Delivery", status: "Active" },
    { country: "LATAM", flag: "🌎", city: "Regional Hubs", role: "Business Partners", status: "Active" },
  ],
  en: [
    { country: "Brazil", flag: "🇧🇷", city: "São Paulo", role: "HQ & Data Engineering", status: "Active" },
    { country: "USA", flag: "🇺🇸", city: "St. Louis / NJ", role: "Stakeholder Management", status: "Active" },
    { country: "Germany", flag: "🇩🇪", city: "Leverkusen", role: "Strategy & Directives", status: "Sync" },
    { country: "India", flag: "🇮🇳", city: "Bangalore", role: "Dev & Delivery", status: "Active" },
    { country: "LATAM", flag: "🌎", city: "Regional Hubs", role: "Business Partners", status: "Active" },
  ]
};

export const hardSkillsList = [
  "Python", "SQL", "PySpark", 
  "Azure Databricks", "Azure Data Factory", 
  "TensorFlow", "Keras", "Java", "Microsserviços",
  "Power BI", "Data Governance", "Scrum", "Six Sigma"
];

// =================================================================================
// 4. LINHA DO TEMPO (Experiência)
// =================================================================================
export const timelineData = {
  pt: [
    {
      id: 1,
      year: 'Atual',
      title: 'Analista de Dados & Engenharia',
      company: 'Conquest One (Alocado na Bayer)',
      description: 'Atuação no Data Driven Hub. Desenvolvimento de pipelines de dados robustos (ETL/ELT) utilizando Azure Databricks e PySpark. Implementação de Governança de Dados para garantir confiabilidade (Single Source of Truth). Criação de Dashboards executivos em Power BI para suporte à decisão estratégica.',
      skills: ['Azure Databricks', 'PySpark', 'Data Governance', 'Power BI', 'SQL']
    },
    {
      id: 2,
      year: 'Anterior',
      title: 'Estágio em Strategy, Governance & Data',
      company: 'Bayer',
      description: 'Suporte à estratégia de dados e governança global. Participação na modernização de arquitetura de dados e colaboração com times globais usando metodologias ágeis (Scrum). Automação de processos e análise de qualidade de dados.',
      skills: ['ITIL', 'Data Governance', 'Agile', 'Comunicação Global', 'Excel']
    },
  ],
  en: [
    {
      id: 1,
      year: 'Current',
      title: 'Data Analyst & Engineering',
      company: 'Conquest One (Allocated at Bayer)',
      description: 'Working at the Data Driven Hub. Developing robust data pipelines (ETL/ELT) using Azure Databricks and PySpark. Implementing Data Governance to ensure reliability (Single Source of Truth). Creating executive Power BI dashboards to support strategic decision-making.',
      skills: ['Azure Databricks', 'PySpark', 'Data Governance', 'Power BI', 'SQL']
    },
    {
      id: 2,
      year: 'Previous',
      title: 'Strategy, Governance & Data Intern',
      company: 'Bayer',
      description: 'Supporting global data strategy and governance. Participating in data architecture modernization and collaborating with global teams using agile methodologies (Scrum). Process automation and data quality analysis.',
      skills: ['ITIL', 'Data Governance', 'Agile', 'Global Communication', 'Excel']
    },
  ]
};

// =================================================================================
// 5. EDUCAÇÃO (NOVO)
// =================================================================================
export const educationData = {
  pt: [
    {
      id: 1,
      degree: "Bacharelado em Sistemas de Informação",
      institution: "Universidade Anhembi Morumbi",
      year: "2022 - 2025",
      status: "Completed" as const, // Assumindo conclusão em 2025
      type: "Bachelor" as const,
      description: "Formação sólida em computação e análise de sistemas com ênfase em dados. O curso abrangeu desde a engenharia de software e arquitetura de soluções até modelagem avançada de bancos de dados (SQL & NoSQL). Durante a graduação, direcionei projetos acadêmicos e eletivas para Ciência de Dados, BI e Estatística Aplicada, desenvolvendo uma base robusta para atuar com Big Data e Machine Learning."
    },
  ],
  en: [
    {
      id: 1,
      degree: "Bachelor of Information Systems",
      institution: "Universidade Anhembi Morumbi",
      year: "2022 - 2025",
      status: "Completed" as const,
      type: "Bachelor" as const,
      description: "Solid foundation in computing and systems analysis with a focus on data. The program covered software engineering and solution architecture to advanced database modeling (SQL & NoSQL). Throughout my studies, I directed academic projects and electives towards Data Science, BI, and Applied Statistics, building a robust base for working with Big Data and Machine Learning."
    }
  ]
};

// =================================================================================
// 6. PROJETOS
// =================================================================================
export const projectsData = {
  pt: [
    {
      id: 1,
      title: 'IARA: Antifraude AI',
      subtitle: 'Deep Learning para Detecção de Fraudes no PIX',
      category: 'Data Science & Cloud',
      status: 'Completed',
      date: 'Jul - Nov 2025',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop', 
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop'
      ],
      description: 'Solução Antifraude de alto impacto desenvolvida para mitigar fraudes no PIX através de Deep Learning e Dados Sintéticos.',
      problem: 'O ecossistema de Pagamentos Instantâneos (PIX) exige detecção de fraudes em milissegundos. O maior desafio técnico foi o treinamento de modelos supervisionados robustos em um cenário de escassez de dados de fraude reais (devido ao Sigilo Bancário) e a necessidade de identificar tipologias complexas como "Smurfing", "Structuring" e Contas Laranja.',
      solution: `Desenvolvi uma solução de ponta a ponta focada em inovação algorítmica e eficiência de infraestrutura:\n\n**1. Motor de Simulação Estocástica (Synthetic Data Engine):**\nCriei um gerador de dados sintéticos baseado em estatística avançada para superar o bloqueio de dados sensíveis. O motor simula um ecossistema financeiro completo modelando milhões de agentes e injetando padrões de fraude baseados em grafos (Topologias de Lavagem de Dinheiro) e comportamentos de Engenharia Social, gerando um Lakehouse rico para treinamento.\n\n**2. Arquitetura de IA em Cascata:**\nImplementei uma estratégia de inferência em dois estágios para otimizar precisão e custo computacional:\n- **Estágio 1 (Filtro de Risco):** Modelo binário de Deep Learning (TensorFlow/Keras) focado em altíssimo Recall (92.67%) para capturar qualquer anomalia suspeita.\n- **Estágio 2 (Tipificador):** Modelo Multiclasse acionado apenas para transações de risco, classificando a tipologia exata do ataque (ex: Ataque de Dicionário vs. Lavagem de Dinheiro).\n\n**3. Arquitetura & Detalhes Técnicos:**\n- **Cloud & Serverless:** Deploy realizado no Azure Functions para garantir escalabilidade elástica e cobrança por execução.\n- **Backend:** Microsserviços em Java Spring Boot orquestram a comunicação entre o core bancário e os modelos de IA.\n- **MLOps:** Pipeline completo com MLflow para rastreamento de experimentos e versionamento de modelos.`,
      impactMetrics: [
        { label: 'Recall', value: '92.7%' },
        { label: 'Latência', value: '<200ms' },
        { label: 'Cloud', value: 'Azure Serverless' },
        { label: 'Dados', value: 'Synthetic Lakehouse' }
      ],
      tags: ['Python', 'TensorFlow', 'Keras', 'Azure Functions', 'Spring Boot', 'Java', 'MLflow', 'Scikit-Learn', 'Stochastic Modeling', 'Microservices', 'Lakehouse', 'SQL'],
      repoUrl: 'https://github.com/SamAmorim/IARA',
      docsUrl: 'https://samamorim.github.io/IARA/' // URL da documentação adicionada
    },
    {
      id: 2,
      title: 'Music RecSys',
      subtitle: 'Sistema de Recomendação Semissupervisionado',
      category: 'Machine Learning',
      status: 'Completed',
      date: 'Jul 2024 - Nov 2024',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop'
      ],
      description: 'Sistema premiado de recomendação musical. Utiliza Aprendizado Semissupervisionado.',
      problem: 'Desenvolvimento de um sistema de recomendação musical (Recommender System) escalável, usando dados públicos (Kaggle/Spotify Dataset) sem rótulos de preferência. O desafio principal foi criar um modelo de IA capaz de superar o problema de "Cold Start" e gerar rótulos para classificar os perfis de usuário sem dados históricos prévios.',
      solution: `Liderei o desenvolvimento de um modelo de Ciência de Dados (Data Science) ponta a ponta:\n\n**1. ETL e Pré-processamento:**\nEstruturei o pipeline de ETL em Python (Pandas, NumPy) para extração, limpeza de dados (tratamento de valores ausentes) e normalização das variáveis.\n\n**2. Modelo de Machine Learning:**\nApliquei Aprendizado Semissupervisionado com Scikit-Learn. Usei Análise de Clusters (Clustering), validada pelo Método do Cotovelo (Elbow Method), para agrupar e rotular perfis de consumo.\n\n**3. Motor de Recomendação:**\nDefini a lógica de sugestão usando Análise de Similaridade por Cosseno (Cosine Similarity), comparando o histórico (ou input inicial) do usuário com os clusters gerados.\n\n**4. Aplicação Final:**\nConstrução da API REST em Flask e dashboard responsivo com Bootstrap e Chart.js.`,
      impactMetrics: [
        { label: 'Acurácia', value: '97%' },
        { label: 'Assertividade', value: '94%' },
        { label: 'Status', value: 'Projeto Premiado' }
      ],
      tags: ['Python', 'Scikit-Learn', 'Pandas', 'Clustering', 'K-Means', 'Statistics', 'Flask', 'Chart.js', 'Kaggle Dataset'],
      repoUrl: 'https://github.com/SamAmorim/Music_Recommendation_Algorithm_Semisupervised_AI',
      // Botões liveUrl e docsUrl removidos para este projeto
    },
    {
      id: 3,
      title: 'PBI Kpi Builder',
      subtitle: 'Automação de UI para Power BI',
      category: 'Open Source Tool',
      status: 'Maintenance',
      date: 'Desde Dez 2025',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 
      description: 'Acelerador de desenvolvimento que cria visuais HTML/CSS visuals complexos para Power BI automaticamente.',
      problem: 'Criar cartões de KPI visualmente ricos no Power BI nativo é limitado. A alternativa (visuais HTML/CSS) exige concatenação manual de strings DAX, que é propenso a erros, difícil de manter e consome muito tempo de desenvolvimento.',
      solution: 'Criei uma ferramenta web que permite ao usuário desenhar o card visualmente e gera automaticamente o código DAX/HTML otimizado. A ferramenta suporta injeção de variáveis dinâmicas, temas dark/light automáticos e validação de sintaxe SVG, reduzindo drasticamente o tempo de engenharia de dashboard.',
      impactMetrics: [
        { label: 'Produtividade', value: '+40% Speed' },
        { label: 'Human Error', value: 'Zero Syntax Errors' },
        { label: 'Adoption', value: 'Open Source' }
      ],
      tags: ['Power BI', 'DAX', 'HTML/CSS', 'Open Source', 'UI/UX'],
      repoUrl: 'https://github.com/SamAmorim/Kpi-Card-Builder',
      liveUrl: 'https://samamorim.github.io/Kpi-Card-Builder/', // URL da demo adicionada
      // Botão docsUrl removido para este projeto
    }
  ] as Project[],
  en: [
    {
      id: 1,
      title: 'IARA: Antifraud AI',
      subtitle: 'Deep Learning for PIX Fraud Detection',
      category: 'Data Science & Cloud',
      status: 'Completed',
      date: 'Jul - Nov 2025',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop', 
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop'
      ],
      description: 'High-impact Antifraud solution developed to mitigate PIX fraud using Deep Learning and Synthetic Data.',
      problem: 'The Instant Payment system (PIX) demands real-time fraud detection with minimal latency. The main technical challenge was training robust supervised models in a scenario of scarce real fraud data (due to Banking Secrecy) and the need to identify complex typologies like "Smurfing", "Structuring", and Money Mule Accounts.',
      solution: `Developed an end-to-end solution focused on algorithmic innovation and infrastructure efficiency:\n\n**1. Stochastic Simulation Engine (Synthetic Data Engine):**\nCreated a synthetic data generator based on advanced statistics to overcome sensitive data blocking. The engine simulates a complete financial ecosystem by modeling millions of agents and injecting graph-based fraud patterns (Money Laundering Topologies) and Social Engineering behaviors, generating a rich Lakehouse for training.\n\n**2. Cascade AI Architecture:**\nImplemented a two-stage inference strategy to optimize precision and computational cost:\n- **Stage 1 (Risk Filter):** A Deep Learning binary model (TensorFlow/Keras) focused on extremely high Recall (92.67%) to capture any suspicious anomaly.\n- **Stage 2 (Typifier):** A Multiclass model triggered only for risky transactions, classifying the exact attack typology (e.g., Dictionary Attack vs. Money Laundering).\n\n**3. Architecture & Technical Details:**\n- **Cloud & Serverless:** Deployed on Azure Functions to ensure elastic scalability and pay-per-execution billing.\n- **Backend:** Java Spring Boot microservices orchestrate communication between the banking core and AI models.\n- **MLOps:** Complete pipeline with MLflow for experiment tracking and model versioning.`,
      impactMetrics: [
        { label: 'Recall', value: '92.7%' },
        { label: 'Latency', value: '<200ms' },
        { label: 'Cloud', value: 'Azure Serverless' },
        { label: 'Data', value: 'Synthetic Lakehouse' }
      ],
      tags: ['Python', 'TensorFlow', 'Keras', 'Azure Functions', 'Spring Boot', 'Java', 'MLflow', 'Scikit-Learn', 'Stochastic Modeling', 'Microservices', 'Lakehouse', 'SQL'],
      repoUrl: 'https://github.com/SamAmorim/IARA',
      docsUrl: 'https://samamorim.github.io/IARA/' // Documentation link added
    },
    {
      id: 2,
      title: 'Music RecSys',
      subtitle: 'Semi-supervised Recommendation System',
      category: 'Machine Learning',
      status: 'Completed',
      date: 'Jul 2024 - Nov 2024',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop'
      ],
      description: 'Award-winning music recommendation system. Uses Semi-Supervised Learning.',
      problem: 'Development of a scalable music recommendation system (Recommender System) using public data (Kaggle/Spotify Dataset) without preference labels. The main challenge was to create an AI model capable of overcoming the "Cold Start" problem and generating labels to classify user profiles without prior historical data.',
      solution: `Led the end-to-end Data Science model development:\n\n**1. ETL & Preprocessing:**\nStructured the ETL pipeline in Python (Pandas, NumPy) for extraction, data cleaning (handling missing values), and variable normalization.\n\n**2. Machine Learning Model:**\nApplied Semi-supervised Learning with Scikit-Learn. Used Cluster Analysis (Clustering), validated by the Elbow Method, to group and label consumption profiles.\n\n**3. Recommendation Engine:**\nDefined the suggestion logic using Cosine Similarity Analysis, comparing the user history (or initial input) with generated clusters.\n\n**4. Final Application:**\nBuilt the REST API in Flask and responsive dashboard with Bootstrap and Chart.js.`,
      impactMetrics: [
        { label: 'Accuracy', value: '97%' },
        { label: 'Assertiveness', value: '94%' },
        { label: 'Status', value: 'Award Winning' }
      ],
      tags: ['Python', 'Scikit-Learn', 'Pandas', 'Clustering', 'K-Means', 'Statistics', 'Flask', 'Chart.js', 'Kaggle Dataset'],
      repoUrl: 'https://github.com/SamAmorim/Music_Recommendation_Algorithm_Semisupervised_AI',
      // Buttons removed
    },
    {
      id: 3,
      title: 'PBI Kpi Builder',
      subtitle: 'UI Automation for Power BI',
      category: 'Open Source Tool',
      status: 'Maintenance',
      date: 'Since Dec 2025',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 
      description: 'Development accelerator creating complex HTML/CSS visuals for Power BI automatically.',
      problem: 'Creating visually rich KPI cards in native Power BI is limited. The alternative (HTML/CSS visuals) requires manual DAX string concatenation, which is error-prone, hard to maintain, and consumes significant development time.',
      solution: 'Created a web tool that allows the user to design the card visually and automatically generates optimized DAX/HTML code. The tool supports dynamic variable injection, automatic light/dark themes, and SVG syntax validation, drastically reducing dashboard engineering time.',
      impactMetrics: [
        { label: 'Productivity', value: '+40% Speed' },
        { label: 'Human Error', value: 'Zero Syntax Errors' },
        { label: 'Adoption', value: 'Open Source' }
      ],
      tags: ['Power BI', 'DAX', 'HTML/CSS', 'Open Source', 'UI/UX'],
      repoUrl: 'https://github.com/SamAmorim/pbi-ui-kit',
      liveUrl: 'https://samamorim.github.io/Kpi-Card-Builder/', // Demo link added
      // Buttons removed
    }
  ] as Project[]
};

// =================================================================================
// 8. LINKEDIN POSTS (Featured)
// =================================================================================
// COMO PEGAR O LINK: No post do LinkedIn > Três pontos (...) > Incorporar essa publicação > Copiar o valor de src="..."
export const linkedinPostsData = {
  pt: [
    {
      id: 1,
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7409597656135712769", 
      title: "Ferramenta: KPI Card Builder"
    },
    {
      id: 2,
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7399531533998481408", 
      title: "IARA: Detecção de Fraude AI"
    },
    {
      id: 3,
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7328781289140936704", 
      title: "Publicação Científica: AI"
    }
  ] as LinkedinPost[],
  en: [
    {
      id: 1,
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7409597656135712769", 
      title: "Tool: KPI Card Builder"
    },
    {
      id: 2,
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7399531533998481408", 
      title: "IARA: Antifraud AI"
    },
    {
      id: 3,
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7328781289140936704", 
      title: "Scientific Publication: AI"
    }
  ] as LinkedinPost[]
};

// =================================================================================
// 7. FOOTER & CONTATO
// =================================================================================
export const footerData = {
  pt: {
    title: "Vamos conversar sobre dados?",
    description: "Disponível para desafios em Engenharia de Dados, Analytics e Data Science.",
    navLinks: [
      { name: 'Início', href: '#' },
      { name: 'Skills', href: '#skills' },
      { name: 'Experiência', href: '#experience' }, 
      { name: 'Projetos', href: '#projects' },
      { name: 'Posts', href: '#posts' }, // Adicionado link para Posts
    ],
    email: "samuelamorim811@gmail.com", 
    location: "São Paulo, SP - Brasil",
  },
  en: {
    title: "Let's talk data?",
    description: "Available for challenges in Data Engineering, Analytics, and Data Science.",
    navLinks: [
      { name: 'Home', href: '#' },
      { name: 'Skills', href: '#skills' },
      { name: 'Experience', href: '#experience' }, 
      { name: 'Projects', href: '#projects' },
      { name: 'Posts', href: '#posts' }, // Added link for Posts
    ],
    email: "samuelamorim811@gmail.com", 
    location: "São Paulo, SP - Brazil",
  },
  socialLinks: [
    { icon: Linkedin, href: "https://linkedin.com/in/samamorim" }, 
    { icon: Github, href: "https://github.com/SamAmorim" }, 
    { icon: Mail, href: "mailto:samuelamorim811@gmail.com" },
  ],
  legalLinks: [
    { name: "Linkedin", href: "https://linkedin.com" },
    { name: "GitHub", href: "https://github.com/SamAmorim" }
  ]
};

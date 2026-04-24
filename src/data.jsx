/* Sparsh's portfolio data. All globals consumed by sections.jsx, projects.jsx, app.jsx. */

/* eslint-disable no-unused-vars */

const personal = {
  name: "Sparsh Garg",
  email: "sparshg9@uw.edu",
  linkedin: "https://www.linkedin.com/in/sparshgarg98/",
  github: "https://github.com/sparshgarg",
};

const taglineOptions = [
  { id: "select",   prefix: "From",            scribble: "SELECT *",        suffix: "to shipped." },
  { id: "apis",     prefix: "APIs,",           scribble: "LLMs,",           suffix: "and the occasional PRD." },
  { id: "experiments", prefix: "I ship",       scribble: "experiments,",    suffix: "not slide decks." },
  { id: "building", prefix: "Building",        scribble: "AI",              suffix: "products that don't end up as demos." },
  { id: "zero",     prefix: "Zero-to-one, or", scribble: "one-to-many —",   suffix: "either way, shipped." },
];

const marqueeItems = [
  { label: "HTML", logo: "public/tool-logos/html5.svg" },
  { label: "JavaScript", logo: "public/tool-logos/javascript.svg" },
  { label: "SQL", monogram: "SQL" },
  { label: "Tableau", logo: "public/tool-logos/tableau.svg" },
  { label: "Power BI", logo: "public/tool-logos/powerbi.svg" },
  { label: "MS Office", logo: "public/tool-logos/microsoft365.svg" },
  { label: "n8n", logo: "public/tool-logos/n8n.svg" },
  { label: "Zapier", logo: "public/tool-logos/zapier.svg" },
];

const numbers = [
  { val: "7",   unit: "yr",   label: "Shipping products across AI, cloud, and fintech" },
  { val: "4",   unit: "",     label: "Production ML/LLM features shipped since 2023" },
  { val: "$1.2", unit: "M",   label: "Cost takeout driven by pipeline + infra work" },
  { val: "3",   unit: "x",    label: "Teams scaled from PRD to GA" },
];

const projects = [
  {
    key: "productguru",
    name: "ProductGuru",
    kind: "AI · PM assistant",
    desc: "A Gemini-powered copilot for product managers — drafts PRDs, runs strategy walk-throughs, and answers PM questions in a clean chat UI.",
    tags: ["Google Gemini", "React", "TypeScript","Product Management", "Vite"],
    status: "live",
    link: "https://sparshgarg.github.io/productguru/",
    visual: "chat",
    size: "featured",
    hue: 260,
  },
  {
    key: "llmbench",
    name: "LLM Insight Pipeline",
    kind: "Data · LLM",
    desc: "Weekly benchmark pipeline turning raw SMB data into structured insights. Evals, drift alerts, and a JSON contract the product team actually uses.",
    tags: ["Python", "OpenAI", "Evals", "Airflow"],
    status: "developing",
    link: null,
    visual: "pipeline",
    size: "",
    hue: 180,
  },
  {
    key: "graphrag",
    name: "GraphRAG Prototype",
    kind: "AI · Retrieval",
    desc: "Typed-entity retrieval graph for long-tail support queries. Beat flat-vector RAG on recall for multi-hop questions in internal evals.",
    tags: ["GraphRAG", "Neo4j", "OpenAI", "LangChain"],
    status: "developing",
    link: null,
    visual: "graph",
    size: "",
    hue: 30,
  },
  {
    key: "n8n",
    name: "PM Automation Stack",
    kind: "Ops · Automation",
    desc: "n8n + LLMs wiring Jira, Slack, and Linear together — kills the Monday-morning status meeting. Used by 3 squads.",
    tags: ["n8n", "OpenAI", "Jira", "Slack"],
    status: "developing",
    link: null,
    visual: "n8n",
    size: "",
    hue: 140,
  },
  {
    key: "ab",
    name: "Experimentation Platform",
    kind: "Platform · PM",
    desc: "Self-serve A/B framework for a payments team. From PRD to rollout in 9 months — 40+ experiments shipped in the first year.",
    tags: ["A/B", "Stats", "React", "Kafka"],
    status: "live",
    link: null,
    visual: "ab",
    size: "",
    hue: 340,
  },
];

const experiences = [
  {
    company: "Amazon Web Services",
    role: "Technical Product Manager (Intern)",
    team: "EC2 · Networking",
    period: "Summer 2025",
    logo: "aws",
    bullets: [
      "Owned PRD + GTM for a networking telemetry feature rolled out to 5 regions.",
      "Partnered with eng, SAs, and security to take the feature from proposal to closed beta in 12 weeks.",
      "Ran 8 customer discovery calls; reframed the roadmap around a new SMB segment.",
    ],
    tags: ["PM", "Networking", "Cloud", "AWS"],
  },
  {
    company: "American Express",
    role: "Senior Engineer → Associate PM",
    team: "Digital Payments · Risk",
    period: "2019 — 2024",
    logo: "amex",
    bullets: [
      "Shipped a real-time fraud scoring service handling 8k+ RPS with a 12 ms p99 latency budget.",
      "Led migration of a legacy batch scoring pipeline to streaming; cut cost $1.2M/yr and halved SLA breaches.",
      "Mentored 6 engineers across 2 squads; ran the on-call rotation and incident review practice.",
    ],
    tags: ["Payments", "Java", "Kafka", "PM", "Risk"],
  },
  {
    company: "FoodClub",
    role: "Product Engineer",
    team: "Growth",
    period: "2018 — 2019",
    logo: "foodclub",
    bullets: [
      "Early engineer at a consumer food-delivery startup — scaled the ordering flow from 0 → 3k weekly orders.",
      "Built the merchant onboarding tool and the first version of the search + ranking system.",
    ],
    tags: ["Startup", "Full-stack", "Growth"],
  },
];

const education = [
  {
    school: "UW Foster",
    univ: "University of Washington",
    degree: "MBA, Tech Management concentration",
    date: "2024 — 2026",
    featured: true,
    highlights: [
      "Product Management Club · VP of AI programming",
      "Foster Tech Club · mentor",
      "GPA 3.9 · Dean's list",
    ],
  },
  {
    school: "IIIT",
    univ: "International Institute of Information Technology",
    degree: "B.Tech, Computer Science",
    date: "2014 — 2018",
    featured: false,
    highlights: [
      "Graduated with distinction",
      "Finalist · ACM ICPC regionals",
    ],
  },
];

const leadership = [
  { org: "Foster PM Club",   title: "VP, AI programming",     desc: "Ran the 2025 AI-PM speaker series. 6 sessions, 200+ attendees." },
  { org: "Foster Tech Club", title: "Mentor",                  desc: "1:1 coaching for 4 first-year MBAs targeting PM roles." },
  { org: "Amex Women in Tech", title: "Ally lead (2022-23)",   desc: "Co-organized the NYC panel series; 3 internal hiring pipelines stood up." },
];

const skills = {
  "Product": [
    "PRDs", "Roadmaps", "Discovery", "A/B experimentation", "Pricing", "GTM", "Customer interviews", "PMF signals",
  ],
  "AI / ML": [
    "LLM evals", "RAG", "GraphRAG", "Prompt eng", "Agents", "Vector DBs", "Fine-tuning (light)", "OpenAI · Gemini · Anthropic APIs",
  ],
  "Engineering": [
    "Python", "TypeScript", "Java", "SQL", "React", "Node", "FastAPI", "Airflow", "Kafka", "Docker",
  ],
  "Cloud / Data": [
    "AWS (EC2, Lambda, S3, RDS, Kinesis)", "Snowflake", "dbt", "Redshift", "Neo4j", "Postgres",
  ],
  "Signals": [
    "Mixpanel", "Amplitude", "Looker", "Tableau", "Statsig",
  ],
};

/* Make everything available globally for other <script type="text/babel"> files */
Object.assign(window, {
  personal, taglineOptions, marqueeItems, numbers,
  projects, experiences, education, leadership, skills,
});

/* Sparsh's portfolio data. All globals consumed by sections.jsx, projects.jsx, app.jsx. */

/* eslint-disable no-unused-vars */

const personal = {
  name: "Sparsh Garg",
  email: "sparshgarg98@gmail.com",
  linkedin: "https://www.linkedin.com/in/sparshgarg98/",
  github: "https://github.com/sparshgarg",
};

const taglineOptions = [
  { id: "select", prefix: "From", scribble: "SELECT *", suffix: "to shipped." },
  { id: "apis", prefix: "APIs,", scribble: "LLMs,", suffix: "and the occasional PRD." },
  { id: "experiments", prefix: "I ship", scribble: "experiments,", suffix: "not slide decks." },
  { id: "building", prefix: "Building", scribble: "AI", suffix: "products that don't end up as demos." },
  { id: "zero", prefix: "Zero-to-one, or", scribble: "one-to-many —", suffix: "either way, shipped." },
];

const marqueeItems = [
  { label: "HTML", logo: "public/tool-logos/html5.svg" },
  { label: "JavaScript", logo: "public/tool-logos/javascript.svg" },
  { label: "SQL", monogram: "SQL" },
  { label: "Tableau", logo: "public/tool-logos/tableau.svg" },
  { label: "Power BI", logo: "public/tool-logos/powerbi.svg" },
  { label: "MS Office", logo: "public/tool-logos/microsoft365.svg" },
  { label: "Claude", logo: "public/tool-logos/claude.svg" },
  { label: "n8n", logo: "public/tool-logos/n8n.svg" }
];

const projectsSection = {
  label: "// 01 — selected work",
  title: "Things I've actually shipped.",
  subtitle: "AI copilots, LLM pipelines, marketing engines. Not slide decks.",
  countSuffix: "projects",
};

const projects = [
  {
    key: "competitiveos",
    name: "CompetitiveOS",
    category: "AI · COMPETITIVE INTEL",
    tagline: "Competitive intelligence as a graph problem, not a search problem.",
    desc: "GraphRAG-powered CI platform. Signals connect to competitors, capabilities, and strategic initiatives. Risk scores propagate automatically. Outputs CSO-level recommendations with full evidence chains.",
    tags: ["GraphRAG", "FastAPI", "React", "NetworkX", "Claude API"],
    status: "live",
    visual: "force_graph",
    size: "featured",
    hue: 140,
    builtAt: null,
    link: { type: "external", url: "https://competitive-intelligence-65ds.onrender.com/" },
  },
  {
    key: "productguru",
    name: "ProductGuru",
    category: "AI · PM ASSISTANT",
    tagline: "A Gemini-powered copilot that grades PM answers like a hiring manager.",
    desc: "Built for the Foster MBA cohort. Drafts PRDs, runs strategy walk-throughs, and scores interview answers against a structured rubric with JSON-validated output.",
    tags: ["Google Gemini", "React", "TypeScript", "Vite"],
    status: "live",
    visual: "chat_mockup",
    size: "",
    hue: 260,
    builtAt: null,
    link: { type: "external", url: "https://sparshgarg.github.io/productguru/" },
  },
  {
    key: "campaignspark",
    name: "CampaignSpark",
    category: "AI · MARKETING",
    tagline: "Turn one merchant brief into ten on-brand campaigns in seconds.",
    desc: "AI campaign generator for SMB marketers. Input a goal and audience, get headlines, copy variants, and channel-specific creative ready to test.",
    tags: ["LLM", "React", "Prompt Engineering", "Lovable"],
    status: "live",
    visual: "input_to_outputs",
    size: "",
    hue: 30,
    builtAt: "lovable",
    link: { type: "external", url: "https://campaign-spark-ai-95.lovable.app/" },
  },
  {
    key: "bi_lite",
    name: "ML-Powered Email Personalization Engine",
    category: "AMEX · MARKETING ENGINE",
    tagline: "Personalized merchant marketing at half a million SMB scale.",
    desc: "Deterministic, rules-based content engine that personalized merchant marketing emails by industry, geography, and engagement state. Picked deterministic over generative on purpose: accuracy and auditability mattered more than novelty.",
    tags: ["Hadoop", "Hive SQL", "PySpark", "Rules engine"],
    status: "shipped",
    visual: "pipeline_diagram",
    size: "",
    hue: 200,
    builtAt: "amex",
    link: { type: "modal" },
    modal: {
      headline: "ML-Powered Email Personalization Engine",
      context: "American Express · Global Merchant Services · Assistant Product Manager",
      flowchart: {
        nodes: [
          { label: "Merchant data", sub: "industry · geo · state" },
          { label: "Segmentation", sub: "decliner · inactive · healthy" },
          { label: "Rules engine", sub: "pick content module" },
          { label: "Personalized email", sub: "auditable · at scale" },
        ],
      },
      problem: "Generic mass-mailers to small business merchants were losing engagement. Open rates flat, activation declining. Marketing wanted to personalize at scale without a generative AI black box they could not audit.",
      approach: [
        "Segmented merchants by urgency state: decliners, trending inactive, healthy.",
        "Built attribute-based peer benchmarks by industry and geography. No clustering, fully explainable.",
        "Designed dynamic content modules and a rules-based selection algorithm to pick the right insight for each merchant.",
        "Evaluated Jasper.ai and Writer.com for generative copy. Rejected both: inaccurate, non-deterministic, hard to audit.",
        "Built the pipeline on Hadoop, Hive, and PySpark. Worked with design vendors on visual modules.",
      ],
      results: [
        "30,000 merchant pilot with 10% holdout",
        "+8pp open rate, +2pp CTR, +15% activation lift",
        "~$800K incremental quarterly revenue",
        "Scaled to 500,000+ merchants across 22 markets",
      ],
      stack: ["Hadoop", "Hive SQL", "PySpark", "Rules engine"],
    },
  },
  {
    key: "merchant_triggers",
    name: "Anomaly Detection for Merchant Engagement",
    category: "AMEX · ANOMALY DETECTION",
    tagline: "Catch erratic merchant behavior before the client manager hears about it.",
    desc: "Anomaly detection service that flagged unusual transaction patterns weekly and pushed visual alerts to client managers. Built so the bank could engage proactively instead of waiting for complaints.",
    tags: ["Hadoop", "Hive", "PySpark", "z-score", "time-series"],
    status: "shipped",
    visual: "anomaly_chart",
    size: "",
    hue: 340,
    builtAt: "amex",
    link: { type: "modal" },
    modal: {
      headline: "Anomaly Detection for Merchant Engagement",
      context: "American Express · Global Merchant Services",
      flowchart: {
        nodes: [
          { label: "CM uploads merchant IDs", sub: "weekly cadence" },
          { label: "Hive SQL on Hadoop", sub: "pulls txn history" },
          { label: "PySpark detection", sub: "z-score · time-series" },
          { label: "Charts + email alert", sub: "per client manager" },
        ],
      },
      problem: "Client managers found out about merchant issues after merchants complained. By then the relationship was already damaged. They needed early warning on transaction anomalies across thousands of accounts.",
      approach: [
        "Gathered exact requirements from client managers: weekly cadence, key metrics, visual format.",
        "Built a web tool where client managers upload the merchant IDs they cover.",
        "Backend ran pre-written Hive SQL against Hadoop, then PySpark applied z-score and time-series anomaly detection.",
        "Anomalies got converted to charts and delivered via templated email per client manager.",
      ],
      results: [
        "Proactive merchant engagement, reduced attrition risk",
        "Caught revenue leakage before it compounded",
        "High client manager adoption and satisfaction",
      ],
      stack: ["Hadoop", "Hive", "PySpark", "z-score", "time-series"],
    },
  },
  {
    key: "high_touch",
    name: "Global Marketing Measurement Platform",
    category: "AMEX · MEASUREMENT PLATFORM",
    tagline: "One measurement framework. 22 markets. $1M in killed campaigns.",
    desc: "Centralized marketing performance platform that replaced fragmented Excel workflows across 22 international markets. Standardized A/B testing and benchmarking surfaced wasteful spend the regions could not see on their own.",
    tags: ["Web validation tool", "Tableau", "Standardized templates"],
    status: "shipped",
    visual: "world_funnel",
    size: "",
    hue: 180,
    builtAt: "amex",
    link: { type: "modal" },
    modal: {
      headline: "Global Marketing Measurement Platform",
      context: "American Express · 22 international markets · SVP sponsorship",
      flowchart: {
        nodes: [
          { label: "22 markets", sub: "raw campaign inputs" },
          { label: "Standardized template", sub: "respects regional nuance" },
          { label: "Web validation tool", sub: "auto-catches errors" },
          { label: "Tableau dashboard", sub: "A/B + benchmarks" },
          { label: "Kill list", sub: "$1M/yr wasteful spend" },
        ],
      },
      problem: "Every regional marketing team measured campaigns differently. ROI was not comparable across markets. Excel sprawl meant validation errors and missed deadlines. Wasteful campaigns ran for quarters before anyone noticed.",
      approach: [
        "Interviewed all 22 international marketing teams to map metrics, processes, and nuances.",
        "Designed a standardized input template that respected regional differences.",
        "Built a web-based data validation layer to auto-catch formatting errors before submission.",
        "Secured SVP sponsorship and ran phased change management to drive adoption.",
        "Routed validated inputs into a Tableau dashboard for centralized A/B testing and benchmarking.",
      ],
      results: [
        "Surfaced ~$1M/year in wasteful campaign spend (e.g. UK Calls Campaign)",
        "Enabled true cross-market ROI benchmarking for the first time",
        "Became the global framework for marketing measurement",
      ],
      stack: ["Web validation tool", "Tableau", "Standardized templates"],
    },
  },
  {
    key: "industry_trends",
    name: "Automated Pitch Deck Generator",
    category: "AMEX · DECK AUTOMATION",
    tagline: "8,000 analyst hours back. Python plus a web dashboard.",
    desc: "Pitch deck automation tool that pulled multi-source data, cleaned it, and generated client-ready PowerPoints from parameter inputs. Killed weeks of manual deck assembly for client managers across the firm.",
    tags: ["Python", "Web dashboard", "PowerPoint automation"],
    status: "shipped",
    visual: "input_to_deck",
    size: "",
    hue: 100,
    builtAt: "amex",
    link: { type: "modal" },
    modal: {
      headline: "Automated Pitch Deck Generator",
      context: "American Express · Global Merchant Services",
      flowchart: {
        nodes: [
          { label: "Parameters", sub: "industry · region · period" },
          { label: "Python pipeline", sub: "multi-source pull + clean" },
          { label: "Template engine", sub: "PowerPoint render" },
          { label: "Client deck", sub: "minutes, not weeks" },
        ],
      },
      problem: "Client managers spent weeks assembling pitch decks for every client meeting. Analyst teams were buried in repetitive deck work instead of strategy. Same charts, different merchant IDs, over and over.",
      approach: [
        "Shadowed client managers to map the actual deck-building workflow end to end.",
        "Partnered with engineers to design a Python pipeline that pulled from internal data sources, cleaned, and templated.",
        "Built a web dashboard where client managers entered parameters and got a finished deck in minutes.",
        "Owned the full development lifecycle: requirements, user stories, QA, rollout.",
      ],
      results: [
        "8,000 analyst hours saved annually",
        "Analyst teams redirected to strategic work",
        "Reduced workload of 12+ international analytics teams by 98%",
      ],
      stack: ["Python", "Web dashboard", "PowerPoint automation"],
    },
  },
];

const experiences = [
  {
    company: "University of Washington · Foster",
    role: "MBA Candidate, Management Science (STEM)",
    team: "VP, AI Programming · Foster PM Club",
    period: "2024 — 2026",
    logo: "uw",
    tags: ["MBA", "STEM", "AI/PM", "Strategy", "GPA 3.9"],
  },
  {
    company: "Amazon Web Services",
    role: "Sr. Product Manager — Technical, External Services (Intern)",
    team: "EC2 · VPC Team",
    period: "Summer 2025",
    logo: "aws",
    tags: ["PM", "Networking", "Cloud", "AWS", "EC2", "PR/FAQ"],
  },
  {
    company: "American Express",
    role: "Senior Associate, Digital Product Management",
    team: "Global Merchant Services",
    period: "2020 — 2024",
    logo: "amex",
    tags: ["Payments", "Data Visualization", "Marketing", "Big Data Analytics", "Automation Pipelines", "Risk Management"],
  },
  {
    company: "Punjab Engineering College",
    role: "B.Tech, Computer Science & Engineering",
    team: "Chandigarh, India",
    period: "2016 — 2020",
    logo: "pec",
    tags: ["Computer Science", "Algorithms", "Systems", "Web Dev"],
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
  { org: "Foster PM Club", title: "VP, AI programming", desc: "Ran the 2025 AI-PM speaker series. 6 sessions, 200+ attendees." },
  { org: "Foster Tech Club", title: "Mentor", desc: "1:1 coaching for 4 first-year MBAs targeting PM roles." },
  { org: "Amex Women in Tech", title: "Ally lead (2022-23)", desc: "Co-organized the NYC panel series; 3 internal hiring pipelines stood up." },
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
  personal, taglineOptions, marqueeItems,
  projectsSection, projects, experiences, education, leadership, skills,
});

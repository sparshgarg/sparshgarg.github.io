import { Question } from "@/lib/types";

const byCategory: Record<Question["category"], string[]> = {
  "Product Design": [
    "Design a product to help remote teams build trust faster.",
    "How would you design onboarding for first-time fintech users?",
    "Design a feature for students to stay accountable in online courses.",
    "Design an MVP for creators to manage brand deals.",
    "How would you redesign a food delivery app for elderly users?",
    "Design a travel planning experience for group trips.",
    "Build a product to reduce no-shows for doctor appointments.",
    "Design a social feature for a coding learning app."
  ],
  "Product Improvement": [
    "Instagram Stories usage dropped 20%. What would you do?",
    "Uber ratings are declining in one city. How would you improve quality?",
    "Spotify free users are churning quickly. Diagnose and improve.",
    "Gmail mobile retention has plateaued. What's your plan?",
    "YouTube comments feel toxic. Improve the conversation quality.",
    "Notion users complain that search is weak. How do you improve it?",
    "Amazon cart abandonment increased last quarter. What next?",
    "Swiggy complaints around late delivery are rising. Improve the experience."
  ],
  "Product Strategy": [
    "Should Slack launch a lightweight CRM product?",
    "How should Netflix approach live sports over the next 3 years?",
    "What is Airbnb's strategy in a recession environment?",
    "Should Duolingo expand into career upskilling?",
    "How would you defend Google Maps against specialized mobility apps?",
    "Should Apple open iMessage to Android globally?",
    "Choose a growth strategy for LinkedIn in emerging markets.",
    "What should Figma's AI strategy be over 24 months?"
  ],
  "Prioritization & Tradeoffs": [
    "Given 10 requests from sales, support, and growth, how do you prioritize?",
    "You can either improve activation or reduce churn this quarter. Decide.",
    "Would you optimize latency or launch a major feature first?",
    "How would you prioritize roadmap items under a 30% budget cut?",
    "You have engineering capacity for only one platform: iOS or Android. Pick.",
    "Would you build internal tooling or customer-facing features first?",
    "How do you prioritize bugs vs new feature demand?",
    "You can only run 2 experiments this month out of 12 ideas. Which and why?"
  ],
  "Metrics / Execution": [
    "What north-star metric would you set for a habit tracking app?",
    "Define success metrics for a new checkout redesign.",
    "How would you evaluate if a referral feature is working?",
    "What metrics would you use for a PM interview prep app?",
    "A/B test wins click-through but hurts retention. How do you decide?",
    "How would you set guardrail metrics for in-app ads?",
    "What dashboard would you build for marketplace liquidity health?",
    "How do you detect and respond to metric gaming by users?"
  ],
  "Estimation / Market Sizing": [
    "Estimate annual rides on metro feeder e-bikes in Bangalore.",
    "Size the market for AI note-taking tools for students in India.",
    "Estimate daily coffee orders placed through mobile apps in the US.",
    "How many people will use airport lounge access apps monthly?",
    "Estimate revenue opportunity for premium LinkedIn for college students.",
    "Size the market for pet telehealth consultations in Europe.",
    "Estimate yearly demand for virtual mock interviews globally.",
    "How many support tickets does a 10M MAU app receive monthly?"
  ],
  "0-to-1 / Innovation": [
    "If you had to invent a new product for aging populations, what would you build?",
    "Create a 0-to-1 product in climate-tech for urban households.",
    "Invent a productivity product for deskless workers.",
    "What new product would you build using only smartphone sensors?",
    "Design a startup idea at the intersection of education and gaming.",
    "Pitch a new product for reducing food waste at home.",
    "Build a product for cross-border freelancer trust and reputation.",
    "Create a 0-to-1 product for safer teen social networking."
  ],
  "AI Product Sense": [
    "Design an AI copilot for product managers writing PRDs.",
    "How would you evaluate hallucination risk in an AI tutor app?",
    "Should an AI assistant proactively take actions or ask permission first?",
    "Design AI features for customer support without hurting trust.",
    "How would you decide where to place human-in-the-loop in AI workflows?",
    "What metrics define quality in an AI meeting summarizer?",
    "How would you launch AI recommendations in a hiring platform responsibly?",
    "Design an AI feature for e-commerce search that improves discovery."
  ]
};

const frameworks = ["CIRCLES", "AARM", "RICE", "HEART + Guardrails", "North Star + Funnel"];
const difficulties: Question["difficulty"][] = ["beginner", "intermediate", "advanced"];

export const questionBank: Question[] = Object.entries(byCategory).flatMap(([category, prompts], categoryIndex) =>
  prompts.map((text, idx) => ({
    id: `q-${categoryIndex + 1}-${idx + 1}`,
    text,
    category: category as Question["category"],
    difficulty: difficulties[idx % difficulties.length],
    tags: ["pm-interview", "structured-thinking", category.toLowerCase()],
    suggestedFramework: frameworks[(categoryIndex + idx) % frameworks.length],
    sourceType: "public-inspired"
  }))
);

export function pickQuestion(category?: string, difficulty?: string) {
  const filtered = questionBank.filter(
    (q) => (!category || q.category === category) && (!difficulty || q.difficulty === difficulty)
  );
  const pool = filtered.length ? filtered : questionBank;
  return pool[Math.floor(Math.random() * pool.length)];
}

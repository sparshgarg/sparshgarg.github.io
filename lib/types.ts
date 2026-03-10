export type Category =
  | "Product Design"
  | "Product Improvement"
  | "Product Strategy"
  | "Prioritization & Tradeoffs"
  | "Metrics / Execution"
  | "Estimation / Market Sizing"
  | "0-to-1 / Innovation"
  | "AI Product Sense";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Question = {
  id: string;
  text: string;
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  suggestedFramework: string;
  sourceType: "public-inspired";
};

export type Evaluation = {
  overallScore: number;
  overallLevel: "Beginner" | "Developing" | "Professional" | "Strong" | "World-Class";
  dimensionScores: Record<string, number>;
  summary: string;
  strengths: string[];
  improvements: string[];
  missedAngles: string[];
  followUpQuestions: string[];
  coachingTips: string[];
  rewriteAdvice: string;
  exemplars: {
    beginner: string;
    professional: string;
    worldClass: string;
  };
};

export type SessionAttempt = {
  id: string;
  questionId: string;
  questionText: string;
  category: Category;
  difficulty: Difficulty;
  answerText: string;
  createdAt: string;
  overallScore: number;
  overallLevel: Evaluation["overallLevel"];
  dimensionScores: Record<string, number>;
};

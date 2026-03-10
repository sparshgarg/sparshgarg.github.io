import { z } from "zod";

export const evaluationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  overallLevel: z.enum(["Beginner", "Developing", "Professional", "Strong", "World-Class"]),
  dimensionScores: z.object({
    structureFraming: z.number().min(1).max(5),
    userUnderstandingSegmentation: z.number().min(1).max(5),
    businessObjectiveProductThinking: z.number().min(1).max(5),
    prioritizationTradeoffs: z.number().min(1).max(5),
    solutionQuality: z.number().min(1).max(5),
    metricsValidation: z.number().min(1).max(5),
    communication: z.number().min(1).max(5)
  }),
  summary: z.string(),
  strengths: z.array(z.string()).min(2),
  improvements: z.array(z.string()).min(2),
  missedAngles: z.array(z.string()).min(2),
  followUpQuestions: z.array(z.string()).min(2),
  coachingTips: z.array(z.string()).min(2),
  rewriteAdvice: z.string(),
  exemplars: z.object({
    beginner: z.string(),
    professional: z.string(),
    worldClass: z.string()
  })
});

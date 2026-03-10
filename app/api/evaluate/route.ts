import { NextResponse } from "next/server";
import OpenAI from "openai";
import { evaluationSchema } from "@/lib/schema";
import { evaluatorSystemPrompt } from "@/lib/prompts";
import { pickQuestion } from "@/data/questions";
import { saveAttempt } from "@/lib/storage";

export async function POST(req: Request) {
  const body = await req.json();
  const { answerText, question } = body as { answerText: string; question: ReturnType<typeof pickQuestion> };

  if (!answerText?.trim()) {
    return NextResponse.json({ error: "Answer text is required" }, { status: 400 });
  }

  let parsed;
  if (process.env.OPENAI_API_KEY) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: evaluatorSystemPrompt },
        {
          role: "user",
          content: `Question: ${question.text}\nAnswer: ${answerText}\nReturn JSON with exact schema and include exemplars.`
        }
      ],
      text: { format: { type: "json_object" } }
    });
    const text = response.output_text;
    parsed = evaluationSchema.parse(JSON.parse(text));
  } else {
    parsed = evaluationSchema.parse({
      overallScore: 72,
      overallLevel: "Strong",
      dimensionScores: {
        structureFraming: 4,
        userUnderstandingSegmentation: 4,
        businessObjectiveProductThinking: 4,
        prioritizationTradeoffs: 3,
        solutionQuality: 4,
        metricsValidation: 3,
        communication: 4
      },
      summary: "Well-structured with clear product instincts; add sharper tradeoff and validation depth.",
      strengths: ["Clear structure and flow.", "Good user empathy and targeting."],
      improvements: ["State explicit business objective upfront.", "Prioritize fewer bets with rationale."],
      missedAngles: ["Operational constraints and rollout risk.", "Counter-metrics and failure modes."],
      followUpQuestions: ["How would this differ for SMB vs enterprise?", "What is your MVP experiment plan?"],
      coachingTips: ["Speak in hypotheses and decisions.", "Anchor every feature to user pain + KPI."],
      rewriteAdvice: "Lead with objective, segment users, rank 2 initiatives, and close with experiment metrics.",
      exemplars: {
        beginner: "I would add multiple features and track downloads.",
        professional:
          "I would define the user segment, choose one high-impact problem, propose MVP scope, and track activation + retention.",
        worldClass:
          "I would align on business objective, choose target segment, map jobs-to-be-done, prioritize by impact/effort, launch a narrow MVP, and run learning loops with guardrails."
      }
    });
  }

  await saveAttempt({
    id: crypto.randomUUID(),
    questionId: question.id,
    questionText: question.text,
    category: question.category,
    difficulty: question.difficulty,
    answerText,
    createdAt: new Date().toISOString(),
    overallScore: parsed.overallScore,
    overallLevel: parsed.overallLevel,
    dimensionScores: parsed.dimensionScores
  });

  return NextResponse.json(parsed);
}

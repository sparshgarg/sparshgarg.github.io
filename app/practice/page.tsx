"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, RefreshCw } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { pickQuestion, questionBank } from "@/data/questions";
import { Evaluation } from "@/lib/types";

export default function PracticePage() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [question, setQuestion] = useState(() => pickQuestion());
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const categories = useMemo(() => Array.from(new Set(questionBank.map((q) => q.category))), []);

  const nextQuestion = () => {
    setQuestion(pickQuestion(category || undefined, difficulty || undefined));
    setAnswer("");
    setEvaluation(null);
  };

  const submit = async () => {
    setLoading(true);
    const res = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answerText: answer, question })
    });
    const data = await res.json();
    setEvaluation(data);
    setLoading(false);
  };

  const toggleRecording = async () => {
    if (recording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = async () => {
      const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
      const form = new FormData();
      form.append("file", audioBlob, "recording.webm");
      const res = await fetch("/api/transcribe", { method: "POST", body: form });
      const data = await res.json();
      setAnswer((prev) => (prev ? `${prev}\n${data.transcript}` : data.transcript));
    };
    recorder.start();
    setRecording(true);
  };

  const radarData = evaluation
    ? Object.entries(evaluation.dimensionScores).map(([k, v]) => ({ dimension: k.replace(/[A-Z]/g, " $&"), score: v }))
    : [];

  return (
    <main className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="card p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md bg-slate-900 px-3 py-2">
            <option value="">All categories</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="rounded-md bg-slate-900 px-3 py-2">
            <option value="">Any difficulty</option>
            <option>beginner</option><option>intermediate</option><option>advanced</option>
          </select>
          <button onClick={nextQuestion} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2"><RefreshCw size={16} /> Another Question</button>
        </div>
        <h1 className="text-xl font-semibold">{question.text}</h1>
        <p className="mt-2 text-sm text-slate-300">{question.category} · {question.difficulty} · Framework: {question.suggestedFramework}</p>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="mt-4 h-56 w-full rounded-xl border border-border bg-slate-950/70 p-4"
          placeholder="Type your answer or use the microphone..."
        />
        <div className="mt-2 text-xs text-slate-400">{answer.length} characters</div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={toggleRecording} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2">
            <Mic size={16} /> {recording ? "Stop recording" : "Record answer"}
          </button>
          <button disabled={!answer || loading} onClick={submit} className="rounded-md bg-indigo-500 px-4 py-2 font-medium disabled:opacity-60">
            {loading ? "Evaluating..." : "Submit for evaluation"}
          </button>
        </div>
      </section>

      <motion.section layout className="card p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {!evaluation ? (
          <p className="text-slate-300">Your evaluation will appear here with scores, strengths, missed angles, and exemplars.</p>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-300">Overall score</p>
              <p className="text-4xl font-bold text-indigo-300">{evaluation.overallScore}</p>
              <p className="text-sm">{evaluation.overallLevel}</p>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
                  <Radar name="Score" dataKey="score" stroke="#818cf8" fill="#818cf8" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div><h3 className="font-semibold">Strengths</h3><ul className="list-disc pl-5 text-sm">{evaluation.strengths.map((s) => <li key={s}>{s}</li>)}</ul></div>
            <div><h3 className="font-semibold">Improvements</h3><ul className="list-disc pl-5 text-sm">{evaluation.improvements.map((s) => <li key={s}>{s}</li>)}</ul></div>
            <div><h3 className="font-semibold">World-class exemplar</h3><p className="text-sm text-slate-200">{evaluation.exemplars.worldClass}</p></div>
          </div>
        )}
      </motion.section>
    </main>
  );
}

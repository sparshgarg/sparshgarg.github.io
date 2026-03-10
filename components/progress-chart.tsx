"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SessionAttempt } from "@/lib/types";

export function ProgressChart({ attempts }: { attempts: SessionAttempt[] }) {
  const data = [...attempts].reverse().map((a, i) => ({ idx: i + 1, score: a.overallScore }));
  if (!data.length) return <p className="text-slate-400">No chart data yet.</p>;

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="idx" stroke="#94a3b8" />
          <YAxis domain={[0, 100]} stroke="#94a3b8" />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#818cf8" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

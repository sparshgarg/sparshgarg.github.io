import Link from "next/link";
import { Sparkles, BarChart3, BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <main className="space-y-8 pb-10">
      <section className="card overflow-hidden p-8 shadow-glow">
        <p className="mb-2 text-indigo-300">Train like a PM. Think like a product leader.</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Practice PM interviews with AI that actually coaches.</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          ProductGuru gives structured feedback, scoring dimensions, and exemplar responses from beginner to world-class.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/practice" className="rounded-lg bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-400">
            Start Practicing
          </Link>
          <Link href="/practice?demo=1" className="rounded-lg border border-border px-4 py-2 hover:bg-white/5">
            View Demo Session
          </Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[{ icon: BrainCircuit, t: "Why ProductGuru", d: "Tough-but-fair interviewer logic with practical coaching." }, { icon: BarChart3, t: "Scoring", d: "7-dimension rubric + overall level from Beginner to World-Class." }, { icon: Sparkles, t: "Categories", d: "64 curated questions across design, strategy, metrics, AI, and more." }].map((item) => (
          <article key={item.t} className="card p-5">
            <item.icon className="mb-2 h-5 w-5 text-indigo-300" />
            <h2 className="font-semibold">{item.t}</h2>
            <p className="mt-1 text-sm text-slate-300">{item.d}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

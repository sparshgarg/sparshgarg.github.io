import { getAttempts } from "@/lib/storage";
import { ProgressChart } from "@/components/progress-chart";

export default async function HistoryPage() {
  const attempts = await getAttempts();
  return (
    <main className="space-y-6">
      <section className="card p-6">
        <h1 className="text-2xl font-semibold">Progress History</h1>
        <p className="mt-1 text-slate-300">Track score trends and weak spots over time.</p>
      </section>
      <section className="card p-6">
        <ProgressChart attempts={attempts} />
      </section>
      <section className="card p-6">
        <h2 className="mb-3 text-lg font-semibold">Recent attempts</h2>
        <div className="space-y-2 text-sm">
          {attempts.length === 0 ? (
            <p className="text-slate-400">No attempts yet. Complete a practice run first.</p>
          ) : (
            attempts.slice(0, 20).map((a) => (
              <div key={a.id} className="rounded-lg border border-border p-3">
                <p className="font-medium">{a.questionText}</p>
                <p className="text-slate-300">{a.category} · {a.difficulty} · Score {a.overallScore} ({a.overallLevel})</p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

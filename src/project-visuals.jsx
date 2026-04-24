/* global React */
const { useEffect, useState } = React;

// ── ProductGuru interviewer visual ────────────────────────────────────────
// Simulates the PM-interview loop: AI asks a question → candidate answers →
// AI evaluates the answer with a score + rubric bars, then resets.
function ChatVisual() {
  const TOTAL = 5;
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % TOTAL), 1800);
    return () => clearInterval(t);
  }, []);

  const rubric = [
    { label: "Structure",     score: 92 },
    { label: "Metric choice", score: 84 },
    { label: "Trade-offs",    score: 78 },
  ];

  return (
    <div className="pv">
      <div className="pv-grid" />
      <div className="pv-chat pv-interview">
        {step >= 0 && (
          <div className="pv-bubble interviewer" style={{ animationDelay: "0s" }}>
            <div className="pv-badge">PM Interviewer · Q2 of 5</div>
            <div>How would you measure success for Spotify's Discover Weekly?</div>
          </div>
        )}
        {step >= 1 && (
          <div className="pv-bubble me" style={{ animationDelay: "0.1s" }}>
            Track weekly save-rate + 4-week retention of saved tracks, segmented by new vs. dormant listeners.
          </div>
        )}
        {step === 2 && (
          <div className="pv-bubble typing"><span/><span/><span/></div>
        )}
        {step >= 3 && (
          <div className="pv-eval" style={{ animationDelay: "0.2s" }}>
            <div className="pv-eval-top">
              <span className="pv-eval-label">AI evaluation</span>
              <span className="pv-eval-score">
                8.5<span className="pv-eval-max">/10</span>
              </span>
            </div>
            <div className="pv-eval-rows">
              {rubric.map((r, i) => (
                <div className="pv-eval-row" key={r.label}>
                  <span className="pv-eval-name">{r.label}</span>
                  <div className="pv-eval-bar">
                    <i style={{ width: `${r.score}%`, animationDelay: `${0.1 + i * 0.08}s` }} />
                  </div>
                  <span className="pv-eval-num">{(r.score / 10).toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Pipeline visual ──────────────────────────────────────────────────────
function PipelineVisual() {
  return (
    <div className="pv">
      <div className="pv-grid" />
      <div className="pv-pipeline-count"><strong>1,247</strong> insights this week</div>
      <div className="pv-pipeline">
        <div className="pv-pipeline-wire" />
        <div className="pv-pipeline-flow" />
        <div className="pv-pipeline-flow" style={{ animationDelay: "1s" }} />
        <div className="pv-pipeline-flow" style={{ animationDelay: "2s" }} />
        <div className="pv-pipeline-nodes">
          <div className="pv-pipeline-node"><span className="pv-pipeline-dot"/>SMB data</div>
          <div className="pv-pipeline-node" style={{borderColor:"rgba(124,124,255,0.4)"}}>LLM · benchmark</div>
          <div className="pv-pipeline-node"><span className="pv-pipeline-dot" style={{background:"#C5F24A"}}/>insights.json</div>
        </div>
      </div>
    </div>
  );
}

// ── GraphRAG visual ──────────────────────────────────────────────────────
function GraphVisual() {
  // static nodes with animated dashed edges + occasional "hot" highlight
  const nodes = [
    {id: "c", x: 160, y: 130, central: true, label: "GraphRAG" },
    {id: "n1", x: 60, y: 60, label: "Entity" },
    {id: "n2", x: 260, y: 60, label: "Claim" },
    {id: "n3", x: 40, y: 170, label: "Source" },
    {id: "n4", x: 280, y: 200, label: "Query" },
    {id: "n5", x: 150, y: 40, label: "Doc" },
    {id: "n6", x: 170, y: 220, label: "Vec" },
  ];
  const edges = [
    ["c","n1"], ["c","n2"], ["c","n3"], ["c","n4"], ["c","n5"], ["c","n6"],
    ["n1","n5"], ["n2","n4"], ["n3","n6"],
  ];
  const [hot, setHot] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setHot(h => (h + 1) % edges.length), 900);
    return () => clearInterval(t);
  }, []);
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  return (
    <div className="pv-graph">
      <div className="pv-grid" style={{position:"absolute", inset:0}} />
      <svg viewBox="0 0 320 260" preserveAspectRatio="xMidYMid meet">
        {edges.map(([a,b], i) => (
          <line key={i} className={`edge ${i === hot ? "hot" : ""}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />
        ))}
        {nodes.map((n, i) => {
          const touched = edges[hot] && (edges[hot].includes(n.id) && !n.central);
          return (
            <g key={n.id}>
              <circle className={`node ${n.central ? "central" : ""} ${touched ? "hot" : ""}`}
                      cx={n.x} cy={n.y} r={n.central ? 16 : 8} />
              <text className="node-label" x={n.x} y={n.y + (n.central ? 30 : 22)} textAnchor="middle">{n.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── N8N workflow visual ──────────────────────────────────────────────────
function N8nVisual() {
  return (
    <div className="pv-n8n">
      <div className="pv-grid" style={{position:"absolute", inset:-20}} />
      <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="2"/></filter>
        </defs>
        {/* wires */}
        <path className="wire" d="M78 60 C 120 60, 120 110, 158 110" />
        <path className="wire" d="M78 160 C 120 160, 120 110, 158 110" />
        <path className="wire" d="M202 110 C 240 110, 240 60, 278 60" />
        <path className="wire" d="M202 110 C 240 110, 240 160, 278 160" />

        {/* nodes */}
        <g>
          <rect className="n-box" x="12" y="40" width="66" height="40" rx="8" />
          <text className="n-label" x="45" y="58" textAnchor="middle">Webhook</text>
          <text className="n-sub" x="45" y="70" textAnchor="middle">trigger</text>
        </g>
        <g>
          <rect className="n-box" x="12" y="140" width="66" height="40" rx="8" />
          <text className="n-label" x="45" y="158" textAnchor="middle">Sheet</text>
          <text className="n-sub" x="45" y="170" textAnchor="middle">read</text>
        </g>
        <g>
          <rect className="n-box active" x="158" y="90" width="44" height="40" rx="8" />
          <text className="n-label" x="180" y="108" textAnchor="middle">LLM</text>
          <text className="n-sub" x="180" y="120" textAnchor="middle">enrich</text>
        </g>
        <g>
          <rect className="n-box" x="278" y="40" width="30" height="40" rx="8" />
          <text className="n-sub" x="293" y="64" textAnchor="middle">Slack</text>
        </g>
        <g>
          <rect className="n-box" x="278" y="140" width="30" height="40" rx="8" />
          <text className="n-sub" x="293" y="164" textAnchor="middle">Notion</text>
        </g>
      </svg>
    </div>
  );
}

// ── A/B platform visual ──────────────────────────────────────────────────
function ABVisual() {
  // two animated growth lines
  return (
    <div className="pv">
      <div className="pv-grid" />
      <svg viewBox="0 0 320 220" preserveAspectRatio="none" style={{position:"absolute", inset:0, width:"100%", height:"100%"}}>
        {/* baseline grid ticks */}
        {[0,1,2,3,4].map(i => (
          <line key={i} x1="0" x2="320" y1={40 + i*40} y2={40 + i*40} stroke="rgba(255,255,255,0.06)" />
        ))}
        {/* variant A */}
        <path d="M 20 170 Q 80 165 120 150 T 200 120 T 300 100" stroke="#8A8690" strokeWidth="1.6" fill="none" strokeDasharray="3 4"/>
        {/* variant B — winning */}
        <path d="M 20 170 Q 80 160 120 140 T 200 90 T 300 50" stroke="#C5F24A" strokeWidth="2.2" fill="none">
          <animate attributeName="stroke-dasharray" from="0 600" to="600 0" dur="3s" repeatCount="indefinite"/>
        </path>
        <circle cx="300" cy="50" r="5" fill="#C5F24A"><animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite"/></circle>

        <text x="18" y="28" fontFamily="JetBrains Mono" fontSize="10" fill="#8A8690">VARIANT A</text>
        <text x="18" y="44" fontFamily="JetBrains Mono" fontSize="10" fill="#C5F24A">VARIANT B · +30%</text>
      </svg>
    </div>
  );
}

function ProjectVisual({kind}) {
  if (kind === "chat") return <ChatVisual />;
  if (kind === "pipeline") return <PipelineVisual />;
  if (kind === "graph") return <GraphVisual />;
  if (kind === "n8n") return <N8nVisual />;
  if (kind === "ab") return <ABVisual />;
  return null;
}

window.ProjectVisual = ProjectVisual;

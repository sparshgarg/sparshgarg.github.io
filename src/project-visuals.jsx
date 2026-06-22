/* global React */
const { useEffect, useState } = React;

// ── ChatVisual — ProductGuru (chat_mockup) ───────────────────────────────
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

// ── ForceGraphVisual — CompetitiveOS (force_graph) ───────────────────────
// Semantic CI labels with slow drift + a hot lime node that pulses through.
function ForceGraphVisual() {
  const baseNodes = [
    { id: "c",  x: 200, y: 150, central: true, label: "CompetitiveOS" },
    { id: "n1", x:  70, y:  70, label: "Competitor" },
    { id: "n2", x: 330, y:  70, label: "Signal" },
    { id: "n3", x:  50, y: 200, label: "Capability" },
    { id: "n4", x: 350, y: 220, label: "Initiative" },
    { id: "n5", x: 180, y:  40, label: "Risk" },
    { id: "n6", x: 220, y: 250, label: "Evidence" },
  ];
  const edges = [
    ["c","n1"], ["c","n2"], ["c","n3"], ["c","n4"], ["c","n5"], ["c","n6"],
    ["n1","n5"], ["n2","n4"], ["n3","n6"], ["n1","n2"],
  ];
  const [hot, setHot] = useState(0);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setHot(h => (h + 1) % edges.length), 1100);
    const d = setInterval(() => setTick(v => v + 1), 60);
    return () => { clearInterval(t); clearInterval(d); };
  }, []);
  // slow physics drift — each node oscillates around its base position
  const nodes = baseNodes.map((n, i) => {
    if (n.central) return n;
    const phase = i * 0.9;
    const dx = Math.sin(tick * 0.018 + phase) * 4;
    const dy = Math.cos(tick * 0.014 + phase) * 4;
    return { ...n, x: n.x + dx, y: n.y + dy };
  });
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  return (
    <div className="pv-graph">
      <div className="pv-grid" style={{position:"absolute", inset:0}} />
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
        {edges.map(([a,b], i) => (
          <line key={i} className={`edge ${i === hot ? "hot" : ""}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />
        ))}
        {nodes.map((n) => {
          const touched = edges[hot] && (edges[hot].includes(n.id) && !n.central);
          return (
            <g key={n.id}>
              <circle className={`node ${n.central ? "central" : ""} ${touched ? "hot" : ""}`}
                      cx={n.x} cy={n.y} r={n.central ? 18 : 9} />
              <text className="node-label" x={n.x} y={n.y + (n.central ? 34 : 24)} textAnchor="middle">{n.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── InputToOutputsVisual — CampaignSpark (input_to_outputs) ──────────────
function InputToOutputsVisual() {
  const prompts = [
    {
      goal: "re-engage dormant SMBs",
      cards: [
        { subj: "We miss you, [merchant].",   prev: "Three new tools just shipped for you." },
        { subj: "Your sales playbook · v2",   prev: "Five tactics dormant SMBs are using." },
        { subj: "Pick up where you left off", prev: "One click, your draft is waiting." },
      ],
    },
    {
      goal: "launch holiday promo",
      cards: [
        { subj: "20% off through Sunday",     prev: "Your top buyers are queued and ready." },
        { subj: "Your holiday playbook",      prev: "Three campaigns ready to ship today." },
        { subj: "Limited time · members only",prev: "Activate now to unlock seasonal lift." },
      ],
    },
    {
      goal: "upsell power users",
      cards: [
        { subj: "You unlocked the next tier", prev: "Here's what's included — preview." },
        { subj: "Power-user moves of Q3",     prev: "What your peers are doing differently." },
        { subj: "Built for how you work",     prev: "A 30-day trial of the pro stack." },
      ],
    },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % prompts.length), 3200);
    return () => clearInterval(t);
  }, []);
  const p = prompts[i];
  return (
    <div className="pv">
      <div className="pv-grid" />
      <div className="pv-i2o">
        <div className="pv-i2o-input" key={`in-${i}`}>
          <div className="pv-i2o-label">goal</div>
          <div className="pv-i2o-text">{p.goal}</div>
        </div>
        <div className="pv-i2o-arrow">
          <svg viewBox="0 0 50 20" preserveAspectRatio="none">
            <path d="M 2 10 L 44 10" stroke="var(--lime)" strokeWidth="1.5" strokeDasharray="3 3"/>
            <path d="M 38 4 L 46 10 L 38 16" stroke="var(--lime)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="pv-i2o-stack">
          {p.cards.map((c, j) => (
            <div className="pv-i2o-card" key={`${i}-${j}`} style={{ "--idx": j }}>
              <div className="pv-i2o-card-subj">{c.subj}</div>
              <div className="pv-i2o-card-prev">{c.prev}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PipelineDiagramVisual — BI-Lite (pipeline_diagram) ───────────────────
// merchant attrs → segmentation (3 branches) → content selector → email
function PipelineDiagramVisual() {
  return (
    <div className="pv">
      <div className="pv-grid" />
      <svg className="pv-pipe2" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="pp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="rgba(124,124,255,0.6)"/>
          </marker>
        </defs>
        {/* wires */}
        <path d="M 78 120 L 130 120" stroke="rgba(124,124,255,0.4)" strokeWidth="1.2" markerEnd="url(#pp-arrow)"/>
        <path d="M 188 100 Q 220 100 230 60"   stroke="rgba(124,124,255,0.4)" strokeWidth="1.2" fill="none" markerEnd="url(#pp-arrow)"/>
        <path d="M 188 120 L 230 120"                stroke="rgba(124,124,255,0.4)" strokeWidth="1.2" markerEnd="url(#pp-arrow)"/>
        <path d="M 188 140 Q 220 140 230 180" stroke="rgba(124,124,255,0.4)" strokeWidth="1.2" fill="none" markerEnd="url(#pp-arrow)"/>
        <path d="M 290 60  Q 320 60 328 110"  stroke="rgba(124,124,255,0.4)" strokeWidth="1.2" fill="none"/>
        <path d="M 290 120 L 328 120"               stroke="rgba(124,124,255,0.4)" strokeWidth="1.2"/>
        <path d="M 290 180 Q 320 180 328 130" stroke="rgba(124,124,255,0.4)" strokeWidth="1.2" fill="none"/>

        {/* attributes */}
        <g>
          <rect className="pp-node" x="12"  y="100" width="66" height="40" rx="8" />
          <text className="pp-label" x="45" y="118" textAnchor="middle">attributes</text>
          <text className="pp-sub"   x="45" y="130" textAnchor="middle">industry · geo</text>
        </g>
        {/* segmentation */}
        <g>
          <rect className="pp-node" x="130" y="100" width="58" height="40" rx="8" />
          <text className="pp-label" x="159" y="118" textAnchor="middle">segment</text>
          <text className="pp-sub"   x="159" y="130" textAnchor="middle">3 states</text>
        </g>
        {/* 3 segment branches */}
        <g>
          <rect className="pp-pill decliner" x="230" y="42"  width="60" height="30" rx="8" />
          <text className="pp-pill-label"     x="260" y="61" textAnchor="middle">decliner</text>
        </g>
        <g>
          <rect className="pp-pill inactive" x="230" y="105" width="60" height="30" rx="8" />
          <text className="pp-pill-label"      x="260" y="124" textAnchor="middle">inactive</text>
        </g>
        <g>
          <rect className="pp-pill healthy" x="230" y="168" width="60" height="30" rx="8" />
          <text className="pp-pill-label"     x="260" y="187" textAnchor="middle">healthy</text>
        </g>
        {/* content selector */}
        <g>
          <rect className="pp-node active" x="328" y="100" width="60" height="40" rx="8" />
          <text className="pp-label" x="358" y="118" textAnchor="middle">content</text>
          <text className="pp-sub"   x="358" y="130" textAnchor="middle">selector</text>
        </g>
        {/* flowing merchant token */}
        <circle r="4" fill="var(--lime)" filter="url(#none)">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#pp-flowpath"/>
          </animateMotion>
        </circle>
        <path id="pp-flowpath" d="M 12 120 L 78 120 L 130 120 L 188 120 L 230 120 L 290 120 L 328 120 L 388 120" fill="none" stroke="transparent"/>
      </svg>
      {/* email mockup at the end */}
      <div className="pv-pipe2-email">
        <div className="pv-pipe2-email-row" />
        <div className="pv-pipe2-email-row short" />
        <div className="pv-pipe2-email-row" />
      </div>
      <div className="pv-pipeline-count"><strong>500K+</strong> SMBs reached</div>
    </div>
  );
}

// ── AnomalyChartVisual — Merchant Triggers (anomaly_chart) ───────────────
function AnomalyChartVisual() {
  return (
    <div className="pv">
      <div className="pv-grid" />
      <svg className="pv-anom" viewBox="0 0 400 240" preserveAspectRatio="none">
        {/* y-axis tick lines */}
        {[0,1,2,3].map(i => (
          <line key={i} x1="20" x2="380" y1={50 + i*45} y2={50 + i*45} stroke="rgba(255,255,255,0.05)"/>
        ))}
        {/* baseline + dip line */}
        <path
          d="M 20 110 Q 60 100 100 105 T 180 100 T 240 95 L 260 200 L 280 110 T 360 95"
          stroke="var(--cyan)"
          strokeWidth="1.8"
          fill="none"
          opacity="0.85"
        />
        {/* anomaly marker */}
        <circle cx="260" cy="200" r="6" fill="#FF5A6B">
          <animate attributeName="r" values="5;9;5" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="260" cy="200" r="14" fill="none" stroke="#FF5A6B" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="10;20;10" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0;0.5" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        {/* arrow to email */}
        <path d="M 268 196 Q 300 170 330 145" stroke="#FF5A6B" strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
        {/* email icon */}
        <g transform="translate(322 122)">
          <rect width="46" height="32" rx="4" fill="var(--surface)" stroke="var(--border-2)"/>
          <path d="M 2 4 L 23 18 L 44 4" stroke="var(--text-soft)" strokeWidth="1.2" fill="none"/>
        </g>
        {/* labels */}
        <text x="20"  y="34" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-soft)">TXN VOLUME · weekly</text>
        <text x="252" y="222" fontFamily="JetBrains Mono" fontSize="10" fill="#FF5A6B">anomaly</text>
        <text x="322" y="170" fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-soft)">→ client mgr</text>
      </svg>
    </div>
  );
}

// ── WorldFunnelVisual — High-Touch (world_funnel) ────────────────────────
// 22 dots scatter inward toward a central dashboard tile; one dot gets killed.
function WorldFunnelVisual() {
  // 22 seeded points across a rough world-map ellipse
  const dots = [
    [40,80],[70,60],[110,55],[150,50],[195,55],[235,60],[285,55],[330,65],[365,80],
    [55,130],[95,140],[160,135],[240,140],[310,130],[355,140],
    [60,180],[100,195],[150,200],[210,205],[265,200],[320,195],[360,185],
  ];
  const cx = 200, cy = 130;
  const killIdx = 11; // the dot that gets the red X
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse(p => (p + 1) % dots.length), 220);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="pv">
      <div className="pv-grid" />
      <svg className="pv-world" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet">
        {/* funnel lines */}
        {dots.map(([x,y], i) => (
          <line key={`l-${i}`} x1={x} y1={y} x2={cx} y2={cy}
                stroke={i === killIdx ? "rgba(255,90,107,0.5)" : "rgba(124,124,255,0.18)"}
                strokeWidth="0.9"
                strokeDasharray={i === killIdx ? "4 3" : "0"} />
        ))}
        {/* dots */}
        {dots.map(([x,y], i) => {
          const isKill = i === killIdx;
          const lit = i === pulse;
          return (
            <g key={`d-${i}`}>
              <circle cx={x} cy={y} r={lit ? 3.4 : 2.4}
                      fill={isKill ? "#FF5A6B" : "var(--text-soft)"}
                      opacity={lit ? 1 : 0.7} />
              {isKill && (
                <g>
                  <line x1={x-4} y1={y-4} x2={x+4} y2={y+4} stroke="#FF5A6B" strokeWidth="1.4"/>
                  <line x1={x-4} y1={y+4} x2={x+4} y2={y-4} stroke="#FF5A6B" strokeWidth="1.4"/>
                </g>
              )}
            </g>
          );
        })}
        {/* central dashboard tile */}
        <g transform={`translate(${cx-46} ${cy-30})`}>
          <rect width="92" height="60" rx="8" fill="var(--surface)" stroke="var(--lime)" strokeWidth="1.2"/>
          {/* mini bar chart */}
          <rect x="10" y="40" width="8"  height="10" fill="var(--lime)" opacity="0.65"/>
          <rect x="22" y="30" width="8"  height="20" fill="var(--lime)" opacity="0.8"/>
          <rect x="34" y="22" width="8"  height="28" fill="var(--lime)"/>
          <rect x="46" y="34" width="8"  height="16" fill="var(--lime)" opacity="0.7"/>
          <rect x="58" y="18" width="8"  height="32" fill="var(--lime)"/>
          <rect x="70" y="28" width="8"  height="22" fill="var(--lime)" opacity="0.8"/>
          <text x="46" y="14" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="var(--text-soft)">ROI · 22 mkts</text>
        </g>
        {/* legend */}
        <text x="14"  y="20"  fontFamily="JetBrains Mono" fontSize="10" fill="var(--text-soft)">22 MARKETS</text>
        <text x="280" y="244" fontFamily="JetBrains Mono" fontSize="10" fill="#FF5A6B">$1M campaign killed</text>
      </svg>
    </div>
  );
}

// ── InputToDeckVisual — Industry Trends (input_to_deck) ──────────────────
function InputToDeckVisual() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN(v => Math.min(v + 87, 8000)), 60);
    if (n >= 8000) clearInterval(t);
    return () => clearInterval(t);
  }, [n]);
  return (
    <div className="pv">
      <div className="pv-grid" />
      <div className="pv-i2d">
        <div className="pv-i2d-form">
          <div className="pv-i2d-row">
            <span className="pv-i2d-key">industry</span>
            <span className="pv-i2d-val">Restaurants</span>
          </div>
          <div className="pv-i2d-row">
            <span className="pv-i2d-key">region</span>
            <span className="pv-i2d-val">US · West</span>
          </div>
          <div className="pv-i2d-row">
            <span className="pv-i2d-key">period</span>
            <span className="pv-i2d-val">Q2 — Q3 2024</span>
          </div>
        </div>
        <div className="pv-i2d-arrow">
          <svg viewBox="0 0 50 20" preserveAspectRatio="none">
            <path d="M 2 10 L 44 10" stroke="var(--lime)" strokeWidth="1.5" strokeDasharray="3 3"/>
            <path d="M 38 4 L 46 10 L 38 16" stroke="var(--lime)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="pv-i2d-deck">
          {[0,1,2].map(i => (
            <div className="pv-i2d-slide" key={i} style={{ "--idx": i }}>
              <div className="pv-i2d-slide-title" />
              <div className="pv-i2d-slide-chart">
                <div className="pv-i2d-slide-bar" style={{ height: "40%" }} />
                <div className="pv-i2d-slide-bar" style={{ height: "70%" }} />
                <div className="pv-i2d-slide-bar" style={{ height: "55%" }} />
                <div className="pv-i2d-slide-bar" style={{ height: "85%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pv-pipeline-count"><strong>{n.toLocaleString()}</strong> hrs saved</div>
    </div>
  );
}

// ── Dispatcher ────────────────────────────────────────────────────────────
function ProjectVisual({ kind }) {
  switch (kind) {
    case "force_graph":      return <ForceGraphVisual />;
    case "chat_mockup":      return <ChatVisual />;
    case "input_to_outputs": return <InputToOutputsVisual />;
    case "pipeline_diagram": return <PipelineDiagramVisual />;
    case "anomaly_chart":    return <AnomalyChartVisual />;
    case "world_funnel":     return <WorldFunnelVisual />;
    case "input_to_deck":    return <InputToDeckVisual />;
    default:                 return null;
  }
}

window.ProjectVisual = ProjectVisual;

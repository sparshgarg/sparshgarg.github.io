/* global React, projects, projectsSection, ProjectVisual */
const { useEffect, useState } = React;

function BuiltAtBadge({ where }) {
  if (where === "amex") {
    return (
      <div className="built-at" title="Built at American Express">
        <img src="public/American_express_logo_shorthand.svg" alt="American Express" />
        <span>built at Amex</span>
      </div>
    );
  }
  if (where === "lovable") {
    return (
      <div className="built-at" title="Built on Lovable">
        <span className="built-at-mark">◆</span>
        <span>built on Lovable</span>
      </div>
    );
  }
  return null;
}

function StatusPill({ status }) {
  const label = (status || "").toUpperCase();
  return (
    <span className={`project-status status-${status}`}>
      {status === "live" && (
        <span style={{width:6, height:6, borderRadius:"50%", background:"currentColor", display:"inline-block"}}/>
      )}
      {label}
    </span>
  );
}

function ProjectCard({ p, i, onOpenModal }) {
  const featured = p.size === "featured";
  const className = `project-card ${featured ? "featured" : ""} reveal`;
  const style = { "--hue": p.hue, transitionDelay: `${i*0.06}s` };

  const Visual = (
    <div className="project-visual">
      <ProjectVisual kind={p.visual} />
      {p.builtAt && <BuiltAtBadge where={p.builtAt} />}
    </div>
  );

  const Meta = (
    <div className="project-meta">
      <div className="project-head">
        <div className="project-head-text">
          <div className="eyebrow" style={{marginBottom: 6}}>{p.category}</div>
          <div className="project-name">{p.name}</div>
        </div>
        <StatusPill status={p.status} />
      </div>
      {p.tagline && <div className="project-tagline">{p.tagline}</div>}
      <p className="project-desc">{p.desc}</p>
      <div className="project-tags">
        {p.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
      </div>
    </div>
  );

  const OpenChip = (
    <div className="project-open" aria-hidden="true">
      {p.link?.type === "modal" ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2 4 H14 M2 8 H14 M2 12 H10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 4 L12 4 L12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M4 12 L12 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      )}
    </div>
  );

  if (p.link?.type === "external" && p.link.url) {
    return (
      <a href={p.link.url} target="_blank" rel="noopener" className={className} style={style}>
        {Visual}{Meta}{OpenChip}
      </a>
    );
  }
  if (p.link?.type === "modal") {
    return (
      <button type="button" className={className} style={style} onClick={() => onOpenModal(p)}>
        {Visual}{Meta}{OpenChip}
      </button>
    );
  }
  return <div className={className} style={style}>{Visual}{Meta}</div>;
}

function ModalFlowchart({ spec }) {
  if (!spec || !Array.isArray(spec.nodes) || spec.nodes.length === 0) return null;
  return (
    <div className="modal-flow">
      <div className="modal-flow-label">// flow</div>
      <div className="modal-flow-track">
        {spec.nodes.map((n, i) => (
          <React.Fragment key={i}>
            <div className="flow-node">
              <div className="flow-node-step">{String(i+1).padStart(2,"0")}</div>
              <div className="flow-node-label">{n.label}</div>
              {n.sub && <div className="flow-node-sub">{n.sub}</div>}
            </div>
            {i < spec.nodes.length - 1 && (
              <div className="flow-arrow" aria-hidden="true">
                <svg viewBox="0 0 40 14" preserveAspectRatio="none">
                  <path d="M 1 7 L 33 7" stroke="var(--lime)" strokeWidth="1.4" strokeDasharray="3 3"/>
                  <path d="M 28 2 L 36 7 L 28 12" stroke="var(--lime)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;
  const m = project.modal || {};
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="modal-eyebrow">
          {project.builtAt === "amex" && (
            <img className="modal-eyebrow-logo" src="public/American_express_logo_shorthand.svg" alt="" />
          )}
          <span>{project.category}</span>
          <StatusPill status={project.status} />
        </div>
        <h3 className="modal-headline">{m.headline || project.name}</h3>
        {m.context && <div className="modal-context">{m.context}</div>}

        {m.flowchart && <ModalFlowchart spec={m.flowchart} />}

        {m.problem && (
          <div className="modal-section">
            <div className="modal-section-label">// problem</div>
            <p className="modal-section-body">{m.problem}</p>
          </div>
        )}

        {Array.isArray(m.approach) && m.approach.length > 0 && (
          <div className="modal-section">
            <div className="modal-section-label">// approach</div>
            <ol className="modal-approach">
              {m.approach.map((step, i) => (
                <li key={i}><span className="modal-step-num">{String(i+1).padStart(2,"0")}</span><span>{step}</span></li>
              ))}
            </ol>
          </div>
        )}

        {Array.isArray(m.results) && m.results.length > 0 && (
          <div className="modal-section">
            <div className="modal-section-label">// results</div>
            <ul className="modal-results">
              {m.results.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        )}

        {Array.isArray(m.stack) && m.stack.length > 0 && (
          <div className="modal-section">
            <div className="modal-section-label">// stack</div>
            <div className="modal-stack">
              {m.stack.map(s => <span className="project-tag" key={s}>{s}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Projects() {
  const [active, setActive] = useState(null);
  const head = projectsSection || {
    label: "// 01 — selected work",
    title: "Things I've actually shipped.",
    subtitle: "AI copilots, LLM pipelines, marketing engines. Not slide decks.",
    countSuffix: "projects",
  };
  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head-left">
            <div className="sec-head-no">{head.label}</div>
            <h2 className="gradient-text">{head.title}</h2>
            <p>{head.subtitle}</p>
          </div>
          <div className="sec-head-right">{projects.length} {head.countSuffix}</div>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.key} p={p} i={i} onOpenModal={setActive} />
          ))}
        </div>
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

window.Projects = Projects;

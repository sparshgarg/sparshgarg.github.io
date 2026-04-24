/* global React, projects, ProjectVisual */
const { useEffect, useRef } = React;

function ProjectCard({p, i}) {
  const className = `project-card ${p.size === "featured" ? "featured" : ""} reveal`;
  const style = { "--hue": p.hue, transitionDelay: `${i*0.08}s` };
  const Body = (
    <>
      <div className="project-visual">
        <ProjectVisual kind={p.visual} />
      </div>
      <div className="project-meta">
        <div className="project-head">
          <div>
            <div className="eyebrow" style={{marginBottom: 6}}>{p.kind}</div>
            <div className="project-name">{p.name}</div>
          </div>
          <span className={`project-status status-${p.status}`}>
            {p.status === "live" && <span style={{width:6, height:6, borderRadius:"50%", background:"currentColor", display:"inline-block"}}/>}
            {p.status}
          </span>
        </div>
        <p className="project-desc">{p.desc}</p>
        <div className="project-tags">
          {p.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
        </div>
      </div>
      {p.link && (
        <div className="project-open" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4 L12 4 L12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M4 12 L12 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
      )}
    </>
  );
  if (p.link) {
    return <a href={p.link} target="_blank" rel="noopener" className={className} style={style}>{Body}</a>;
  }
  return <div className={className} style={style}>{Body}</div>;
}

function Projects() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head-left">
            <div className="sec-head-no">// 01 — selected work</div>
            <h2 className="gradient-text">Things I've actually shipped.</h2>
            <p>AI copilots, LLM pipelines, experimentation platforms — not slide decks.</p>
          </div>
          <div className="sec-head-right">{projects.length} projects</div>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => <ProjectCard key={p.key} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

window.Projects = Projects;

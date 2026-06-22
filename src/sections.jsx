/* global React, Logo, personal, experiences, skills, marqueeItems */
const { useState, useEffect, useRef } = React;

// ── Navbar ─────────────────────────────────────────────────────────────
function Navbar() {
  const links = [
    { label: "projects",       href: "#work" },
    { label: "experience", href: "#experience" },
  ];
  const [active, setActive] = useState("work");
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(l => {
      const el = document.querySelector(l.href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="nav">
      <a className="nav-brand" href="#hero" aria-label="Back to top">
        <div className="nav-brand-dot">SG</div>
        <span className="nav-brand-name">sparsh.garg</span>
      </a>
      {links.map(l => (
        <a key={l.href} href={l.href} className={`nav-link ${active === l.href.slice(1) ? "active" : ""}`}>
          {l.label}
        </a>
      ))}
      <a className="nav-cta" href="#contact">let's talk →</a>
    </nav>
  );
}

// ── Marquee ────────────────────────────────────────────────────────────
function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee">
      <div className="marquee-label">Tools that I can juggle with</div>
      <div className="marquee-track">
        {items.map((it, i) => (
          <div className="marquee-item" key={i}>
            <div className="marquee-logo-shell">
              {it.logo ? (
                <img src={it.logo} alt={it.label} className="marquee-logo" />
              ) : (
                <span className="marquee-monogram">{it.monogram || it.label}</span>
              )}
            </div>
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Experience ─────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head-left">
            <div className="sec-head-no">// 02 — experience</div>
            <h2 className="gradient-text">My Journey</h2>
          </div>
          <div className="sec-head-right">{experiences.length} stops</div>
        </div>
        <ol className="xp-timeline">
          {experiences.map((x, i) => <ExperienceCard key={i} x={x} i={i} />)}
        </ol>
      </div>
    </section>
  );
}

function ExperienceCard({x, i}) {
  return (
    <li className="xp-row reveal" style={{ transitionDelay: `${i*0.07}s` }}>
      <div className="xp-rail">
        <span className="xp-dot" />
      </div>
      <article className="xp-card">
        <div className="xp-left">
          <ExperienceLogo logo={x.logo} />
          <div className="xp-period">{x.period}</div>
        </div>
        <div className="xp-right">
          <div className="xp-co">{x.company}</div>
          <h3 className="xp-role">{x.role}</h3>
          <div className="xp-team">{x.team}</div>
          <div className="xp-tags">
            {x.tags.map(t => <span className="xp-tag" key={t}>{t}</span>)}
          </div>
        </div>
      </article>
    </li>
  );
}

function ExperienceLogo({logo}) {
  if (logo === "aws") return <div className="xp-logo-tile"><img src="public/Amazon-Web-Services-Emblem.png" alt="AWS" /></div>;
  if (logo === "amex") return <div className="xp-logo-tile"><img src="public/American_express_logo_shorthand.svg" alt="Amex" /></div>;
  if (logo === "uw")   return <div className="xp-logo-tile"><img src="public/cropped-UW-logo-512.png" alt="University of Washington" /></div>;
  if (logo === "pec")  return <div className="xp-logo-tile"><img src="public/pec-logo.png" alt="Punjab Engineering College" /></div>;
  return null;
}

// ── Skills ─────────────────────────────────────────────────────────────
function Skills() {
  const groups = Object.keys(skills);
  const [tab, setTab] = useState(groups[0]);
  return (
    <section id="skills">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head-left">
            <div className="sec-head-no">// 05 — toolkit</div>
            <h2 className="gradient-text">What I reach for.</h2>
          </div>
          <div className="sec-head-right">{skills[tab].length} items</div>
        </div>
        <div className="skills-tabs reveal">
          {groups.map(g => (
            <button key={g} className={`skill-tab ${tab === g ? "active" : ""}`} onClick={() => setTab(g)}>{g}</button>
          ))}
        </div>
        <div className="skill-chips reveal">
          {skills[tab].map(s => <div className="skill-chip" key={s}>{s}</div>)}
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact-hero reveal">
          <h2 className="gradient-text">Let's build something that ships.</h2>
          <p>Open to full-time {` `}<strong style={{color:"#C5F24A"}}>Product Management </strong> Roles.</p>
          <div className="contact-channels">
            <a className="contact-channel primary" href={`mailto:${personal.email}`}>✉ {personal.email}</a>
            <a className="contact-channel" href={personal.linkedin} target="_blank" rel="noopener">in · linkedin</a>
            <a className="contact-channel" href={personal.github} target="_blank" rel="noopener">{`{ }`} github</a>
            <a
              className="contact-channel"
              href="public/Sparsh_Garg_Resume.pdf"
              download="Sparsh_Garg_Resume.pdf"
            >
              ↓ resume.pdf
            </a>
          </div>
        </div>
        <footer>
          <div>© 2026 Sparsh Garg · built from scratch, deployed via GitHub</div>
          <div>sparshgarg.github.io</div>
        </footer>
      </div>
    </section>
  );
}

Object.assign(window, { Navbar, Marquee, Experience, Skills, Contact });

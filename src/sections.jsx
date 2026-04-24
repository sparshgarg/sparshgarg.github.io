/* global React, Logo, personal, experiences, skills, marqueeItems, numbers */
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

// ── Numbers ────────────────────────────────────────────────────────────
function Numbers() {
  return (
    <section id="numbers">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head-left">
            <div className="sec-head-no">// 02 — impact at a glance</div>
            <h2 className="gradient-text">Numbers, not adjectives.</h2>
            <p>The receipts from four years of shipping at Amex, AWS, and a few things in between.</p>
          </div>
          <div className="sec-head-right">scroll ↓</div>
        </div>
        <div className="num-grid reveal">
          {numbers.map((n, i) => (
            <div className="num" key={i}>
              <div className="num-val">{n.val}<span className="unit">{n.unit}</span></div>
              <div className="num-label">{n.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head-left">
            <div className="sec-head-no">// 03 — experience</div>
            <h2 className="gradient-text">Shipped across cloud, payments, and a startup.</h2>
            <p>The short version — with the receipts baked in.</p>
          </div>
          <div className="sec-head-right">3 chapters</div>
        </div>
        <div className="xp-list">
          {experiences.map((x, i) => <ExperienceCard key={i} x={x} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({x, i}) {
  return (
    <article className="xp-card reveal" style={{ transitionDelay: `${i*0.06}s` }}>
      <div className="xp-left">
        <ExperienceLogo logo={x.logo} />
        <div className="xp-period">{x.period}</div>
      </div>
      <div className="xp-right">
        <div className="xp-co">{x.company}</div>
        <h3 className="xp-role">{x.role}</h3>
        <div className="xp-team">{x.team}</div>
        <ul>
          {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
        </ul>
        <div className="xp-tags">
          {x.tags.map(t => <span className="xp-tag" key={t}>{t}</span>)}
        </div>
      </div>
    </article>
  );
}

function ExperienceLogo({logo}) {
  if (logo === "aws") return <div className="xp-logo-tile"><img src="public/aws-logo-new.svg" alt="AWS" /></div>;
  if (logo === "amex") return <div className="xp-logo-tile"><img src="public/amex-logo-new.svg" alt="Amex" /></div>;
  if (logo === "foodclub") return (
    <div className="xp-logo-tile dark" style={{color: "#FF7A5A"}}>
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="16" stroke="#FF7A5A" strokeWidth="2" fill="none"/>
        <text x="20" y="25" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fontWeight="700" fill="#FF7A5A">FC</text>
      </svg>
    </div>
  );
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
              href="https://drive.google.com/file/d/1eLsWOmos6v5EtaRCwG1BZP_O-74FDr1-/view?usp=sharing"
              target="_blank"
              rel="noopener"
            >
              ↓ resume.pdf
            </a>
          </div>
        </div>
        <footer>
          <div>© 2026 Sparsh Garg · built from scratch, deployed via GitHub Actions</div>
          <div>sparshgarg.github.io</div>
        </footer>
      </div>
    </section>
  );
}

Object.assign(window, { Navbar, Marquee, Numbers, Experience, Skills, Contact });

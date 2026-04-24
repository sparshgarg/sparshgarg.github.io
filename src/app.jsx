/* global React, ReactDOM, personal, Logo,
   Navbar, Marquee, Numbers, Experience, Contact, Projects */

const { useEffect, useMemo, useRef, useState } = React;

function BrandImg({ src, fallbackSrc, alt, className }) {
  const [current, setCurrent] = useState(src);
  useEffect(() => setCurrent(src), [src]);
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        if (fallbackSrc && current !== fallbackSrc) setCurrent(fallbackSrc);
      }}
    />
  );
}

// ── Hero ───────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-blob b1" />
      <div className="hero-blob b2" />
      <div className="hero-blob b3" />
      <div className="hero-grid" />
      <div className="wrap hero-inner hero-two">
        <div className="hero-col-text">
        {/* <div className="hero-status reveal in">
          <span className="pulse-dot" />
          available · Foster MBA '26 · seeking full-time PM
        </div> */}
        <h1 className="hero-title">
          <span className="row row-name">Sparsh Garg<span style={{color:"var(--lime)"}}>.</span></span>
          <span className="row row-sub outline">Technical PM.</span>
          <span className="row row-sub"><span className="wave">AI · Cloud · Data.</span></span>
        </h1>
        <div className="hero-tagline">
          Turning Data into <span className="scribble">Products </span> and Products into{" "}
          <span className="scribble">Impact</span>
        </div>
        <div className="hero-meta">
          <span>◇ Seattle, WA</span>
          <span className="dot" />
          <span>◇ prev. AWS · Amex · FoodClub</span>
          <span className="dot" />
          <span>◇ shipping since 2019</span>
        </div>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#work">
            see the work
            <svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 8 L13 8 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a className="btn btn-ghost" href={`mailto:${personal.email}`}>say hi →</a>
        </div>

        <div className="hero-logos">
          <div className="hero-logos-label">built with / shipped at</div>
          <div className="hero-logos-row">
            <div className="hero-logo logo-pill">
              <BrandImg
                src="public/Amazon-Web-Services-Emblem.png"
                fallbackSrc="public/aws-logo-new.svg"
                alt="AWS"
                className="brand-img brand-aws"
              />
            </div>
            <div className="hero-logo logo-pill">
              <BrandImg
                src="public/American_express_logo_shorthand.svg"
                fallbackSrc="public/amex-logo-new.svg"
                alt="American Express"
                className="brand-img brand-amex"
              />
            </div>
            <div className="hero-logo logo-pill">
              <BrandImg
                src="public/cropped-UW-logo-512.png"
                fallbackSrc="public/uw-logo.png"
                alt="UW"
                className="brand-img brand-uw"
              />
              
            </div>
          </div>
        </div>
        </div>

        <div className="hero-col-portrait">
          <div className="hero-portrait">
            <img src="public/sparsh-headshot.jpg" alt="Sparsh Garg" />
            <div className="hero-portrait-tag">
              <span className="pulse-dot" /> sparsh.garg
            </div>
            <div className="hero-portrait-scribble">hi, I'm sparsh →</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Reveal on scroll ────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    }, { threshold: 0.1, rootMargin: "-40px" });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── App ─────────────────────────────────────────────────────────────────
function App() {
  useReveal();
  useEffect(() => {
    document.body.style.setProperty("--grain-opacity", "0.55");
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Projects />
      <Numbers />
      <Experience />
      <Contact />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

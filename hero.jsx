/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor */
const { useState, useEffect, useRef } = React;

/* =========================================================
   Header
   - Anchors (/diagram /about /contact) are hidden until the
     user has scrolled past the ls -la box (then they appear,
     as the panels themselves are no longer on-screen).
   ========================================================= */
function MoonIcon() {
  return (
    <svg className="moon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11.5 9.5A4.5 4.5 0 0 1 6.5 4.5c0-.5.1-1 .25-1.4A5.5 5.5 0 1 0 13 9.2c-.45.2-.95.3-1.5.3Z" fill="currentColor" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg className="sun" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M8 1.5v1.8" /><path d="M8 12.7v1.8" />
        <path d="M1.5 8h1.8" /><path d="M12.7 8h1.8" />
        <path d="M3.4 3.4l1.3 1.3" /><path d="M11.3 11.3l1.3 1.3" />
        <path d="M3.4 12.6l1.3-1.3" /><path d="M11.3 4.7l1.3-1.3" />
      </g>
    </svg>
  );
}

function Header({ onThemeToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [showAnchors, setShowAnchors] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // Show anchors once the ls-la box's bottom has scrolled above the header.
      const trigger = document.querySelector('[data-anchor-trigger="ls"]');
      if (trigger) {
        const rect = trigger.getBoundingClientRect();
        // Header is ~70px on desktop, 60px on mobile — use 72 as a safe threshold.
        setShowAnchors(rect.bottom < 72);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site${scrolled ? ' scrolled' : ''}`}>
      <a className="brand" href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        michael.longerich<span className="slash"> // </span>
        <span className="role">tech lead · platform engineer</span>
      </a>
      <nav className={`anchors${showAnchors ? ' visible' : ''}`} aria-label="Page sections" aria-hidden={!showAnchors}>
        <a href="#diagram">/diagram</a>
        <a href="#about">/about</a>
        <a href="#contact">/contact</a>
      </nav>
      <button className="theme-toggle" onClick={onThemeToggle} aria-label="Toggle color theme">
        <MoonIcon /><SunIcon /><span>theme</span>
      </button>
    </header>
  );
}

/* =========================================================
   Boot status hook — starts as "booting" (yellow), then
   transitions to its final state after a random 1–3s delay.
   ========================================================= */
function useBootStatus(finalStatus, finalLabel, bootLabel = 'booting') {
  const [state, setState] = useState({ status: 'boot', label: bootLabel });
  useEffect(() => {
    const delay = 1000 + Math.random() * 2000; // 1–3s
    const t = setTimeout(() => setState({ status: finalStatus, label: finalLabel }), delay);
    return () => clearTimeout(t);
  }, [finalStatus, finalLabel]);
  return state;
}

/* =========================================================
   Hero top — title block
   ========================================================= */
function HeroMetaStatus() {
  // Same loading pattern as the ps-aux rows: yellow "booting" → green "running"
  const s = useBootStatus('run', 'running', 'booting');
  const color = s.status === 'run' ? 'var(--pulse)' : 'var(--warn)';
  return <span className="v meta-status" style={{ color }}>{s.label}</span>;
}

function HeroTop() {
  return (
    <div className="hero-top">
      <div className="breadcrumb">/ system / boundary / readme.md</div>
      <h1 className="hero-title">
        michael.longerich<span className="slash"> // </span>system
        <span className="pulse-dot" aria-hidden="true" />
      </h1>
      <p className="lede">
        Lead Consultant at Thoughtworks. Platform engineering, infrastructure,
        and tech leadership — building the systems that let other engineers ship faster.
      </p>
      <div className="hero-meta">
        <span><span className="k">location:</span> <span className="v">Chiang Mai, TH</span></span>
        <span><span className="k">status:</span> <HeroMetaStatus /></span>
        <span><span className="k">version:</span> <span className="v">v12.y · 2026</span></span>
        <span><span className="k">uptime:</span> <span className="v">12y</span></span>
      </div>
    </div>
  );
}

/* =========================================================
   ps aux currently panel — boots, then settles into final
   running/building states (each row delays independently).
   ========================================================= */
function PsAuxRow({ pid, ns, name, time, finalStatus, finalLabel }) {
  // Pick a boot verb that fits the eventual state, for a little flavour
  const bootLabel = finalStatus === 'build' ? 'spawning' : 'starting';
  const s = useBootStatus(finalStatus, finalLabel, bootLabel);
  return (
    <React.Fragment>
      <div className="ps-pid">{pid}</div>
      <div className="ps-name"><span className="ns">{ns}</span>{name}</div>
      <div className="ps-time">{time} ago</div>
      <div className={`ps-status ${s.status}`}>
        <span className="d" />{s.label}
      </div>
    </React.Fragment>
  );
}

function PsAuxPanel() {
  const rows = [
    { pid: '2024', ns: 'tech-lead/', name: 'airline-platform',  time: '18mo', finalStatus: 'run',   finalLabel: 'running' },
    { pid: '2023', ns: 'community/', name: 'platform-eng-lead', time: '2y',   finalStatus: 'run',   finalLabel: 'running' },
    { pid: '2024', ns: 'community/', name: 'ai-tooling-lead',   time: '14mo', finalStatus: 'run',   finalLabel: 'running' },
    { pid: '2025', ns: 'side/',      name: 'dashnote.app',      time: '4mo',  finalStatus: 'build', finalLabel: 'building' },
    { pid: '2025', ns: 'side/',      name: 'pfa-donation',      time: '6mo',  finalStatus: 'build', finalLabel: 'building' },
  ];

  return (
    <div className="term-block">
      <div className="term-chrome">
        <span className="dot" /><span className="dot" /><span className="dot" />
        <span className="term-title">~ $ ps aux | grep michael</span>
        <span className="term-badge"><span className="live-dot" />live</span>
      </div>
      <div className="term-body">
        <div className="ps-table">
          <div className="ps-head">pid</div>
          <div className="ps-head">service</div>
          <div className="ps-head">started</div>
          <div className="ps-head">status</div>
          {rows.map((r, i) => <PsAuxRow key={i} {...r} />)}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ls site index — clickable section list. The header anchors
   stay hidden until this whole block has scrolled off-screen.
   ========================================================= */
function LsIndexPanel() {
  const entries = [
    { name: '/diagram', desc: 'the system, visualized', href: '#diagram' },
    { name: '/about',   desc: 'cat ./README.md',         href: '#about' },
    { name: '/contact', desc: 'open channels',           href: '#contact' },
  ];

  return (
    <div className="term-block" data-anchor-trigger="ls">
      <div className="term-chrome">
        <span className="dot" /><span className="dot" /><span className="dot" />
        <span className="term-title">~ $ ls -la ./michael.longerich/</span>
        <span className="term-badge">3 items</span>
      </div>
      <div className="term-body" style={{ whiteSpace: 'normal' }}>
        <div className="ls-list">
          {entries.map((e) => (
            <a
              key={e.name}
              className="ls-entry"
              href={e.href}
              onClick={(ev) => {
                ev.preventDefault();
                const el = document.querySelector(e.href);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span className="ls-name"><span className="slash">cd </span>{e.name}</span>
              <span className="ls-desc">{e.desc}</span>
              <span className="ls-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Hero footer — single CTA (provision.sh)
   ========================================================= */
function HeroFoot() {
  const onProvision = (e) => {
    e.preventDefault();
    const el = document.querySelector('#diagram');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="hero-foot">
      <a className="cta-btn" href="#diagram" onClick={onProvision}>
        <span className="prompt">$</span>
        <span className="cmd">./provision.sh</span>
        <span className="blink" aria-hidden="true" />
      </a>
    </div>
  );
}

/* =========================================================
   Full Hero
   ========================================================= */
function HeroSection() {
  const [bootReady, setBootReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBootReady(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`hero${bootReady ? ' boot-ready' : ''}`} id="hero" data-screen-label="01 Hero">
      <HeroTop />
      <div className="hero-middle">
        <PsAuxPanel />
        <LsIndexPanel />
      </div>
      <HeroFoot />
    </section>
  );
}

/* =========================================================
   Diagram peek
   ========================================================= */
function DiagramPeek() {
  return (
    <section className="diagram-peek" id="diagram" data-screen-label="02 Diagram">
      <div className="section-label">
        <span className="num">02</span>
        <span>diagram · kubectl get all -n boundary</span>
        <span className="line" />
        <span className="progress">2 / 4</span>
      </div>
      <div className="peek-canvas">
        <div className="peek-boundary-label">
          <span className="punct">{'─ namespace: '}</span>boundary.thoughtworks<span className="punct">{' ─'}</span>
        </div>
        <div className="peek-nodes">
          <div className="peek-node">
            <div className="id">deployment/tech-lead</div>
            <div className="title">Tech Lead</div>
            <div className="sub"><span className="dot" />Lead Consultant · TW</div>
          </div>
          <div className="peek-node">
            <div className="id">service/platform-eng</div>
            <div className="title">Platform Eng</div>
            <div className="sub"><span className="dot" />community lead</div>
          </div>
          <div className="peek-node">
            <div className="id">service/infra-eng</div>
            <div className="title">Infra Eng</div>
            <div className="sub"><span className="dot" />k8s · terraform</div>
          </div>
          <div className="peek-node">
            <div className="id">service/ai-tooling</div>
            <div className="title">AI &amp; Tooling</div>
            <div className="sub"><span className="dot" />community lead</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   App
   ========================================================= */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
  }, [tweaks.theme]);

  const onThemeToggle = () => setTweak('theme', tweaks.theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <Header onThemeToggle={onThemeToggle} />
      <main>
        <HeroSection />
        <DiagramPeek />
      </main>

      <TweaksPanel title="Hero Tweaks">
        <TweakSection title="Theme">
          <TweakRadio
            label="Mode"
            value={tweaks.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark',  label: 'Dark' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

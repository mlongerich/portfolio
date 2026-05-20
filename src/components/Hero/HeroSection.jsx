import { useBootSequence } from '../../hooks/useBootSequence.js';
import { useBootStatus } from '../../hooks/useBootStatus.js';

function PsAuxRow({ pid, ns, name, time, finalStatus, finalLabel }) {
  const bootLabel = finalStatus === 'build' ? 'spawning' : 'starting';
  const s = useBootStatus(finalStatus, finalLabel, bootLabel);
  return (
    <>
      <div className="ps-pid">{pid}</div>
      <div className="ps-name"><span className="ns">{ns}</span>{name}</div>
      <div className="ps-time">{time} ago</div>
      <div className={`ps-status ${s.status}`}>
        <span className="d" />{s.label}
      </div>
    </>
  );
}

function PsAuxPanel() {
  const rows = [
    { pid: '2024', ns: 'tech-lead/', name: 'airline',  time: '18mo', finalStatus: 'run',   finalLabel: 'running' },
    { pid: '2023', ns: 'community/', name: 'platform-eng-lead', time: '3y',   finalStatus: 'run',   finalLabel: 'running' },
    { pid: '2020', ns: 'community/', name: 'ai-lead',   time: '6y', finalStatus: 'run',   finalLabel: 'running' },
    { pid: '2025', ns: 'side/',      name: 'ai-meeting-notes.app',      time: '1y',  finalStatus: 'build', finalLabel: 'building' },
    { pid: '2025', ns: 'side/',      name: 'donation.app',      time: '1y',  finalStatus: 'build', finalLabel: 'building' },
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

function LsIndexPanel() {
  const entries = [
    { name: '/diagram', desc: 'the system, visualized', href: '#diagram' },
    { name: '/about',   desc: 'cat ./README.md',        href: '#about' },
    { name: '/contact', desc: 'open channels',          href: '#contact' },
  ];

  return (
    <div className="term-block" data-anchor-trigger="ls">
      <div className="term-chrome">
        <span className="dot" /><span className="dot" /><span className="dot" />
        <span className="term-title">~ $ ls -la ./michael.longerich/</span>
        <span className="term-badge">3 items</span>
      </div>
      <div className="term-body">
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

export function HeroSection() {
  const { heroWord, heroReady, bootReady } = useBootSequence();

  return (
    <section className={`hero${bootReady ? ' boot-ready' : ''}`} id="hero" data-screen-label="01 Hero">
      <div className="hero-top">
        <div className="breadcrumb">/ system / boundary / readme.md</div>
        <h1>
          michael.longerich<span className="slash"> // </span>system
          <span
            className={`pulse-dot${heroReady ? '' : ' loading'}`}
            id="heroDot"
            aria-hidden="true"
          />
        </h1>
        <p className="lede">
          Lead Consultant at Thoughtworks. Platform engineering, infrastructure, and tech
          leadership — building the systems that let other engineers ship faster.
        </p>
        <div className="hero-meta">
          <span><span className="k">location:</span> <span className="v">Chiang Mai, TH</span></span>
          <span>
            <span className="k">status:</span>{' '}
            <span
              className={`v${heroReady ? '' : ' loading'}`}
              id="heroStatus"
              style={{ color: heroReady ? 'var(--pulse)' : 'var(--warn)' }}
            >
              {heroReady ? 'running' : heroWord}
            </span>
          </span>
          <span><span className="k">uptime:</span> <span className="v">12y · still running</span></span>        </div>
      </div>
      <div className="hero-middle">
        <PsAuxPanel />
        <LsIndexPanel />
      </div>
      <HeroFoot />
    </section>
  );
}

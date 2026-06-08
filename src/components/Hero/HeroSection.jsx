import { useBootSequence } from '../../hooks/useBootSequence.js';

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
          <span><span className="k">uptime:</span> <span className="v">12y · still running</span></span>
        </div>
      </div>
      <div className="hero-about" id="about">
        <h2><span className="key">$</span> whoami</h2>
        <p>
          I lead cross-functional engineering teams and direct platform strategy.{' '}
          <span className="accent">Lead Consultant at Thoughtworks</span>, currently embedded with an airline client where I technical lead a team of 20, improving ticketing flexibility and operational efficiency.
        </p>
        <p>
          I build backend systems, cloud platforms, and the kind of infrastructure work nobody notices until it breaks. The stuff that lets other engineers ship faster.
          I'm particularly focused on <span className="accent">Internal Developer Platforms</span>. The portals, pipelines, and golden paths that reduce cognitive load for engineering teams.
        </p>
        <p>
          German-Filipino, raised in the US, now based in{' '}
          <span className="accent">Chiang Mai</span>. Years in consulting taught me that simple systems age better, edge cases always show up eventually, and good engineering is as much about communication as code.
          I enjoy solving messy operational problems, improving developer experience, and building systems other engineers actually enjoy working with.
        </p>
        <p className="muted">
          Outside of client work: community lead for Thoughtworks' Platform Engineering and AI groups, conference speaker, active mentor, and the kind of person who builds a meeting-notes app on the side just because.
        </p>
      </div>
      <HeroFoot />
    </section>
  );
}

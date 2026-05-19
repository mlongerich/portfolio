import { SectionLabel } from '../common/SectionLabel.jsx';

export function AboutSection() {
  return (
    <section className="about" id="about" data-screen-label="03 About">
      <SectionLabel num="03" label="about · cat ./README.md" />
      <div className="about-body">
      <h2><span className="key">$</span> whoami</h2>
      <p>
        I build backend systems, cloud platforms, and the kind of infrastructure work nobody notices until it breaks. The stuff that lets other engineers ship faster.{' '}
        <span className="accent">Lead Consultant at Thoughtworks</span>, currently embedded with an airline client where I technical lead a team of 20, improving ticketing flexibility and operational efficiency.
      </p>
      <p>
        German-Filipino, raised in the US, now based in{' '}
        <span className="accent">Chiang Mai</span>. Years in consulting taught me that simple systems age better, edge cases always show up eventually, and good engineering is as much about communication as code.
        I enjoy solving messy operational problems, improving developer experience, and building systems other engineers actually enjoy working with.
      </p>
      <p className="muted">
        Outside of client work: community lead for Thoughtworks’ Platform Engineering and AI groups, conference speaker, active mentor, and the kind of person who builds a meeting-notes app on the side just because.
      </p>
      </div>
    </section>
  );
}

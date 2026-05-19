import { SectionLabel } from '../common/SectionLabel.jsx';
import { ContactCard } from './ContactCard.jsx';
import { CONTACTS } from '../../data/contactData.js';
import { useBootSequence } from '../../hooks/useBootSequence.js';

export function ContactSection({ onTalkClick }) {
  const { footerReady, footerRef } = useBootSequence();

  return (
    <section className="contact" id="contact" data-screen-label="04 Contact">
      <SectionLabel num="04" label="contact · ingress.yaml" />
      <h2 style={{ fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500, margin: '0 0 4px 0' }}>
        <span style={{ color: 'var(--text-dim)' }}>$</span> kubectl get ingress/contact
      </h2>
      <p style={{ fontFamily: 'var(--sans)', color: 'var(--text-muted)', maxWidth: '560px', margin: '18px 0 0' }}>
        Open to platform engineering and tech leadership roles.
      </p>
      <div className="contact-grid">
        {CONTACTS.map((c) => (
          <ContactCard key={c.label} {...c} onTalkClick={c.modal ? onTalkClick : undefined} />
        ))}
      </div>

      <footer className="site">
        <span>© 2026 michael longerich · built as a system</span>
        <span>
          <span
            id="footerDot"
            ref={footerRef}
            className={footerReady ? 'status-pulse' : 'warn-pulse'}
            style={{ color: footerReady ? 'var(--pulse)' : 'var(--warn)', transition: 'color 220ms ease' }}
          >
            ●
          </span>{' '}
          <span id="footerStatus">
            {footerReady ? 'all systems running' : 'verifying systems'}
          </span>
        </span>
      </footer>
    </section>
  );
}

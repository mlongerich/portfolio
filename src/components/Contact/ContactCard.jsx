import { useHoverState } from '../../hooks/useHoverState.js';

export function ContactCard({ label, href, value, external, modal, download, onTalkClick }) {
  const [hovered, setHovered] = useHoverState();
  const cls = `contact-card${hovered ? ' hovered' : ''}`;
  const hoverProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  const inner = (
    <>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </>
  );

  if (modal) {
    return (
      <button className={cls} onClick={onTalkClick} {...hoverProps}>
        {inner}
      </button>
    );
  }

  return (
    <a
      className={cls}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      {...(download ? { download: true } : {})}
      {...hoverProps}
    >
      {inner}
    </a>
  );
}

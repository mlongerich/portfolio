export function SectionLabel({ num, label, right }) {
  return (
    <div className="section-label">
      <span className="num">{num}</span>
      <span>{label}</span>
      <span className="line" />
      {right && <span className="progress">{right}</span>}
    </div>
  );
}

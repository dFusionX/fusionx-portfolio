// Renders the shared <filter> and <symbol> once. Mount this a single time near the root —
// Nav/Footer/Hero all reference #fx-mark via <use>, so the definition only needs to exist once.
export default function MarkDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <filter id="fx-blur" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <symbol id="fx-mark" viewBox="0 0 120 120">
        <g className="fx-revolve">
          <g className="fx-outer-in">
            <circle className="fx-ring-base fx-ring-base-outer" cx="60" cy="60" r="48" strokeWidth="1.9" />
            <circle className="fx-ring-pulse fx-ring-pulse-1" cx="60" cy="60" r="48" pathLength={100} strokeWidth="2.6" />
          </g>
          <g className="fx-l-in">
            <ellipse className="fx-ring-base fx-ring-base-l" cx="60" cy="60" rx="48" ry="17" strokeWidth="1.9" transform="rotate(58 60 60)" />
            <ellipse className="fx-ring-pulse fx-ring-pulse-2" cx="60" cy="60" rx="48" ry="17" pathLength={100} strokeWidth="2.6" transform="rotate(58 60 60)" />
          </g>
          <g className="fx-r-in">
            <ellipse className="fx-ring-base fx-ring-base-r" cx="60" cy="60" rx="48" ry="17" strokeWidth="1.9" transform="rotate(122 60 60)" />
            <ellipse className="fx-ring-pulse fx-ring-pulse-3" cx="60" cy="60" rx="48" ry="17" pathLength={100} strokeWidth="2.6" transform="rotate(122 60 60)" />
          </g>
          <circle className="fx-node fx-node-a" cx="60" cy="12" r="2.4" />
          <circle className="fx-node fx-node-b" cx="18" cy="84" r="2.4" />
          <circle className="fx-node fx-node-c" cx="102" cy="84" r="2.4" />
        </g>
        <circle className="fx-glow" cx="60" cy="60" r="13" fill="var(--plasma)" filter="url(#fx-blur)" />
        <circle className="fx-core" cx="60" cy="60" r="7" fill="var(--plasma)" />
      </symbol>
    </svg>
  );
}

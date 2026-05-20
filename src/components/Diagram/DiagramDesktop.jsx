import { useState } from 'react';

const cl = (...parts) => parts.filter(Boolean).join(' ');

function NodeStatus({ nodeId, nodeStatuses, cx, cy, sx, sy, loading, ready }) {
  const state = nodeStatuses[nodeId] || 'loading';
  return (
    <g className="node-status" data-state={state}>
      <circle className="dot-warn warn-pulse" cx={cx} cy={cy} r="3" />
      <circle className="dot status-pulse" cx={cx} cy={cy} r="3" />
      <text className="loading-txt" x={sx} y={sy} textAnchor="end">{loading}</text>
      <text className="ready-txt" x={sx} y={sy} textAnchor="end">{ready}</text>
    </g>
  );
}

function NodeGrp({ nodeId, ariaLabel, revealed, nodeStatuses, activeNodeId, pinnedNodeId, handlers, children }) {
  const isRevealed = revealed.has(`node-${nodeId}`);
  const isActive = activeNodeId === nodeId;
  return (
    <g
      className={cl('node-group prov-fade prov-flash', isRevealed && 'in', isActive && 'active')}
      data-prov={`node-${nodeId}`}
      data-node={nodeId}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      aria-expanded={isActive}
      onMouseEnter={(e) => { if (pinnedNodeId && pinnedNodeId !== nodeId) return; handlers.showCard(nodeId, e.currentTarget); }}
      onMouseLeave={() => handlers.hideCard(nodeId)}
      onClick={(e) => { e.stopPropagation(); handlers.pinCard(nodeId, e.currentTarget); }}
      onFocus={(e) => handlers.showCard(nodeId, e.currentTarget)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlers.pinCard(nodeId, e.currentTarget); }
        if (e.key === 'Escape') { handlers.dismissCard(); e.currentTarget.blur(); }
      }}
    >
      {children}
    </g>
  );
}

function Arr({ id, d, revealedArrows, activeArrow, setActiveArrow, dashed }) {
  const isRevealed = revealedArrows.has(id);
  const isActive = activeArrow === id;
  return (
    <g className={cl('arr', isRevealed && 'in', isActive && 'active')} data-arrow={id}>
      <path
        id={`arr-${id}`}
        className={cl('arrow-path prov-arrow', isRevealed && 'in')}
        data-prov={`arr-${id}`}
        d={d}
        markerEnd="url(#arrowhead)"
        {...(dashed ? { strokeDasharray: '4 3' } : {})}
      />
      <path
        className="arrow-hit"
        data-arrow={id}
        d={d}
        onMouseEnter={() => { if (isRevealed) setActiveArrow(id); }}
        onMouseLeave={() => setActiveArrow(null)}
      />
    </g>
  );
}

function ArrLabel({ id, activeArrow, x, y, text, anchor = 'middle' }) {
  return (
    <g className={cl('arrow-label-group', activeArrow === id && 'active')} data-arrow={id}>
      <text className="arrow-label" x={x} y={y} textAnchor={anchor}>{text}</text>
    </g>
  );
}

function Pulse({ arrowId, dur, begin, revealedArrows }) {
  return (
    <circle
      className={cl('pulse-dot-svg', revealedArrows.has(arrowId) && 'live')}
      data-pulse-arrow={arrowId}
      r="2.5"
    >
      <animateMotion dur={dur} repeatCount="indefinite" begin={begin}>
        <mpath href={`#arr-${arrowId}`} />
      </animateMotion>
    </circle>
  );
}

export function DiagramDesktop({ revealed, revealedArrows, nodeStatuses, activeNodeId, pinnedNodeId, handlers }) {
  const [activeArrow, setActiveArrow] = useState(null);
  const r = (key) => revealed.has(key);
  const ra = (key) => revealedArrows.has(key);
  const nodeProps = { revealed, nodeStatuses, activeNodeId, pinnedNodeId, handlers };

  return (
    <div className="diagram-desktop">
      <div className="diagram-inner">
        <svg
          className="diagram"
          id="diagramSvg"
          viewBox="0 0 1440 1270"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Architecture diagram of Michael Longerich's career and projects"
        >
          <defs>
            <marker id="arrowhead" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
            </marker>
          </defs>

          {/* Layer 1 — boundary */}
          <g className="layer-boundary">
            <rect className={cl('boundary prov-draw', r('boundary') && 'in')} data-prov="boundary" x="60" y="160" width="1320" height="964" rx="8" ry="8" />
            <text className={cl('boundary-label prov-fade', r('boundary-label') && 'in')} data-prov="boundary-label" x="80" y="184">
              <tspan className="punct">// </tspan>system <tspan className="punct">·</tspan> michael.longerich <tspan className="punct">·</tspan> region: <tspan fill="var(--text)">ap-southeast-1</tspan>
            </text>
          </g>

          {/* Layer 2 — namespaces */}
          <g className="layer-namespaces">
            <rect className={cl('namespace prov-draw', r('ns-leadership') && 'in')} data-prov="ns-leadership" x="100" y="210" width="1240" height="150" rx="6" ry="6" />
            <text className={cl('namespace-label prov-fade', r('ns-leadership-label') && 'in')} data-prov="ns-leadership-label" x="118" y="234">
              <tspan className="key">namespace:</tspan> leadership
            </text>
            <rect className={cl('namespace prov-draw', r('ns-engineering') && 'in')} data-prov="ns-engineering" x="100" y="400" width="1240" height="200" rx="6" ry="6" />
            <text className={cl('namespace-label prov-fade', r('ns-engineering-label') && 'in')} data-prov="ns-engineering-label" x="118" y="424">
              <tspan className="key">namespace:</tspan> engineering
            </text>
            <rect className={cl('namespace prov-draw', r('ns-products') && 'in')} data-prov="ns-products" x="100" y="640" width="1240" height="200" rx="6" ry="6" />
            <text className={cl('namespace-label prov-fade', r('ns-products-label') && 'in')} data-prov="ns-products-label" x="118" y="664">
              <tspan className="key">namespace:</tspan> products
            </text>
            <rect className={cl('namespace prov-draw', r('ns-obs') && 'in')} data-prov="ns-obs" x="100" y="880" width="1240" height="180" rx="6" ry="6" />
            <text className={cl('namespace-label prov-fade', r('ns-obs-label') && 'in')} data-prov="ns-obs-label" x="118" y="904">
              <tspan className="key">namespace:</tspan> observability <tspan className="key" dx="6">·</tspan> spans all layers
            </text>
          </g>

          {/* Layer 3 — arrows */}
          <g className="layer-arrows">
            <Arr id="tech-plat"   d="M 620 340 L 300 455" revealedArrows={revealedArrows} activeArrow={activeArrow} setActiveArrow={setActiveArrow} />
            <Arr id="tech-infra"  d="M 720 340 L 720 455" revealedArrows={revealedArrows} activeArrow={activeArrow} setActiveArrow={setActiveArrow} />
            <Arr id="tech-ai"     d="M 820 340 L 1140 455" revealedArrows={revealedArrows} activeArrow={activeArrow} setActiveArrow={setActiveArrow} />
            <Arr id="plat-air"   d="M 300 575 L 300 695" revealedArrows={revealedArrows} activeArrow={activeArrow} setActiveArrow={setActiveArrow} />
            <Arr id="infra-air"  d="M 620 575 L 400 695" revealedArrows={revealedArrows} activeArrow={activeArrow} setActiveArrow={setActiveArrow} />
            <Arr id="ai-dash"    d="M 1080 575 L 880 695" revealedArrows={revealedArrows} activeArrow={activeArrow} setActiveArrow={setActiveArrow} />
            <Arr id="plat-pfa"   d="M 380 575 L 1080 695" revealedArrows={revealedArrows} activeArrow={activeArrow} setActiveArrow={setActiveArrow} dashed />
            <Arr id="ai-comm"    d="M 1140 575 L 1140 935" revealedArrows={revealedArrows} activeArrow={activeArrow} setActiveArrow={setActiveArrow} />
            <Arr id="plat-speak" d="M 460 515 L 500 935"   revealedArrows={revealedArrows} activeArrow={activeArrow} setActiveArrow={setActiveArrow} />
            <Arr id="speak-comm" d="M 640 985 L 800 985"   revealedArrows={revealedArrows} activeArrow={activeArrow} setActiveArrow={setActiveArrow} />
          </g>

          {/* Layer 4 — pulses */}
          <g className="layer-pulses" id="pulses">
            <Pulse arrowId="tech-plat"    dur="2.8s" begin="0.2s" revealedArrows={revealedArrows} />
            <Pulse arrowId="tech-infra"   dur="2.6s" begin="0.6s" revealedArrows={revealedArrows} />
            <Pulse arrowId="tech-ai"      dur="3.0s" begin="0.3s" revealedArrows={revealedArrows} />
            <Pulse arrowId="plat-air"     dur="2.6s" begin="0.8s" revealedArrows={revealedArrows} />
            <Pulse arrowId="infra-air"    dur="3.2s" begin="0.5s" revealedArrows={revealedArrows} />
            <Pulse arrowId="ai-dash"      dur="3.0s" begin="0.9s" revealedArrows={revealedArrows} />
            <Pulse arrowId="plat-pfa"     dur="5.6s" begin="1.2s" revealedArrows={revealedArrows} />
            <Pulse arrowId="ai-comm"      dur="5.0s" begin="0.0s" revealedArrows={revealedArrows} />
            <Pulse arrowId="plat-speak"   dur="4.2s" begin="1.4s" revealedArrows={revealedArrows} />
            <Pulse arrowId="speak-comm"   dur="2.4s" begin="0.7s" revealedArrows={revealedArrows} />
          </g>

          {/* Layer 5 — nodes */}
          <g className="layer-nodes">
            <NodeGrp nodeId="tech-lead" ariaLabel="Tech Leadership node — open details" {...nodeProps}>
              <rect className="node-rect" x="560" y="260" width="320" height="80" rx="5" ry="5" />
              <text className="node-id" x="576" y="282">tech-lead</text>
              <text className="node-title" x="576" y="306">Tech Leadership</text>
              <text className="node-sub" x="576" y="324">Thoughtworks · since 2020</text>
              <NodeStatus nodeId="tech-lead" nodeStatuses={nodeStatuses} cx={860} cy={278} sx={846} sy={282} loading="initializing" ready="running" />
            </NodeGrp>

            <NodeGrp nodeId="platform-eng" ariaLabel="Platform Engineering node — open details" {...nodeProps}>
              <rect className="node-rect" x="140" y="455" width="320" height="120" rx="5" ry="5" />
              <text className="node-id" x="156" y="477">platform-eng</text>
              <text className="node-title" x="156" y="501">Platform Engineering</text>
              <text className="node-sub" x="156" y="521">Internal Developer Platforms</text>
              <text className="node-sub" x="156" y="538">developer experience · cloud-native</text>
              <text className="node-sub" x="156" y="558" fill="var(--text-dim)">▸ talk: "Our adventure in building…"</text>
              <NodeStatus nodeId="platform-eng" nodeStatuses={nodeStatuses} cx={440} cy={473} sx={426} sy={477} loading="deploying" ready="running" />
            </NodeGrp>

            <NodeGrp nodeId="infra-eng" ariaLabel="Infrastructure node — open details" {...nodeProps}>
              <rect className="node-rect" x="560" y="455" width="320" height="120" rx="5" ry="5" />
              <text className="node-id" x="576" y="477">infra-eng</text>
              <text className="node-title" x="576" y="501">Infrastructure</text>
              <text className="node-sub" x="576" y="521">Kubernetes · Terraform · Helm</text>
              <text className="node-sub" x="576" y="538">AWS · Azure · CI/CD · security</text>
              <text className="node-sub" x="576" y="558" fill="var(--text-dim)">▸ legacy modernisation</text>
              <NodeStatus nodeId="infra-eng" nodeStatuses={nodeStatuses} cx={860} cy={473} sx={846} sy={477} loading="provisioning" ready="running" />
            </NodeGrp>

            <NodeGrp nodeId="ai-tooling" ariaLabel="AI and Automation node — open details" {...nodeProps}>
              <rect className="node-rect" x="980" y="455" width="320" height="120" rx="5" ry="5" />
              <text className="node-id" x="996" y="477">ai-tooling</text>
              <text className="node-title" x="996" y="501">AI &amp; Automation</text>
              <text className="node-sub" x="996" y="521">Claude · OpenAI · agentic systems</text>
              <text className="node-sub" x="996" y="538">community lead — TW AI</text>
              <text className="node-sub" x="996" y="558" fill="var(--text-dim)">▸ workflows, tooling integration</text>
              <NodeStatus nodeId="ai-tooling" nodeStatuses={nodeStatuses} cx={1280} cy={473} sx={1266} sy={477} loading="starting" ready="running" />
            </NodeGrp>

            <NodeGrp nodeId="airline" ariaLabel="Airline client deployment — open details" {...nodeProps}>
              <rect className="node-rect" x="140" y="695" width="320" height="120" rx="5" ry="5" />
              <text className="node-id" x="156" y="717">deployment/airline</text>
              <text className="node-title" x="156" y="741">Airline Client</text>
              <text className="node-sub" x="156" y="761">ticketing flexibility · ops</text>
              <text className="node-sub" x="156" y="778">team: 20 memebers (devs · QA · BA · PO · SM)</text>
              <text className="node-sub" x="156" y="798" fill="var(--text-dim)">▸ production · active</text>
              <NodeStatus nodeId="airline" nodeStatuses={nodeStatuses} cx={440} cy={713} sx={426} sy={717} loading="rolling out" ready="active" />
            </NodeGrp>

            <NodeGrp nodeId="dashnote" ariaLabel="AI meeting notes app project — open details" {...nodeProps}>
              <rect className="node-rect" x="560" y="695" width="320" height="120" rx="5" ry="5" />
              <text className="node-id" x="576" y="717">pod/ai-meeting-notes.app</text>
              <text className="node-title" x="576" y="741">AI Meeting Notes App</text>
              <text className="node-sub" x="576" y="761">React Native · Supabase · Whisper</text>
              <text className="node-sub" x="576" y="778">audio → AI meeting notes</text>
              <text className="node-sub" x="576" y="798" fill="var(--text-dim)">▸ solo build · in development</text>
              <NodeStatus nodeId="dashnote" nodeStatuses={nodeStatuses} cx={860} cy={713} sx={846} sy={717} loading="scheduled" ready="building" />
            </NodeGrp>

            <NodeGrp nodeId="donation-app" ariaLabel="Donation App — open details" {...nodeProps}>
              <rect className="node-rect" x="980" y="695" width="320" height="120" rx="5" ry="5" />
              <text className="node-id" x="996" y="717">pod/donation.app</text>
              <text className="node-title" x="996" y="741">Donation App</text>
              <text className="node-sub" x="996" y="761">fundraising · mission project</text>
              <text className="node-sub" x="996" y="778">full-stack web</text>
              <text className="node-sub" x="996" y="798" fill="var(--text-dim)">▸ nonprofit · in development</text>
              <NodeStatus nodeId="donation-app" nodeStatuses={nodeStatuses} cx={1280} cy={713} sx={1266} sy={717} loading="scheduled" ready="building" />
            </NodeGrp>

            <NodeGrp nodeId="community-out" ariaLabel="Community and mentoring — open details" {...nodeProps}>
              <rect className="node-rect" x="800" y="935" width="460" height="100" rx="5" ry="5" />
              <text className="node-id" x="816" y="957">service/community-out</text>
              <text className="node-title" x="816" y="981">Community &amp; Mentoring</text>
              <text className="node-sub" x="816" y="1001">platform-eng lead · ai lead · active mentor</text>
              <text className="node-sub" x="816" y="1019" fill="var(--text-dim)">▸ engineer growth · knowledge transfer</text>
              <NodeStatus nodeId="community-out" nodeStatuses={nodeStatuses} cx={1240} cy={953} sx={1226} sy={957} loading="spinning up" ready="running" />
            </NodeGrp>

            <NodeGrp nodeId="speaking" ariaLabel="Talks and presence — open details" {...nodeProps}>
              <rect className="node-rect" x="180" y="935" width="460" height="100" rx="5" ry="5" />
              <text className="node-id" x="196" y="957">ingress/speaking</text>
              <text className="node-title" x="196" y="981">Talks &amp; Presence</text>
              <text className="node-sub" x="196" y="1001">conference talk · YouTube · LinkedIn</text>
              <text className="node-sub" x="196" y="1019" fill="var(--text-dim)">▸ "Our adventure in building an IDP"</text>
              <NodeStatus nodeId="speaking" nodeStatuses={nodeStatuses} cx={620} cy={953} sx={606} sy={957} loading="pending" ready="available" />
            </NodeGrp>
          </g>

          {/* Layer 7 — arrow labels */}
          <g className="layer-arrow-labels">
            <ArrLabel id="tech-plat"    activeArrow={activeArrow} x={460}  y={402} text="directs" />
            <ArrLabel id="tech-infra"   activeArrow={activeArrow} x={720}  y={402} text="owns" />
            <ArrLabel id="tech-ai"      activeArrow={activeArrow} x={980}  y={402} text="leads" />
            <ArrLabel id="plat-air"     activeArrow={activeArrow} x={300}  y={639} text="deployed to" />
            <ArrLabel id="infra-air"    activeArrow={activeArrow} x={510}  y={639} text="underlies" />
            <ArrLabel id="ai-dash"      activeArrow={activeArrow} x={980}  y={639} text="powers" />
            <ArrLabel id="plat-pfa"     activeArrow={activeArrow} x={730}  y={635} text="supports" />
            <ArrLabel id="ai-comm"      activeArrow={activeArrow} x={1140} y={665} text="drives" />
            <ArrLabel id="plat-speak"   activeArrow={activeArrow} x={450}  y={620} text="informs" anchor="start" />
            <ArrLabel id="speak-comm"   activeArrow={activeArrow} x={720}  y={985} text="amplifies" />
          </g>

          {/* Layer 8 — footer */}
          <g>
            <text className={cl('namespace-label prov-fade', r('footer-1') && 'in')} data-prov="footer-1" x="80" y="1108">
              <tspan className="key">$</tspan> kubectl get all — last reconcile: <tspan fill="var(--text)">just now</tspan>
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

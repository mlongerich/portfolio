const cl = (...parts) => parts.filter(Boolean).join(' ');

function NodeStatus({ nodeId, nodeStatuses, cx, cy, sx, sy, loading, ready, fontSize = undefined }) {
  const state = nodeStatuses[nodeId] || 'loading';
  return (
    <g className="node-status" data-state={state}>
      <circle className="dot-warn warn-pulse" cx={cx} cy={cy} r="2.8" />
      <circle className="dot status-pulse" cx={cx} cy={cy} r="2.8" />
      <text className="loading-txt" x={sx} y={sy} textAnchor="end" fontSize={fontSize}>{loading}</text>
      <text className="ready-txt" x={sx} y={sy} textAnchor="end" fontSize={fontSize}>{ready}</text>
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

function MArr({ id, d, revealedArrows, dashed }) {
  const isRevealed = revealedArrows.has(id);
  return (
    <g className={cl('arr', isRevealed && 'in')} data-arrow={id}>
      <path
        id={`arr-m-${id}`}
        className={cl('arrow-path prov-arrow', isRevealed && 'in')}
        data-prov={`arr-${id}`}
        d={d}
        markerEnd="url(#arrowhead-m)"
        {...(dashed ? { strokeDasharray: '4 3' } : {})}
      />
      <path className="arrow-hit" data-arrow={id} d={d} />
    </g>
  );
}

function MPulse({ arrowId, dur, begin, revealedArrows }) {
  return (
    <circle
      className={cl('pulse-dot-svg', revealedArrows.has(arrowId) && 'live')}
      data-pulse-arrow={arrowId}
      r="2"
    >
      <animateMotion dur={dur} repeatCount="indefinite" begin={begin}>
        <mpath href={`#arr-m-${arrowId}`} />
      </animateMotion>
    </circle>
  );
}

export function DiagramMobile({ revealed, revealedArrows, nodeStatuses, activeNodeId, pinnedNodeId, handlers }) {
  const r = (key) => revealed.has(key);
  const nodeProps = { revealed, nodeStatuses, activeNodeId, pinnedNodeId, handlers };

  return (
    <div className="diagram-mobile">
      <svg
        className="diagram diagram-m"
        viewBox="0 0 400 1130"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Architecture diagram (mobile)"
      >
        <defs>
          <marker id="arrowhead-m" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
          </marker>
        </defs>

        {/* Boundary */}
        <rect className={cl('boundary prov-draw', r('boundary') && 'in')} data-prov="boundary" x="10" y="62" width="380" height="1020" rx="6" />
        <text className={cl('boundary-label prov-fade', r('boundary-label') && 'in')} data-prov="boundary-label" x="18" y="78" fontSize="9">
          <tspan className="punct">// </tspan>system <tspan className="punct">·</tspan> ap-southeast-1
        </text>

        {/* Namespaces */}
        <g className="layer-namespaces">
          <rect className={cl('namespace prov-draw', r('ns-leadership') && 'in')} data-prov="ns-leadership" x="18" y="84" width="364" height="116" rx="5" />
          <text className={cl('namespace-label prov-fade', r('ns-leadership-label') && 'in')} data-prov="ns-leadership-label" x="26" y="98" fontSize="8.5"><tspan className="key">ns:</tspan> leadership</text>

          <rect className={cl('namespace prov-draw', r('ns-engineering') && 'in')} data-prov="ns-engineering" x="18" y="210" width="364" height="312" rx="5" />
          <text className={cl('namespace-label prov-fade', r('ns-engineering-label') && 'in')} data-prov="ns-engineering-label" x="26" y="224" fontSize="8.5"><tspan className="key">ns:</tspan> engineering</text>

          <rect className={cl('namespace prov-draw', r('ns-products') && 'in')} data-prov="ns-products" x="18" y="540" width="364" height="312" rx="5" />
          <text className={cl('namespace-label prov-fade', r('ns-products-label') && 'in')} data-prov="ns-products-label" x="26" y="554" fontSize="8.5"><tspan className="key">ns:</tspan> products</text>

          <rect className={cl('namespace prov-draw', r('ns-obs') && 'in')} data-prov="ns-obs" x="18" y="870" width="364" height="200" rx="5" />
          <text className={cl('namespace-label prov-fade', r('ns-obs-label') && 'in')} data-prov="ns-obs-label" x="26" y="884" fontSize="8.5"><tspan className="key">ns:</tspan> observability</text>
        </g>

        {/* Arrows */}
        <g className="layer-arrows">
          <MArr id="tech-plat"    d="M 200 182 L 200 240" revealedArrows={revealedArrows} />
          <MArr id="tech-infra"   d="M 350 182 C 396 230, 396 290, 350 326" revealedArrows={revealedArrows} />
          <MArr id="tech-ai"      d="M 365 182 C 414 240, 414 380, 365 412" revealedArrows={revealedArrows} />
          <MArr id="plat-air"     d="M 50 312 C 4 390, 4 510, 50 570" revealedArrows={revealedArrows} />
          <MArr id="infra-air"    d="M 70 398 C 22 440, 22 530, 70 570" revealedArrows={revealedArrows} />
          <MArr id="ai-dash"      d="M 350 484 C 396 530, 396 620, 350 656" revealedArrows={revealedArrows} />
          <MArr id="plat-pfa"     d="M 30 312 C -16 460, -16 660, 30 742" revealedArrows={revealedArrows} dashed />
          <MArr id="ai-comm"      d="M 370 484 C 420 620, 420 880, 370 986" revealedArrows={revealedArrows} />
          <MArr id="plat-speak"  d="M 22 312 C -42 500, -42 750, 22 898"  revealedArrows={revealedArrows} />
          <MArr id="speak-comm"  d="M 370 976 C 404 980, 404 982, 370 986" revealedArrows={revealedArrows} />
        </g>

        {/* Pulses */}
        <g className="layer-pulses">
          <MPulse arrowId="tech-plat"    dur="2.8s" begin="0.2s" revealedArrows={revealedArrows} />
          <MPulse arrowId="tech-infra"   dur="2.6s" begin="0.6s" revealedArrows={revealedArrows} />
          <MPulse arrowId="tech-ai"      dur="3.0s" begin="0.3s" revealedArrows={revealedArrows} />
          <MPulse arrowId="plat-air"     dur="2.6s" begin="0.8s" revealedArrows={revealedArrows} />
          <MPulse arrowId="infra-air"    dur="3.2s" begin="0.5s" revealedArrows={revealedArrows} />
          <MPulse arrowId="ai-dash"      dur="3.0s" begin="0.9s" revealedArrows={revealedArrows} />
          <MPulse arrowId="plat-pfa"     dur="5.6s" begin="1.2s" revealedArrows={revealedArrows} />
          <MPulse arrowId="ai-comm"      dur="5.0s" begin="0s"   revealedArrows={revealedArrows} />
          <MPulse arrowId="plat-speak"  dur="4.2s" begin="1.4s" revealedArrows={revealedArrows} />
          <MPulse arrowId="speak-comm"  dur="2.4s" begin="0.7s" revealedArrows={revealedArrows} />
        </g>

        {/* Nodes */}
        <g className="layer-nodes">
          <NodeGrp nodeId="tech-lead" ariaLabel="Tech Leadership" {...nodeProps}>
            <rect className="node-rect" x="24" y="110" width="352" height="72" rx="5" />
            <text className="node-id" x="34" y="128" fontSize="9">tech-lead</text>
            <text className="node-title" x="34" y="148" fontSize="13">Tech Leadership</text>
            <text className="node-sub" x="34" y="166" fontSize="10">Thoughtworks · since 2020</text>
            <NodeStatus nodeId="tech-lead" nodeStatuses={nodeStatuses} cx={366} cy={126} sx={356} sy={129} loading="initializing" ready="running" fontSize="8" />
          </NodeGrp>

          <NodeGrp nodeId="platform-eng" ariaLabel="Platform Engineering" {...nodeProps}>
            <rect className="node-rect" x="24" y="240" width="352" height="72" rx="5" />
            <text className="node-id" x="34" y="258" fontSize="9">platform-eng</text>
            <text className="node-title" x="34" y="278" fontSize="13">Platform Engineering</text>
            <text className="node-sub" x="34" y="296" fontSize="10">IDP · developer experience · cloud-native</text>
            <NodeStatus nodeId="platform-eng" nodeStatuses={nodeStatuses} cx={366} cy={256} sx={356} sy={259} loading="deploying" ready="running" fontSize="8" />
          </NodeGrp>

          <NodeGrp nodeId="infra-eng" ariaLabel="Infrastructure" {...nodeProps}>
            <rect className="node-rect" x="24" y="326" width="352" height="72" rx="5" />
            <text className="node-id" x="34" y="344" fontSize="9">infra-eng</text>
            <text className="node-title" x="34" y="364" fontSize="13">Infrastructure</text>
            <text className="node-sub" x="34" y="382" fontSize="10">Kubernetes · Terraform · AWS · Azure</text>
            <NodeStatus nodeId="infra-eng" nodeStatuses={nodeStatuses} cx={366} cy={342} sx={356} sy={345} loading="provisioning" ready="running" fontSize="8" />
          </NodeGrp>

          <NodeGrp nodeId="ai-tooling" ariaLabel="AI and Automation" {...nodeProps}>
            <rect className="node-rect" x="24" y="412" width="352" height="72" rx="5" />
            <text className="node-id" x="34" y="430" fontSize="9">ai-tooling</text>
            <text className="node-title" x="34" y="450" fontSize="13">AI &amp; Automation</text>
            <text className="node-sub" x="34" y="468" fontSize="10">Claude · OpenAI · agentic systems</text>
            <NodeStatus nodeId="ai-tooling" nodeStatuses={nodeStatuses} cx={366} cy={428} sx={356} sy={431} loading="starting" ready="running" fontSize="8" />
          </NodeGrp>

          <NodeGrp nodeId="airline" ariaLabel="Airline client" {...nodeProps}>
            <rect className="node-rect" x="24" y="570" width="352" height="72" rx="5" />
            <text className="node-id" x="34" y="588" fontSize="9">deployment/airline</text>
            <text className="node-title" x="34" y="608" fontSize="13">Airline Client</text>
            <text className="node-sub" x="34" y="626" fontSize="10">ticketing flexibility · team of 20</text>
            <NodeStatus nodeId="airline" nodeStatuses={nodeStatuses} cx={366} cy={586} sx={356} sy={589} loading="rolling out" ready="active" fontSize="8" />
          </NodeGrp>

          <NodeGrp nodeId="dashnote" ariaLabel="AI Meeting Notes App" {...nodeProps}>
            <rect className="node-rect" x="24" y="656" width="352" height="72" rx="5" />
            <text className="node-id" x="34" y="674" fontSize="9">pod/ai-meeting-notes.app</text>
            <text className="node-title" x="34" y="694" fontSize="13">AI Meeting Notes App</text>
            <text className="node-sub" x="34" y="712" fontSize="10">React Native · Supabase · audio → notes</text>
            <NodeStatus nodeId="dashnote" nodeStatuses={nodeStatuses} cx={366} cy={672} sx={356} sy={675} loading="scheduled" ready="building" fontSize="8" />
          </NodeGrp>

          <NodeGrp nodeId="pfa-app" ariaLabel="Donation App" {...nodeProps}>
            <rect className="node-rect" x="24" y="742" width="352" height="72" rx="5" />
            <text className="node-id" x="34" y="760" fontSize="9">pod/donation.app</text>
            <text className="node-title" x="34" y="780" fontSize="13">Donation App</text>
            <text className="node-sub" x="34" y="798" fontSize="10">fundraising · nonprofit · full-stack web</text>
            <NodeStatus nodeId="pfa-app" nodeStatuses={nodeStatuses} cx={366} cy={758} sx={356} sy={761} loading="scheduled" ready="building" fontSize="8" />
          </NodeGrp>

          <NodeGrp nodeId="speaking" ariaLabel="Talks and presence" {...nodeProps}>
            <rect className="node-rect" x="24" y="898" width="352" height="78" rx="5" />
            <text className="node-id" x="34" y="916" fontSize="9">ingress/speaking</text>
            <text className="node-title" x="34" y="936" fontSize="13">Talks &amp; Presence</text>
            <text className="node-sub" x="34" y="954" fontSize="10">conference talk · YouTube · LinkedIn</text>
            <text className="node-sub" x="34" y="970" fontSize="10" fill="var(--text-dim)">▸ "Our adventure in building an IDP"</text>
            <NodeStatus nodeId="speaking" nodeStatuses={nodeStatuses} cx={366} cy={914} sx={356} sy={917} loading="pending" ready="available" fontSize="8" />
          </NodeGrp>

          <NodeGrp nodeId="community-out" ariaLabel="Community and mentoring" {...nodeProps}>
            <rect className="node-rect" x="24" y="986" width="352" height="78" rx="5" />
            <text className="node-id" x="34" y="1004" fontSize="9">service/community-out</text>
            <text className="node-title" x="34" y="1024" fontSize="13">Community &amp; Mentoring</text>
            <text className="node-sub" x="34" y="1042" fontSize="10">platform-eng lead · ai lead · mentor</text>
            <text className="node-sub" x="34" y="1058" fontSize="10" fill="var(--text-dim)">▸ engineer growth · knowledge transfer</text>
            <NodeStatus nodeId="community-out" nodeStatuses={nodeStatuses} cx={366} cy={1002} sx={356} sy={1005} loading="spinning up" ready="running" fontSize="8" />
          </NodeGrp>
        </g>

        {/* Arrow labels (hidden on mobile via CSS) */}
        <g className="layer-arrow-labels" aria-hidden="true">
          <g className="arrow-label-group" data-arrow="clients-tech"><text className="arrow-label" x="105" y="82" fontSize="9" textAnchor="middle">engage</text></g>
          <g className="arrow-label-group" data-arrow="comm-tech"><text className="arrow-label" x="200" y="82" fontSize="9" textAnchor="middle">audience</text></g>
          <g className="arrow-label-group" data-arrow="tech-plat"><text className="arrow-label" x="210" y="216" fontSize="9" textAnchor="start">directs</text></g>
          <g className="arrow-label-group" data-arrow="tech-infra"><text className="arrow-label" x="396" y="256" fontSize="9" textAnchor="end">owns</text></g>
          <g className="arrow-label-group" data-arrow="tech-ai"><text className="arrow-label" x="414" y="300" fontSize="9" textAnchor="end">leads</text></g>
          <g className="arrow-label-group" data-arrow="plat-air"><text className="arrow-label" x="6" y="440" fontSize="9" textAnchor="start">deploys</text></g>
          <g className="arrow-label-group" data-arrow="infra-air"><text className="arrow-label" x="24" y="490" fontSize="9" textAnchor="start">underlies</text></g>
          <g className="arrow-label-group" data-arrow="ai-dash"><text className="arrow-label" x="394" y="595" fontSize="9" textAnchor="end">powers</text></g>
          <g className="arrow-label-group" data-arrow="plat-pfa"><text className="arrow-label" x="-18" y="550" fontSize="9" textAnchor="start">supports</text></g>
          <g className="arrow-label-group" data-arrow="ai-comm"><text className="arrow-label" x="424" y="740" fontSize="9" textAnchor="end">drives</text></g>
          <g className="arrow-label-group" data-arrow="comm-ment"><text className="arrow-label" x="436" y="540" fontSize="9" textAnchor="end">grows</text></g>
          <g className="arrow-label-group" data-arrow="speak-comm"><text className="arrow-label" x="-32" y="540" fontSize="9" textAnchor="start">amplifies</text></g>
          <g className="arrow-label-group" data-arrow="plat-speak"><text className="arrow-label" x="-42" y="620" fontSize="9" textAnchor="start">informs</text></g>
        </g>

        {/* Footer */}
        <g>
          <text className={cl('namespace-label prov-fade', r('footer-1') && 'in')} data-prov="footer-1" x="20" y="1098" fontSize="8.5">
            <tspan className="key">$</tspan> kubectl get all — <tspan fill="var(--text)">just now</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}

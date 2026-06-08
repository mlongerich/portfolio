import { SectionLabel } from '../common/SectionLabel.jsx';
import { DiagramDesktop } from './DiagramDesktop.jsx';
import { DiagramMobile } from './DiagramMobile.jsx';
import { NodeDetailCard } from './NodeDetailCard.jsx';

import { useProvisioning } from '../../hooks/useProvisioning.js';

export function DiagramSection({ onTalkClick, nodeCard, psRowStatuses }) {
  const { revealed, revealedArrows, nodeStatuses, progressLabel } = useProvisioning();
  const { activeNodeId, pinnedNodeId, activeSource, activeNodeEl, handlers } = nodeCard;

  const diagramProps = { revealed, revealedArrows, nodeStatuses, activeNodeId, pinnedNodeId, handlers };

  return (
    <section className="diagram-section" id="diagram" data-screen-label="02 Architecture">
      <SectionLabel num="02" label="architecture · ./apply --auto-approve" right={progressLabel} />

      <div className="diagram-wrap" id="diagramWrap">
        <DiagramDesktop {...diagramProps} />
        <DiagramMobile {...diagramProps} />

        <NodeDetailCard
          activeNodeId={activeNodeId}
          pinnedNodeId={pinnedNodeId}
          activeNodeEl={activeNodeEl}
          nodeStatuses={nodeStatuses}
          activeSource={activeSource}
          psRowStatuses={psRowStatuses}
          onClose={handlers.dismissCard}
          onOutsideClick={handlers.dismissCard}
          onTalkClick={onTalkClick}
        />
      </div>
    </section>
  );
}

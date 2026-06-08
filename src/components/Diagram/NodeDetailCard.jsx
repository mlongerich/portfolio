import { useEffect, useRef } from 'react';
import { NODE_DATA, TALK_NODES, renderNodeLines } from '../../data/nodeData.js';
import { NODE_STATUSES } from '../../data/diagramData.js';
import { useHoverState } from '../../hooks/useHoverState.js';

const MOBILE_BREAKPOINT = 1280;

function positionCard(card, nodeEl) {
  const rect = nodeEl.getBoundingClientRect();
  const cardW = card.offsetWidth || 360;
  const cardH = card.offsetHeight || 240;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const gap = 12;

  if (vw < MOBILE_BREAKPOINT) {
    const centerX = rect.left + rect.width / 2;
    const left = Math.max(12, Math.min(vw - cardW - 12, centerX - cardW / 2));
    let top = rect.bottom + gap;
    if (top + cardH > vh - 12) top = Math.max(80, rect.top - gap - cardH);
    card.style.left = left + 'px';
    card.style.top = top + 'px';
  } else {
    let left = rect.right + gap;
    if (left + cardW > vw - 12) {
      left = rect.left - gap - cardW;
      if (left < 12) {
        left = Math.max(12, Math.min(vw - cardW - 12, rect.left + rect.width / 2 - cardW / 2));
      }
    }
    let top = rect.top;
    if (top + cardH > vh - 12) top = Math.max(12, vh - cardH - 12);
    if (top < 80) top = 80;
    card.style.left = left + 'px';
    card.style.top = top + 'px';
  }
}

export function NodeDetailCard({ activeNodeId, pinnedNodeId, activeNodeEl, nodeStatuses, activeSource, onClose, onOutsideClick, onTalkClick }) {
  const cardRef = useRef(null);
  const visible = !!activeNodeId;
  const data = visible ? NODE_DATA[activeNodeId] : null;
  const hasTalk = visible && TALK_NODES.has(activeNodeId) && !!onTalkClick;
  const [closeHovered, setCloseHovered] = useHoverState();

  const liveState = visible ? (nodeStatuses?.[activeNodeId] ?? 'loading') : null;
  const statusConfig = visible ? NODE_STATUSES[activeNodeId] : null;

  const statusOverride = statusConfig ? {
    text: liveState === 'ready' ? statusConfig.ready : statusConfig.loading,
    cls: liveState === 'ready' ? 'running' : 'warn',
  } : null;

  useEffect(() => {
    if (visible && activeNodeEl?.current && cardRef.current) {
      requestAnimationFrame(() => {
        if (cardRef.current && activeNodeEl.current) {
          positionCard(cardRef.current, activeNodeEl.current);
        }
      });
    }
  }, [visible, activeNodeId, activeNodeEl]);

  useEffect(() => {
    if (!visible) return;
    const update = () => {
      if (cardRef.current && activeNodeEl?.current) positionCard(cardRef.current, activeNodeEl.current);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [visible, activeNodeEl]);

  useEffect(() => {
    if (!visible) return;
    const handle = (e) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(e.target) &&
        !e.target.closest?.('.node-group') &&
        !e.target.closest?.('.ps-row--link')
      ) {
        onOutsideClick?.();
      }
    };
    document.addEventListener('click', handle);
    return () => document.removeEventListener('click', handle);
  }, [visible, onOutsideClick]);

  useEffect(() => {
    if (!visible) return;
    const handle = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [visible, onClose]);

  useEffect(() => {
    if (!visible || !activeNodeEl?.current) return;
    const el = activeNodeEl.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) onClose?.(); },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, activeNodeId, activeNodeEl, onClose]);

  return (
    <div
      className={`detail-card${visible ? ' visible' : ''}`}
      ref={cardRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="termTitle"
    >
      <div className="term-chrome">
        <span className="dot" aria-hidden="true" />
        <span className="dot" aria-hidden="true" />
        <span className="dot" aria-hidden="true" />
        <span className="term-title" id="termTitle">
          ~/system — {data?.title ?? 'describe'}
        </span>
        <button
          className={`close${closeHovered ? ' hovered' : ''}`}
          id="cardClose"
          aria-label="Close detail"
          onClick={onClose}
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => setCloseHovered(false)}
        >
          ×
        </button>
      </div>
      <pre
        id="termBody"
        dangerouslySetInnerHTML={{ __html: data ? renderNodeLines(data.lines, statusOverride) : '' }}
      />
      {hasTalk && (
        <div className="card-action">
          <button className="card-action-btn" onClick={onTalkClick}>
            ▶ watch talk
          </button>
        </div>
      )}
    </div>
  );
}

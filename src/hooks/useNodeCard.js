import { useState, useRef } from 'react';

export function useNodeCard() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [pinnedNodeId, setPinnedNodeId] = useState(null);
  const [activeSource, setActiveSource] = useState(null);
  const activeNodeElRef = useRef(null);
  // Ref mirrors pinnedNodeId for safe reads inside setTimeout (avoids stale closure)
  const pinnedRef = useRef(null);
  const hideTimerRef = useRef(null);

  function showCard(nodeId, nodeEl) {
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
    activeNodeElRef.current = nodeEl;
    setActiveNodeId(nodeId);
  }

  function hideCard(nodeId) {
    if (pinnedRef.current) return;
    hideTimerRef.current = setTimeout(() => {
      hideTimerRef.current = null;
      if (pinnedRef.current) return;
      setActiveNodeId((prev) => {
        if (prev === nodeId) {
          activeNodeElRef.current = null;
          return null;
        }
        return prev;
      });
    }, 80);
  }

  function pinCard(nodeId, nodeEl, source = 'diagram') {
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
    if (pinnedRef.current === nodeId) {
      pinnedRef.current = null;
      setPinnedNodeId(null);
      setActiveNodeId(null);
      setActiveSource(null);
      activeNodeElRef.current = null;
    } else {
      pinnedRef.current = nodeId;
      setPinnedNodeId(nodeId);
      activeNodeElRef.current = nodeEl;
      setActiveNodeId(nodeId);
      setActiveSource(source);
    }
  }

  function dismissCard() {
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
    pinnedRef.current = null;
    setPinnedNodeId(null);
    setActiveNodeId(null);
    setActiveSource(null);
    activeNodeElRef.current = null;
  }

  return {
    activeNodeId,
    pinnedNodeId,
    activeSource,
    activeNodeEl: activeNodeElRef,
    handlers: { showCard, hideCard, pinCard, dismissCard },
  };
}

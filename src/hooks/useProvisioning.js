import { useState, useEffect, useRef, useCallback } from 'react';
import {
  REVEAL_ORDER, ARROW_ENDPOINTS, LARGE_KEYS, REVEAL_STAGGER, TOTAL,
} from '../data/diagramData.js';

function elementsFor(key) {
  return Array.from(document.querySelectorAll(`[data-prov="${key}"]`));
}

function visibleElementFor(key) {
  const all = elementsFor(key);
  return all.find((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 || r.height > 0;
  }) || all[0];
}

function shouldReveal(key) {
  const el = visibleElementFor(key);
  if (!el) return false;
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  if (LARGE_KEYS.has(key)) return r.top <= vh - 100;
  return r.bottom <= vh - 10;
}

export function useProvisioning() {
  const revealedRef = useRef(new Set());
  const revealedArrowsRef = useRef(new Set());
  const pendingRef = useRef([]);
  const pendingSetRef = useRef(new Set());
  const drainingRef = useRef(false);

  const [revealed, setRevealed] = useState(new Set());
  const [revealedArrows, setRevealedArrows] = useState(new Set());
  const [nodeStatuses, setNodeStatuses] = useState({});
  const [progressCount, setProgressCount] = useState(0);

  const revealKey = useCallback((key) => {
    if (revealedRef.current.has(key)) return;
    revealedRef.current.add(key);
    setRevealed(new Set(revealedRef.current));
    setProgressCount(revealedRef.current.size + revealedArrowsRef.current.size);

    if (key.startsWith('node-')) {
      const nodeId = key.slice(5);
      const delay = 1000 + Math.random() * 2000;
      setTimeout(() => {
        setNodeStatuses((prev) => ({ ...prev, [nodeId]: 'ready' }));
      }, delay);
    }

    for (const [arrow, [a, b]] of Object.entries(ARROW_ENDPOINTS)) {
      if (revealedArrowsRef.current.has(arrow)) continue;
      if (revealedRef.current.has(a) && revealedRef.current.has(b)) {
        revealedArrowsRef.current.add(arrow);
        setRevealedArrows(new Set(revealedArrowsRef.current));
        setProgressCount(revealedRef.current.size + revealedArrowsRef.current.size);
      }
    }
  }, []);

  const drain = useCallback(() => {
    if (drainingRef.current) return;
    drainingRef.current = true;
    const step = () => {
      const next = pendingRef.current.shift();
      if (!next) { drainingRef.current = false; return; }
      pendingSetRef.current.delete(next);
      revealKey(next);
      setTimeout(step, REVEAL_STAGGER);
    };
    step();
  }, [revealKey]);

  const enqueueEligible = useCallback(() => {
    for (const key of REVEAL_ORDER) {
      if (revealedRef.current.has(key) || pendingSetRef.current.has(key)) continue;
      if (shouldReveal(key)) {
        pendingRef.current.push(key);
        pendingSetRef.current.add(key);
      } else {
        break;
      }
    }
    drain();
  }, [drain]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      REVEAL_ORDER.forEach(revealKey);
      return;
    }

    let rafQueued = false;
    const onScroll = () => {
      if (rafQueued) return;
      rafQueued = true;
      requestAnimationFrame(() => {
        rafQueued = false;
        enqueueEligible();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enqueueEligible, revealKey]);

  useEffect(() => {
    document.querySelectorAll('.prov-draw, .prov-arrow').forEach((el) => {
      let len = 800;
      try { if (el.getTotalLength) len = el.getTotalLength(); } catch (_) {}
      el.style.setProperty('--len', Math.ceil(len));
    });
  }, []);

  const progress = Math.round((progressCount / TOTAL) * 100);
  const progressLabel =
    progressCount === 0
      ? 'apply 00% · waiting · scroll to provision'
      : `apply ${String(progress).padStart(2, '0')}% · ${progressCount}/${TOTAL} resources`;

  return { revealed, revealedArrows, nodeStatuses, progress, progressLabel };
}

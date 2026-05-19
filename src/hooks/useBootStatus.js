import { useState, useEffect } from 'react';

export function useBootStatus(finalStatus, finalLabel, bootLabel = 'booting') {
  const [state, setState] = useState({ status: 'boot', label: bootLabel });
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) { setState({ status: finalStatus, label: finalLabel }); return; }
    const delay = 1000 + Math.random() * 2000;
    const t = setTimeout(() => setState({ status: finalStatus, label: finalLabel }), delay);
    return () => clearTimeout(t);
  }, [finalStatus, finalLabel]);
  return state;
}

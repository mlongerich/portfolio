import { useEffect } from 'react';

export function refreshHoverState() {
  document.body.style.pointerEvents = 'none';
  requestAnimationFrame(() => {
    document.body.style.pointerEvents = '';
    window.dispatchEvent(new CustomEvent('portfoliohoverreset'));
  });
}

export function useHoverRefresh() {
  useEffect(() => {
    const handle = () => {
      if (!document.hidden) refreshHoverState();
    };
    document.addEventListener('visibilitychange', handle);
    return () => document.removeEventListener('visibilitychange', handle);
  }, []);
}

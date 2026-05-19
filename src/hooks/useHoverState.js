import { useState, useEffect } from 'react';

export function useHoverState(initial = false) {
  const [hovered, setHovered] = useState(initial);
  useEffect(() => {
    const reset = () => setHovered(false);
    window.addEventListener('portfoliohoverreset', reset);
    return () => window.removeEventListener('portfoliohoverreset', reset);
  }, []);
  return [hovered, setHovered];
}

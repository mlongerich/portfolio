import { useState, useEffect } from 'react';

export function useScrollState(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, [threshold]);

  return scrolled;
}

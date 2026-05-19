import { useState, useEffect, useRef } from 'react';

const LOADING_WORDS = ['initializing', 'deploying', 'provisioning', 'starting', 'rolling out', 'spinning up'];

export function useBootSequence() {
  const [heroWord] = useState(() => LOADING_WORDS[Math.floor(Math.random() * LOADING_WORDS.length)]);
  const [heroReady, setHeroReady] = useState(false);
  const [bootReady, setBootReady] = useState(false);
  const [footerReady, setFooterReady] = useState(false);
  const footerRef = useRef(null);

  // Trigger hero stagger animation shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setBootReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Show one random loading word, then flip to ready
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) { setHeroReady(true); return; }
    const delay = 1000 + Math.random() * 2000;
    const t = setTimeout(() => setHeroReady(true), delay);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      const delay = 1000 + Math.random() * 2000;
      setTimeout(() => setFooterReady(true), delay);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) { settle(); io.disconnect(); } },
        { threshold: 0.5 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        settle();
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { heroWord, heroReady, bootReady, footerReady, footerRef };
}

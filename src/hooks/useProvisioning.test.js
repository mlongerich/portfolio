import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { REVEAL_ORDER, ARROW_ENDPOINTS, LARGE_KEYS, TOTAL } from '../data/diagramData.js';
import { useProvisioning } from './useProvisioning.js';

describe('diagramData constants', () => {
  test('TOTAL equals REVEAL_ORDER + ARROW_ENDPOINTS count', () => {
    expect(TOTAL).toBe(REVEAL_ORDER.length + Object.keys(ARROW_ENDPOINTS).length);
  });

  test('REVEAL_ORDER starts with boundary', () => {
    expect(REVEAL_ORDER[0]).toBe('boundary');
  });

  test('REVEAL_ORDER has no duplicates', () => {
    expect(new Set(REVEAL_ORDER).size).toBe(REVEAL_ORDER.length);
  });

  test('every arrow has exactly 2 endpoints', () => {
    for (const endpoints of Object.values(ARROW_ENDPOINTS)) {
      expect(endpoints).toHaveLength(2);
    }
  });

  test('every arrow endpoint exists in REVEAL_ORDER or is an actor key', () => {
    const valid = (k) => REVEAL_ORDER.includes(k) || k.startsWith('actor-');
    for (const [a, b] of Object.values(ARROW_ENDPOINTS)) {
      expect(valid(a)).toBe(true);
      expect(valid(b)).toBe(true);
    }
  });

  test('LARGE_KEYS are all in REVEAL_ORDER', () => {
    for (const k of LARGE_KEYS) {
      expect(REVEAL_ORDER).toContain(k);
    }
  });
});

describe('useProvisioning — prefers-reduced-motion', () => {
  beforeEach(() => {
    window.matchMedia = (q) => ({
      matches: q === '(prefers-reduced-motion: reduce)',
      media: q,
      addListener: jest.fn(), removeListener: jest.fn(),
      addEventListener: jest.fn(), removeEventListener: jest.fn(),
    });
    REVEAL_ORDER.forEach((key) => {
      const el = document.createElement('rect');
      el.setAttribute('data-prov', key);
      el.getBoundingClientRect = () => ({ top: 0, bottom: 100, left: 0, right: 100, width: 100, height: 100 });
      document.body.appendChild(el);
    });
  });

  afterEach(() => {
    document.querySelectorAll('[data-prov]').forEach((el) => el.remove());
    window.matchMedia = (q) => ({
      matches: false, media: q,
      addListener: jest.fn(), removeListener: jest.fn(),
      addEventListener: jest.fn(), removeEventListener: jest.fn(),
    });
  });

  test('reveals all items immediately under reduced-motion', () => {
    const { result } = renderHook(() => useProvisioning());
    expect(result.current.revealed.size).toBe(REVEAL_ORDER.length);
  });

  test('progress label shows percentage', () => {
    const { result } = renderHook(() => useProvisioning());
    expect(result.current.progressLabel).toMatch(/apply \d+%/);
  });

  test('nodeStatuses initially all loading', () => {
    const { result } = renderHook(() => useProvisioning());
    expect(Object.keys(result.current.nodeStatuses)).toHaveLength(0);
  });
});

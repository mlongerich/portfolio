import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme.js';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

describe('useTheme', () => {
  test('defaults to dark when no localStorage and no system preference', () => {
    window.matchMedia = (q) => ({ matches: false, media: q, addListener: jest.fn(), removeListener: jest.fn(), addEventListener: jest.fn(), removeEventListener: jest.fn() });
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });

  test('reads dark from localStorage over system preference', () => {
    localStorage.setItem('theme', 'dark');
    window.matchMedia = (q) => ({ matches: true, media: q, addListener: jest.fn(), removeListener: jest.fn(), addEventListener: jest.fn(), removeEventListener: jest.fn() });
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  test('reads light from localStorage', () => {
    localStorage.setItem('theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });

  test('respects system dark preference when no localStorage', () => {
    window.matchMedia = (q) => ({
      matches: q === '(prefers-color-scheme: dark)',
      media: q, addListener: jest.fn(), removeListener: jest.fn(), addEventListener: jest.fn(), removeEventListener: jest.fn(),
    });
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  test('toggleTheme switches dark to light', () => {
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('light');
  });

  test('toggleTheme switches light to dark', () => {
    localStorage.setItem('theme', 'light');
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('dark');
  });

  test('toggleTheme persists new theme to localStorage', () => {
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggleTheme());
    expect(localStorage.getItem('theme')).toBe('light');
  });

  test('sets data-theme on documentElement', () => {
    localStorage.setItem('theme', 'dark');
    renderHook(() => useTheme());
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

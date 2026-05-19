import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useHoverState } from './useHoverState.js';

describe('useHoverState', () => {
  test('starts false by default', () => {
    const { result } = renderHook(() => useHoverState());
    expect(result.current[0]).toBe(false);
  });

  test('starts with provided initial value', () => {
    const { result } = renderHook(() => useHoverState(true));
    expect(result.current[0]).toBe(true);
  });

  test('setter updates to true', () => {
    const { result } = renderHook(() => useHoverState());
    act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);
  });

  test('setter updates to false', () => {
    const { result } = renderHook(() => useHoverState(true));
    act(() => result.current[1](false));
    expect(result.current[0]).toBe(false);
  });

  test('resets to false on portfoliohoverreset event', () => {
    const { result } = renderHook(() => useHoverState());
    act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);
    act(() => { window.dispatchEvent(new CustomEvent('portfoliohoverreset')); });
    expect(result.current[0]).toBe(false);
  });

  test('cleans up listener on unmount', () => {
    const { result, unmount } = renderHook(() => useHoverState());
    act(() => result.current[1](true));
    unmount();
    // dispatching after unmount should not throw
    expect(() => {
      window.dispatchEvent(new CustomEvent('portfoliohoverreset'));
    }).not.toThrow();
  });
});

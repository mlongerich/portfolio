import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useNodeCard } from './useNodeCard.js';

const fakeEl = () => ({ getBoundingClientRect: () => ({ top: 100, bottom: 200, left: 100, right: 300, width: 200, height: 100 }) });

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe('useNodeCard', () => {
  test('starts with no active node', () => {
    const { result } = renderHook(() => useNodeCard());
    expect(result.current.activeNodeId).toBeNull();
    expect(result.current.pinnedNodeId).toBeNull();
  });

  test('showCard sets activeNodeId', () => {
    const { result } = renderHook(() => useNodeCard());
    act(() => result.current.handlers.showCard('tech-lead', fakeEl()));
    expect(result.current.activeNodeId).toBe('tech-lead');
  });

  test('hideCard clears activeNodeId when not pinned', () => {
    const { result } = renderHook(() => useNodeCard());
    act(() => result.current.handlers.showCard('tech-lead', fakeEl()));
    act(() => result.current.handlers.hideCard('tech-lead'));
    act(() => jest.runAllTimers());
    expect(result.current.activeNodeId).toBeNull();
  });

  test('hideCard does NOT clear when pinned', () => {
    const { result } = renderHook(() => useNodeCard());
    act(() => result.current.handlers.pinCard('tech-lead', fakeEl()));
    act(() => result.current.handlers.hideCard('tech-lead'));
    act(() => jest.runAllTimers());
    expect(result.current.activeNodeId).toBe('tech-lead');
  });

  test('hideCard does NOT clear a different active node (race condition guard)', () => {
    const { result } = renderHook(() => useNodeCard());
    act(() => result.current.handlers.showCard('tech-lead', fakeEl()));
    act(() => result.current.handlers.showCard('airline', fakeEl()));
    act(() => result.current.handlers.hideCard('tech-lead'));
    act(() => jest.runAllTimers());
    expect(result.current.activeNodeId).toBe('airline');
  });

  test('showCard cancels a pending hideCard', () => {
    const { result } = renderHook(() => useNodeCard());
    act(() => result.current.handlers.showCard('tech-lead', fakeEl()));
    act(() => result.current.handlers.hideCard('tech-lead'));
    act(() => result.current.handlers.showCard('airline', fakeEl()));
    act(() => jest.runAllTimers());
    expect(result.current.activeNodeId).toBe('airline');
  });

  test('pinCard sets pinnedNodeId and activeNodeId', () => {
    const { result } = renderHook(() => useNodeCard());
    act(() => result.current.handlers.pinCard('platform-eng', fakeEl()));
    expect(result.current.pinnedNodeId).toBe('platform-eng');
    expect(result.current.activeNodeId).toBe('platform-eng');
  });

  test('pinCard on already-pinned node unpins and clears', () => {
    const { result } = renderHook(() => useNodeCard());
    const el = fakeEl();
    act(() => result.current.handlers.pinCard('airline', el));
    act(() => result.current.handlers.pinCard('airline', el));
    expect(result.current.pinnedNodeId).toBeNull();
    expect(result.current.activeNodeId).toBeNull();
  });

  test('dismissCard clears pinned and active', () => {
    const { result } = renderHook(() => useNodeCard());
    act(() => result.current.handlers.pinCard('dashnote', fakeEl()));
    act(() => result.current.handlers.dismissCard());
    expect(result.current.pinnedNodeId).toBeNull();
    expect(result.current.activeNodeId).toBeNull();
  });

  test('showCard does not override a different pinned node', () => {
    const { result } = renderHook(() => useNodeCard());
    act(() => result.current.handlers.pinCard('tech-lead', fakeEl()));
    act(() => result.current.handlers.showCard('airline', fakeEl()));
    expect(result.current.activeNodeId).toBe('airline');
  });
});

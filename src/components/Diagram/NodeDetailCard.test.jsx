import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useRef } from 'react';
import { NodeDetailCard } from './NodeDetailCard.jsx';

function Harness({ activeNodeId, pinnedNodeId, onClose = jest.fn(), onOutsideClick = jest.fn() }) {
  const elRef = useRef(null);
  return (
    <div>
      <div ref={elRef} style={{ position: 'absolute', top: 100, left: 100, width: 200, height: 80 }} />
      <NodeDetailCard
        activeNodeId={activeNodeId}
        pinnedNodeId={pinnedNodeId}
        activeNodeEl={elRef}
        onClose={onClose}
        onOutsideClick={onOutsideClick}
      />
    </div>
  );
}

describe('NodeDetailCard', () => {
  test('hidden when activeNodeId is null', () => {
    render(<Harness activeNodeId={null} pinnedNodeId={null} />);
    const card = document.querySelector('.detail-card');
    expect(card).not.toHaveClass('visible');
  });

  test('visible when activeNodeId is set', () => {
    render(<Harness activeNodeId="tech-lead" pinnedNodeId={null} />);
    expect(document.querySelector('.detail-card')).toHaveClass('visible');
  });

  test('renders node title in terminal chrome', () => {
    render(<Harness activeNodeId="tech-lead" pinnedNodeId={null} />);
    expect(document.getElementById('termTitle').textContent).toMatch('describe deployment/tech-lead');
  });

  test('renders node content in pre block', () => {
    render(<Harness activeNodeId="tech-lead" pinnedNodeId={null} />);
    expect(document.getElementById('termBody').innerHTML).toContain('Tech Lead');
  });

  test('close button calls onClose', () => {
    const onClose = jest.fn();
    render(<Harness activeNodeId="platform-eng" pinnedNodeId="platform-eng" onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close detail/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('close button gains hovered class on mouseenter', () => {
    render(<Harness activeNodeId="airline" pinnedNodeId={null} />);
    const btn = screen.getByRole('button', { name: /close detail/i });
    fireEvent.mouseEnter(btn);
    expect(btn).toHaveClass('hovered');
  });

  test('close button loses hovered class on mouseleave', () => {
    render(<Harness activeNodeId="airline" pinnedNodeId={null} />);
    const btn = screen.getByRole('button', { name: /close detail/i });
    fireEvent.mouseEnter(btn);
    fireEvent.mouseLeave(btn);
    expect(btn).not.toHaveClass('hovered');
  });

  test('close button resets hovered class on portfoliohoverreset', () => {
    render(<Harness activeNodeId="airline" pinnedNodeId={null} />);
    const btn = screen.getByRole('button', { name: /close detail/i });
    fireEvent.mouseEnter(btn);
    expect(btn).toHaveClass('hovered');
    act(() => { window.dispatchEvent(new CustomEvent('portfoliohoverreset')); });
    expect(btn).not.toHaveClass('hovered');
  });

  test('renders correct data for ai-tooling', () => {
    render(<Harness activeNodeId="ai-tooling" pinnedNodeId={null} />);
    expect(document.getElementById('termBody').innerHTML).toContain('AI &amp; Automation');
  });

  test('Escape key calls onClose', () => {
    const onClose = jest.fn();
    render(<Harness activeNodeId="tech-lead" pinnedNodeId={null} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('onOutsideClick called when clicking outside card and nodes', () => {
    const onOutsideClick = jest.fn();
    render(
      <div>
        <Harness activeNodeId="dashnote" pinnedNodeId={null} onOutsideClick={onOutsideClick} />
        <button id="outside">outside</button>
      </div>
    );
    fireEvent.click(document.getElementById('outside'));
    expect(onOutsideClick).toHaveBeenCalled();
  });

  test('dialog has aria-labelledby pointing to termTitle', () => {
    render(<Harness activeNodeId="tech-lead" pinnedNodeId={null} />);
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).toHaveAttribute('aria-labelledby', 'termTitle');
  });
});

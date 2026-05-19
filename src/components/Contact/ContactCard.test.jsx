import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ContactCard } from './ContactCard.jsx';

const defaults = { label: 'github', href: 'https://github.com/mlongerich', value: '@mlongerich', external: true };

describe('ContactCard', () => {
  test('renders label', () => {
    render(<ContactCard {...defaults} />);
    expect(screen.getByText('github')).toBeInTheDocument();
  });

  test('renders value', () => {
    render(<ContactCard {...defaults} />);
    expect(screen.getByText('@mlongerich')).toBeInTheDocument();
  });

  test('renders as anchor with correct href', () => {
    render(<ContactCard {...defaults} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/mlongerich');
  });

  test('external cards have target=_blank', () => {
    render(<ContactCard {...defaults} />);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  test('non-external cards do not have target', () => {
    render(<ContactCard {...defaults} external={false} />);
    expect(screen.getByRole('link')).not.toHaveAttribute('target');
  });

  test('gains hovered class on mouseenter', () => {
    render(<ContactCard {...defaults} />);
    const card = screen.getByRole('link');
    fireEvent.mouseEnter(card);
    expect(card).toHaveClass('hovered');
  });

  test('loses hovered class on mouseleave', () => {
    render(<ContactCard {...defaults} />);
    const card = screen.getByRole('link');
    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    expect(card).not.toHaveClass('hovered');
  });

  test('starts without hovered class', () => {
    render(<ContactCard {...defaults} />);
    expect(screen.getByRole('link')).not.toHaveClass('hovered');
  });

  test('resets hovered class on portfoliohoverreset event', () => {
    render(<ContactCard {...defaults} />);
    const card = screen.getByRole('link');
    fireEvent.mouseEnter(card);
    expect(card).toHaveClass('hovered');
    act(() => { window.dispatchEvent(new CustomEvent('portfoliohoverreset')); });
    expect(card).not.toHaveClass('hovered');
  });
});

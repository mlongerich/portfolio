import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Header } from './Header.jsx';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

describe('Header', () => {
  test('renders brand', () => {
    render(<Header />);
    expect(screen.getByText(/michael.longerich/)).toBeInTheDocument();
  });

  test('renders theme toggle button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /toggle color theme/i })).toBeInTheDocument();
  });

  test('theme toggle flips data-theme', () => {
    localStorage.setItem('theme', 'dark');
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: /toggle color theme/i }));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  test('header does not have scrolled class initially', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).not.toHaveClass('scrolled');
  });

  test('header gains scrolled class on scroll', () => {
    render(<Header />);
    Object.defineProperty(window, 'scrollY', { writable: true, value: 20 });
    fireEvent.scroll(window);
    expect(screen.getByRole('banner')).toHaveClass('scrolled');
  });

  test('nav links have hovered class on mouseenter', () => {
    render(<Header />);
    const link = screen.getByText('/diagram');
    fireEvent.mouseEnter(link);
    expect(link).toHaveClass('hovered');
  });

  test('nav links lose hovered class on mouseleave', () => {
    render(<Header />);
    const link = screen.getByText('/about');
    fireEvent.mouseEnter(link);
    fireEvent.mouseLeave(link);
    expect(link).not.toHaveClass('hovered');
  });

  test('theme toggle gains hovered class on mouseenter', () => {
    render(<Header />);
    const btn = screen.getByRole('button', { name: /toggle color theme/i });
    fireEvent.mouseEnter(btn);
    expect(btn).toHaveClass('hovered');
  });

  test('nav link resets hovered class on portfoliohoverreset', () => {
    render(<Header />);
    const link = screen.getByText('/diagram');
    fireEvent.mouseEnter(link);
    expect(link).toHaveClass('hovered');
    act(() => { window.dispatchEvent(new CustomEvent('portfoliohoverreset')); });
    expect(link).not.toHaveClass('hovered');
  });

  test('theme toggle resets hovered class on portfoliohoverreset', () => {
    render(<Header />);
    const btn = screen.getByRole('button', { name: /toggle color theme/i });
    fireEvent.mouseEnter(btn);
    act(() => { window.dispatchEvent(new CustomEvent('portfoliohoverreset')); });
    expect(btn).not.toHaveClass('hovered');
  });
});

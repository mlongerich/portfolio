import { useHoverState } from '../../hooks/useHoverState.js';
import { useTheme } from '../../hooks/useTheme.js';
import { useScrollState } from '../../hooks/useScrollState.js';

function MoonIcon() {
  return (
    <svg className="moon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11.5 9.5A4.5 4.5 0 0 1 6.5 4.5c0-.5.1-1 .25-1.4A5.5 5.5 0 1 0 13 9.2c-.45.2-.95.3-1.5.3Z" fill="currentColor" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="sun" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M8 1.5v1.8" /><path d="M8 12.7v1.8" />
        <path d="M1.5 8h1.8" /><path d="M12.7 8h1.8" />
        <path d="M3.4 3.4l1.3 1.3" /><path d="M11.3 11.3l1.3 1.3" />
        <path d="M3.4 12.6l1.3-1.3" /><path d="M11.3 4.7l1.3-1.3" />
      </g>
    </svg>
  );
}

export function Header() {
  const { toggleTheme } = useTheme();
  const scrolled = useScrollState(8);
  const [toggleHovered, setToggleHovered] = useHoverState();

  return (
    <header className={`site${scrolled ? ' scrolled' : ''}`} id="siteHeader">
      <a className="skip-nav" href="#diagram">Skip to main content</a>
      <a
        className="brand"
        href="/"
        aria-label="Back to top"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      >
        michael.longerich<span className="slash"> // </span>
        <span className="role">tech lead · platform engineer</span>
      </a>
      <nav className="anchors" aria-label="Page sections">
        <NavLink href="#diagram">/diagram</NavLink>
        <NavLink href="#contact">/contact</NavLink>
      </nav>
      <button
        className={`theme-toggle${toggleHovered ? ' hovered' : ''}`}
        id="themeToggle"
        aria-label="Toggle color theme"
        onClick={toggleTheme}
        onMouseEnter={() => setToggleHovered(true)}
        onMouseLeave={() => setToggleHovered(false)}
      >
        <MoonIcon />
        <SunIcon />
        <span>theme</span>
      </button>
    </header>
  );
}

function NavLink({ href, children }) {
  const [hovered, setHovered] = useHoverState();
  return (
    <a
      href={href}
      className={hovered ? 'hovered' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

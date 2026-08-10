import { useState } from 'react';
import Mark from './Mark';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#approach', label: 'Approach' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="navbar">
        <a className="brand" href="#top">
          <Mark />
          <span>
            FUSION<span className="x">X</span>
          </span>
        </a>
        <input
          type="checkbox"
          id="nav-toggle"
          className="nav-toggle-input"
          checked={open}
          onChange={(e) => setOpen(e.target.checked)}
        />
        <nav>
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-right">
          <a className="btn btn-primary" href="#contact">
            Start a Conversation
          </a>
          <label className="nav-toggle-label" htmlFor="nav-toggle">
            <span></span>
          </label>
        </div>
      </div>
    </header>
  );
}

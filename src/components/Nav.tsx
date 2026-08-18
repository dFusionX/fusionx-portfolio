import { useState } from 'react';
import Mark from './Mark';
import { trackCta } from '../lib/analytics';

// "Assessment" is promoted into the nav because it's the strongest conversion mechanism on
// the site. "Approach" comes out to keep the list at five — it's a scroll destination, not
// something anyone navigates to deliberately, and the footer still links to it.
const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#assessment', label: 'Assessment' },
  { href: '#work', label: 'Work' },
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
          <a
            className="btn btn-primary nav-cta"
            href="#contact"
            onClick={() => trackCta('Talk to an Engineer', 'nav')}
          >
            Talk to an Engineer
          </a>
          <label className="nav-toggle-label" htmlFor="nav-toggle">
            <span></span>
          </label>
        </div>
      </div>
    </header>
  );
}

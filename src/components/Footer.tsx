import Mark from './Mark';
import { site, waLink } from '../site.config';
import { trackContactClick } from '../lib/analytics';

export default function Footer() {
  const wa = waLink();

  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a className="brand" href="/">
              <Mark />
              <span>
                FUSION<span className="x">X</span>
              </span>
            </a>
            <p>Software engineering for real business problems.</p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {/* Homepage-qualified (/#x, not #x) — this footer is also reused on the
                  landing pages, which don't have these sections on their own page. */}
              <li><a href="/#services">Custom Software</a></li>
              <li><a href="/#services">Optimization</a></li>
              <li><a href="/#services">Modernization &amp; Rebuilds</a></li>
              <li><a href="/#services">Data Migration</a></li>
              <li><a href="/#assessment">Technical Assessment</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/#about">About</a></li>
              <li><a href="/#work">Our Work</a></li>
              <li><a href="/#approach">Approach</a></li>
              <li><a href="/#faq">Questions</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              {/* Plain mailto, not obfuscated — some visitors would rather email than fill in a form. */}
              <li>
                <a href={`mailto:${site.email}`} onClick={() => trackContactClick('email')}>
                  {site.email}
                </a>
              </li>
              {site.phone && (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}
                    onClick={() => trackContactClick('phone')}
                  >
                    {site.phone}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick('whatsapp')}>
                    WhatsApp
                  </a>
                </li>
              )}
              {/* Rendered only when a real URL exists. A dead href="#" reads as an unfinished site. */}
              {site.linkedin && (
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} FusionX. All rights reserved.</span>
          <span>Build · Improve · Modernize · Migrate · Maintain</span>
        </div>
      </div>
    </footer>
  );
}

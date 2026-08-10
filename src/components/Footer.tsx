import Mark from './Mark';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a className="brand" href="#top">
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
              <li><a href="#services">Custom Software</a></li>
              <li><a href="#services">Optimization</a></li>
              <li><a href="#services">Modernization</a></li>
              <li><a href="#services">Data Migration</a></li>
              <li><a href="#assessment">Technical Assessment</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#work">Our Work</a></li>
              <li><a href="#approach">Approach</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@fusionx.tech">hello@fusionx.tech</a></li>
              <li><a href="#">LinkedIn</a></li>
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

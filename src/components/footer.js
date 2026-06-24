import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '../siteConfig';

const ELSEWHERE = [
  { name: 'Substack', url: siteConfig.links.substack },
  { name: 'X / Twitter', url: siteConfig.links.x },
  { name: 'LinkedIn', url: siteConfig.links.linkedin },
  { name: 'GitHub', url: siteConfig.links.github },
];

const PAGES = [
  { name: 'Essays', to: '/blog' },
  { name: 'Work', to: '/projects' },
  { name: 'Reading', to: '/books' },
  { name: 'Life List', to: '/bucketlist' },
  { name: 'Research', to: '/research' },
  { name: 'Contact', to: '/talk' },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="col">
        <div className="footer-top">
          <div>
            <div className="footer-mark">
              {siteConfig.firstName} <em>{siteConfig.lastName}</em>
            </div>
            <p className="prose-s" style={{ marginTop: 16, maxWidth: '36ch' }}>
              {siteConfig.footerNote}
            </p>
          </div>
          <div className="footer-col">
            <h4>Pages</h4>
            <ul>
              {PAGES.map((p) => (
                <li key={p.to}>
                  <Link to={p.to}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Elsewhere</h4>
            <ul>
              {ELSEWHERE.map((l) => (
                <li key={l.name}>
                  <a href={l.url} target="_blank" rel="noreferrer">{l.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {siteConfig.fullName}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

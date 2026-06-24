import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import siteConfig from '../../siteConfig';

gsap.registerPlugin(ScrollTrigger);

const papers = [
  {
    title: 'Real Time Sign Language Detection',
    link: 'https://ieeexplore.ieee.org/document/10467736',
    year: '2025',
    venue: 'IEEE',
  },
];

const conferences = [
  'International Conference on Artificial Intelligence, Computer, Data Sciences and Applications (ACDSA) — Full Paper',
];

const links = [
  // { title: 'Research Resume', link: siteConfig.links.researchResume },
  { title: 'Google Scholar', link: siteConfig.links.googleScholar },
  // { title: 'ResearchGate', link: siteConfig.links.researchGate },
  // { title: 'Published Datasets', link: siteConfig.links.datasets },
];

const Research = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const head = rootRef.current.querySelectorAll('.page-head > *');
      gsap.from(head, {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      });

      rootRef.current.querySelectorAll('[data-reveal-section]').forEach((section) => {
        const items = section.querySelectorAll('[data-reveal-item]');
        gsap.set(items, { opacity: 0, y: 18 });
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () =>
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.06,
            }),
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <div className="col">
        <div className="page-head">
          <div className="page-meta">
            <span className="smallcaps mark">Section · Research</span>
            <span className="bar" />
            <span className="smallcaps">Archive · edit me</span>
          </div>
          <h1 className="page-title">
            Notes from <em>research.</em>
          </h1>
          <p className="page-intro">
            I think about AI the way some people think about infrastructure — most meaningful when it reaches people who had no other option. That's the thread running through my work: machine learning, healthcare access, and the gap between what's possible and who it actually serves
          </p>
        </div>

        <section data-reveal-section style={{ marginTop: 40 }}>
          <h2 className="smallcaps mark" style={{ marginBottom: 24 }}>Papers</h2>
          {papers.map((p) => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="citation"
              data-reveal-item
            >
              <span className="c-year">{p.year}</span>
              <span className="c-title">{p.title}</span>
              <span className="c-venue">{p.venue}</span>
            </a>
          ))}
        </section>

        <section data-reveal-section style={{ marginTop: 80 }}>
          <h2 className="smallcaps mark" style={{ marginBottom: 24 }}>Conferences</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {conferences.map((c, i) => (
              <li
                key={i}
                data-reveal-item
                style={{
                  padding: '16px 0',
                  borderBottom: '1px solid var(--hair)',
                  color: 'var(--ink-muted)',
                  fontFamily: 'var(--f-body)',
                  fontSize: 16,
                  lineHeight: 1.5,
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section data-reveal-section style={{ marginTop: 80, marginBottom: 80 }}>
          <h2 className="smallcaps mark" style={{ marginBottom: 24 }}>Elsewhere</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {links.map((l) => (
              <a
                key={l.title}
                href={l.link}
                target="_blank"
                rel="noreferrer"
                data-reveal-item
                style={{
                  padding: '18px 0',
                  borderBottom: '1px solid var(--hair)',
                  fontFamily: 'var(--f-display)',
                  fontSize: 22,
                  color: 'var(--ink)',
                  transition: 'color 0.2s var(--e-out)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink)')}
              >
                {l.title} →
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Research;

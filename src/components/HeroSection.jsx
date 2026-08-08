import React from 'react';

export default function HeroSection({ onScrollToSection }) {
  const landingImage = '/landing-page-image.jpg';

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (onScrollToSection) {
      onScrollToSection(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      {/* Banner Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '85vh',
        maxHeight: '820px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `url(${landingImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '36px 8vw 40px'
      }}>
        {/* Subtle left & bottom gradient for crisp text legibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.45) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Title on Left Side (Top Aligned) */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          color: '#F3EEE3',
          textAlign: 'left',
          marginTop: '8px'
        }}>
          <h1 style={{
            fontFamily: "'Century Gothic', 'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(3.5rem, 8.5vw, 6.8rem)',
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            margin: 0,
            color: '#F3EEE3',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.35)'
          }}>
            The<br />
            Dwelling<br />
            Place
          </h1>
        </div>

        {/* Bottom Hyperlinks: Spread Evenly Across the Page */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
          padding: '0 2vw'
        }}>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            style={{
              color: '#F3EEE3',
              textDecoration: 'none',
              fontFamily: "'Century Gothic', 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
              fontWeight: 300,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              borderBottom: '1px solid transparent',
              paddingBottom: '4px'
            }}
            className="hero-nav-link"
          >
            About
          </a>

          <a
            href="#blog-posts"
            onClick={(e) => handleNavClick(e, 'blog-posts')}
            style={{
              color: '#F3EEE3',
              textDecoration: 'none',
              fontFamily: "'Century Gothic', 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
              fontWeight: 300,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              borderBottom: '1px solid transparent',
              paddingBottom: '4px'
            }}
            className="hero-nav-link"
          >
            Blog Posts
          </a>

          <a
            href="#resources"
            onClick={(e) => handleNavClick(e, 'resources')}
            style={{
              color: '#F3EEE3',
              textDecoration: 'none',
              fontFamily: "'Century Gothic', 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
              fontWeight: 300,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              borderBottom: '1px solid transparent',
              paddingBottom: '4px'
            }}
            className="hero-nav-link"
          >
            Resources
          </a>
        </div>
      </div>
    </section>
  );
}

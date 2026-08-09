import React from 'react';

export default function HeroSection({ onNavigate }) {
  const landingImage = '/landing-page-image.jpg';

  const handleNavClick = (e, pageName) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageName);
    }
  };

  return (
    <section style={{ width: '100%', height: '65vh', position: 'relative' }}>
      {/* Banner Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '65vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `url(${landingImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 70%',
        backgroundRepeat: 'no-repeat',
        padding: '16px 3.5vw 12px'
      }}>
        {/* Subtle left & bottom gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.08) 50%, rgba(0, 0, 0, 0.5) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Title on Top-Left Corner */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          color: '#F3EEE3',
          textAlign: 'left',
          marginTop: '2px'
        }}>
          <h1 style={{
            fontFamily: "'Century Gothic', 'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(2.6rem, 5.8vw, 4.5rem)',
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            margin: 0,
            color: '#F3EEE3',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.35)'
          }}>
            The<br />
            Dwelling<br />
            Place
          </h1>
        </div>

        {/* Bottom Hyperlinks Container — Direct page links with no dropdowns */}
        <div style={{
          position: 'relative',
          zIndex: 50,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2px',
          padding: '0 1vw'
        }}>
          {/* ABOUT PAGE LINK */}
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            style={{
              color: '#F3EEE3',
              textDecoration: 'none',
              fontFamily: "'Century Gothic', 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
              fontWeight: 300,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              borderBottom: '1px solid transparent',
              paddingBottom: '3px',
              display: 'inline-block',
              cursor: 'pointer'
            }}
            className="hero-nav-link"
          >
            About
          </a>

          {/* BLOG POSTS PAGE LINK */}
          <a
            href="#blog-posts"
            onClick={(e) => handleNavClick(e, 'blog-posts')}
            style={{
              color: '#F3EEE3',
              textDecoration: 'none',
              fontFamily: "'Century Gothic', 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
              fontWeight: 300,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              borderBottom: '1px solid transparent',
              paddingBottom: '3px',
              display: 'inline-block',
              cursor: 'pointer'
            }}
            className="hero-nav-link"
          >
            Blog Posts
          </a>

          {/* RESOURCES PAGE LINK */}
          <a
            href="#resources"
            onClick={(e) => handleNavClick(e, 'resources')}
            style={{
              color: '#F3EEE3',
              textDecoration: 'none',
              fontFamily: "'Century Gothic', 'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
              fontWeight: 300,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              borderBottom: '1px solid transparent',
              paddingBottom: '3px',
              display: 'inline-block',
              cursor: 'pointer'
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

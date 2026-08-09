import React, { useState, useRef } from 'react';

export default function HeroSection({ onSelectOption }) {
  const landingImage = '/landing-page-image.jpg';

  // Active dropdown state: 'about' | 'blog-posts' | 'resources' | null
  const [activeMenu, setActiveMenu] = useState(null);
  const [yearSubmenuOpen, setYearSubmenuOpen] = useState(false);

  // Timer reference for 250ms hover delay
  const timeoutRef = useRef(null);

  const handleMouseEnter = (menuName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setYearSubmenuOpen(false);
    }, 250);
  };

  const handleLinkClick = (e, menuName) => {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleOptionClick = (e, optionKey, optionLabel) => {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(null);
    setYearSubmenuOpen(false);

    if (onSelectOption) {
      onSelectOption(optionKey, optionLabel);
    }

    const el = document.getElementById(optionKey);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{ width: '100%', height: '65vh', position: 'relative' }}>
      {/* Banner Image Container — Positioned to reveal the path and bottom of the image */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '65vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `url(${landingImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 80%',
        backgroundRepeat: 'no-repeat',
        padding: '24px 7vw 12px'
      }}>
        {/* Subtle left & bottom gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.08) 50%, rgba(0, 0, 0, 0.5) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Title on Left Side */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          color: '#F3EEE3',
          textAlign: 'left',
          marginTop: '6px'
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

        {/* Bottom Hyperlinks Container */}
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
          {/* ================= 1. ABOUT DROPDOWN ================= */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, 'about')}
              style={{
                color: '#F3EEE3',
                textDecoration: 'none',
                fontFamily: "'Century Gothic', 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
                fontWeight: 300,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'all 0.25s ease',
                borderBottom: activeMenu === 'about' ? '1px solid #F3EEE3' : '1px solid transparent',
                paddingBottom: '3px',
                display: 'inline-block',
                cursor: 'pointer'
              }}
              className="hero-nav-link"
            >
              About
            </a>

            {/* About Dropdown Menu Below */}
            {activeMenu === 'about' && (
              <div 
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: '10px',
                  padding: '6px 0',
                  minWidth: '200px',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  zIndex: 1000
                }}
              >
                <a
                  href="#the-blog"
                  onClick={(e) => handleOptionClick(e, 'the-blog', 'The Blog')}
                  style={dropdownItemStyleWithBorder}
                  onMouseEnter={handleItemHover}
                  onMouseLeave={handleItemUnhover}
                >
                  The Blog
                </a>
                <a
                  href="#the-blogger"
                  onClick={(e) => handleOptionClick(e, 'the-blogger', 'The Blogger')}
                  style={dropdownItemStyleWithBorder}
                  onMouseEnter={handleItemHover}
                  onMouseLeave={handleItemUnhover}
                >
                  The Blogger
                </a>
                <a
                  href="#the-patrons"
                  onClick={(e) => handleOptionClick(e, 'the-patrons', 'The Patrons')}
                  style={dropdownItemStyleLast}
                  onMouseEnter={handleItemHover}
                  onMouseLeave={handleItemUnhover}
                >
                  The Patrons
                </a>
              </div>
            )}
          </div>

          {/* ================= 2. BLOG POSTS DROPDOWN ================= */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('blog-posts')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#blog-posts"
              onClick={(e) => handleLinkClick(e, 'blog-posts')}
              style={{
                color: '#F3EEE3',
                textDecoration: 'none',
                fontFamily: "'Century Gothic', 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
                fontWeight: 300,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'all 0.25s ease',
                borderBottom: activeMenu === 'blog-posts' ? '1px solid #F3EEE3' : '1px solid transparent',
                paddingBottom: '3px',
                display: 'inline-block',
                cursor: 'pointer'
              }}
              className="hero-nav-link"
            >
              Blog Posts
            </a>

            {/* Blog Posts Dropdown Menu Below */}
            {activeMenu === 'blog-posts' && (
              <div 
                onMouseEnter={() => handleMouseEnter('blog-posts')}
                onMouseLeave={handleMouseLeave}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: '10px',
                  padding: '6px 0',
                  minWidth: '180px',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  zIndex: 1000
                }}
              >
                {/* Year 2026 */}
                <div 
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setYearSubmenuOpen(true)}
                  onMouseLeave={() => setYearSubmenuOpen(false)}
                >
                  <div
                    onClick={() => setYearSubmenuOpen(!yearSubmenuOpen)}
                    style={{
                      ...dropdownItemStyleLast,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={handleItemHover}
                    onMouseLeave={handleItemUnhover}
                  >
                    <span>2026</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>›</span>
                  </div>

                  {/* Nested Submenu: August */}
                  {yearSubmenuOpen && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '100%',
                      marginLeft: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(16px)',
                      borderRadius: '10px',
                      padding: '6px 0',
                      minWidth: '140px',
                      boxShadow: '0 16px 36px rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(226, 232, 240, 0.9)',
                      zIndex: 1010
                    }}>
                      <a
                        href="#blog-2026-august"
                        onClick={(e) => handleOptionClick(e, 'blog-2026-august', 'August 2026')}
                        style={dropdownItemStyleLast}
                        onMouseEnter={handleItemHover}
                        onMouseLeave={handleItemUnhover}
                      >
                        August
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ================= 3. RESOURCES DROPDOWN ================= */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#resources"
              onClick={(e) => handleLinkClick(e, 'resources')}
              style={{
                color: '#F3EEE3',
                textDecoration: 'none',
                fontFamily: "'Century Gothic', 'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
                fontWeight: 300,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'all 0.25s ease',
                borderBottom: activeMenu === 'resources' ? '1px solid #F3EEE3' : '1px solid transparent',
                paddingBottom: '3px',
                display: 'inline-block',
                cursor: 'pointer'
              }}
              className="hero-nav-link"
            >
              Resources
            </a>

            {/* Resources Dropdown Menu Below */}
            {activeMenu === 'resources' && (
              <div 
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: '10px',
                  padding: '6px 0',
                  minWidth: '200px',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  zIndex: 1000
                }}
              >
                <a
                  href="#rest"
                  onClick={(e) => handleOptionClick(e, 'rest', 'Rest')}
                  style={dropdownItemStyleWithBorder}
                  onMouseEnter={handleItemHover}
                  onMouseLeave={handleItemUnhover}
                >
                  Rest
                </a>
                <a
                  href="#books"
                  onClick={(e) => handleOptionClick(e, 'books', 'Books')}
                  style={dropdownItemStyleWithBorder}
                  onMouseEnter={handleItemHover}
                  onMouseLeave={handleItemUnhover}
                >
                  Books
                </a>
                <a
                  href="#interviews"
                  onClick={(e) => handleOptionClick(e, 'interviews', 'Interviews')}
                  style={dropdownItemStyleLast}
                  onMouseEnter={handleItemHover}
                  onMouseLeave={handleItemUnhover}
                >
                  Interviews
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Inline Style Helpers for Dropdown Items
const dropdownItemStyleWithBorder = {
  display: 'block',
  padding: '8px 16px',
  color: '#2C2825',
  textDecoration: 'none',
  fontFamily: "'Century Gothic', sans-serif",
  fontSize: '0.85rem',
  letterSpacing: '0.04em',
  transition: 'all 0.2s ease',
  borderBottom: '1px solid #F1F5F9'
};

const dropdownItemStyleLast = {
  display: 'block',
  padding: '8px 16px',
  color: '#2C2825',
  textDecoration: 'none',
  fontFamily: "'Century Gothic', sans-serif",
  fontSize: '0.85rem',
  letterSpacing: '0.04em',
  transition: 'all 0.2s ease'
};

const handleItemHover = (e) => {
  e.currentTarget.style.backgroundColor = '#F4EAD3';
  e.currentTarget.style.color = '#B8860B';
};

const handleItemUnhover = (e) => {
  e.currentTarget.style.backgroundColor = 'transparent';
  e.currentTarget.style.color = '#2C2825';
};

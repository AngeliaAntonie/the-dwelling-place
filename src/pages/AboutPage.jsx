import React, { useState, useEffect, useRef } from 'react';
import NavigationHeader from '../components/NavigationHeader';
import { BookOpen, User, ShieldCheck } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('the-blog');
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    'the-blog': true,
    'the-blogger': true,
    'the-patrons': true
  });

  const blogRef = useRef(null);
  const bloggerRef = useRef(null);
  const patronsRef = useRef(null);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Scroll listener for hiding sub-nav bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0.2
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const sectionElements = [blogRef.current, bloggerRef.current, patronsRef.current];
    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const sections = [
    {
      id: 'the-blog',
      label: 'The Blog',
      icon: BookOpen,
      ref: blogRef,
      content: (
        <>
          <p style={paragraphStyle}>
            Welcome to <strong>The Dwelling Place</strong>—a sacred digital sanctuary for monthly meditations, scripture reflections, and quiet prayer.
          </p>
          <p style={paragraphStyle}>
            Here, each month offers a space to pause, abide in God's presence, and reflect on timeless Catholic wisdom and spiritual rest.
          </p>
        </>
      )
    },
    {
      id: 'the-blogger',
      label: 'The Blogger',
      icon: User,
      ref: bloggerRef,
      content: (
        <>
          <p style={paragraphStyle}>
            Written and curated with love, each reflection comes from a personal journey of faith, monthly prayer, and devotion.
          </p>
          <p style={paragraphStyle}>
            Through monthly written reflections, this site is designed to offer encouragement and spiritual quiet in a fast-paced world.
          </p>
        </>
      )
    },
    {
      id: 'the-patrons',
      label: 'The Patrons',
      icon: ShieldCheck,
      ref: patronsRef,
      content: (
        <>
          <p style={paragraphStyle}>
            Dedicated under the heavenly patronage of <strong>Our Lady, Seat of Wisdom</strong>, and <strong>Saint Joseph</strong>, protector of the holy home.
          </p>
          <p style={paragraphStyle}>
            May their intercession bring peace, quiet faith, and spiritual strength to all who visit this dwelling place.
          </p>
        </>
      )
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', color: '#2C2825' }}>
      {/* Top Header Navigation — Stays Pinned */}
      <NavigationHeader currentPage="about" onNavigate={onNavigate} />

      {/* Sub-Navigation Bar — Hides smoothly when user scrolls down */}
      <div style={{
        position: 'sticky',
        top: '60px',
        zIndex: 90,
        backgroundColor: 'rgba(250, 247, 242, 0.96)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(230, 223, 211, 0.8)',
        padding: isScrolled ? '0px 24px' : '14px 24px',
        maxHeight: isScrolled ? '0px' : '60px',
        opacity: isScrolled ? 0 : 1,
        transform: isScrolled ? 'translateY(-100%)' : 'translateY(0)',
        pointerEvents: isScrolled ? 'none' : 'auto',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {sections.map(({ id, label }, index) => {
          const isActive = activeSection === id;
          return (
            <React.Fragment key={id}>
              {index > 0 && <span style={{ color: '#D5CDBF', fontSize: '0.8rem', userSelect: 'none' }}>•</span>}
              <button
                onClick={() => scrollToSection(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Century Gothic', sans-serif",
                  fontSize: '0.92rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isActive ? '#C8524B' : '#6E6862',
                  fontWeight: isActive ? 600 : 400,
                  paddingBottom: '4px',
                  borderBottom: isActive ? '2px solid #C8524B' : '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                {label}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Main Content Area — Wider width to fill space gracefully */}
      <main style={{ maxWidth: '1150px', margin: '0 auto', padding: '50px 4vw 45vh' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="font-serif" style={{
            fontSize: 'clamp(2.8rem, 5vw, 3.8rem)',
            fontWeight: 300,
            letterSpacing: '0.02em',
            margin: 0,
            color: '#1B1816'
          }}>
            About
          </h1>
          <div style={{
            width: '40px',
            height: '1px',
            backgroundColor: '#C8524B',
            margin: '20px auto 0',
            opacity: 0.6
          }} />
        </div>

        {/* Fluid Editorial Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {sections.map(({ id, label, icon: IconComponent, ref, content }, index) => {
            const isActive = activeSection === id;

            return (
              <React.Fragment key={id}>
                {index > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    margin: '8px 0'
                  }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E6DFD3', maxWidth: '200px' }} />
                    <span style={{ color: '#C8524B', fontSize: '0.75rem', opacity: 0.7 }}>❖</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E6DFD3', maxWidth: '200px' }} />
                  </div>
                )}

                <section
                  id={id}
                  ref={ref}
                  style={{
                    opacity: 1,
                    scrollMarginTop: '100px',
                    paddingLeft: '24px',
                    borderLeft: isActive ? '4px solid #C8524B' : '4px solid transparent',
                    transition: 'border-color 0.4s ease, border-width 0.4s ease'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <IconComponent
                      size={24}
                      style={{
                        color: '#C8524B',
                        opacity: isActive ? 1 : 0.7,
                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <h2 className="font-serif" style={{
                      fontSize: '2.1rem',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      margin: 0,
                      color: '#1B1816'
                    }}>
                      {label}
                    </h2>
                  </div>
                  
                  <div>
                    {content}
                  </div>
                </section>
              </React.Fragment>
            );
          })}
        </div>
      </main>
    </div>
  );
}

const paragraphStyle = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: '1.35rem',
  color: '#3A3532',
  lineHeight: '1.85',
  marginBottom: '20px',
  fontWeight: 400
};

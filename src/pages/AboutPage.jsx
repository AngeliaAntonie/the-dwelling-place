import React, { useState, useEffect, useRef } from 'react';
import NavigationHeader from '../components/NavigationHeader';

export default function AboutPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('the-blog');

  const blogRef = useRef(null);
  const bloggerRef = useRef(null);
  const patronsRef = useRef(null);

  // IntersectionObserver to dynamically highlight active section's centered accent line
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
      {/* Main Navigation Header */}
      <NavigationHeader currentPage="about" onNavigate={onNavigate} />

      {/* Centered Main Content Stream */}
      <main style={{ maxWidth: '850px', margin: '0 auto', padding: '60px 4vw 40vh', textAlign: 'center' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
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

        {/* Centered Editorial Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {sections.map(({ id, label, ref, content }, index) => {
            const isActive = activeSection === id;

            return (
              <React.Fragment key={id}>
                {index > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    margin: '12px 0'
                  }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E6DFD3', maxWidth: '160px' }} />
                    <span style={{ color: '#C8524B', fontSize: '0.75rem', opacity: 0.7 }}>❖</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E6DFD3', maxWidth: '160px' }} />
                  </div>
                )}

                <section
                  id={id}
                  ref={ref}
                  style={{
                    scrollMarginTop: '80px',
                    textAlign: 'center'
                  }}
                >
                  {/* Section Title & Centered Dynamic Accent Line */}
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h2 className="font-serif" style={{
                      fontSize: '2.2rem',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      margin: 0,
                      color: '#1B1816'
                    }}>
                      {label}
                    </h2>
                    
                    {/* Centered Dynamic Red Accent Line */}
                    <div style={{
                      width: '48px',
                      height: '2px',
                      backgroundColor: '#C8524B',
                      margin: '12px auto 0',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0.3)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} />
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
  fontWeight: 400,
  textAlign: 'center'
};

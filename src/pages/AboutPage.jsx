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

          {/* Three Oval Patron Frames */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '32px',
            marginTop: '44px',
            flexWrap: 'wrap'
          }}>
            {/* Our Lady Mystical Rose */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '160px'
            }}>
              <div style={{
                width: '140px',
                height: '185px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #C8524B',
                boxShadow: '0 0 0 3px #FAF7F2, 0 0 0 5px rgba(200, 82, 75, 0.35), 0 8px 24px rgba(44, 40, 37, 0.1)',
                backgroundColor: '#F3ECE2'
              }}>
                <img
                  src="/images/our_lady_mystical_rose.jpg"
                  alt="Our Lady Mystical Rose"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#1B1816',
                marginTop: '14px',
                textAlign: 'center',
                lineHeight: 1.25
              }}>
                Our Lady<br />
                <span style={{ fontSize: '0.95rem', fontWeight: 400, fontStyle: 'italic', color: '#6E6862' }}>
                  Mystical Rose
                </span>
              </span>
            </div>

            {/* Saint Bernadette Soubirous */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '160px'
            }}>
              <div style={{
                width: '140px',
                height: '185px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #C8524B',
                boxShadow: '0 0 0 3px #FAF7F2, 0 0 0 5px rgba(200, 82, 75, 0.35), 0 8px 24px rgba(44, 40, 37, 0.1)',
                backgroundColor: '#F3ECE2'
              }}>
                <img
                  src="/images/st_bernadette.jpg"
                  alt="St. Bernadette Soubirous"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#1B1816',
                marginTop: '14px',
                textAlign: 'center',
                lineHeight: 1.25
              }}>
                St. Bernadette<br />
                <span style={{ fontSize: '0.95rem', fontWeight: 400, fontStyle: 'italic', color: '#6E6862' }}>
                  Soubirous
                </span>
              </span>
            </div>

            {/* Saint Josemaría Escrivá */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '160px'
            }}>
              <div style={{
                width: '140px',
                height: '185px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #C8524B',
                boxShadow: '0 0 0 3px #FAF7F2, 0 0 0 5px rgba(200, 82, 75, 0.35), 0 8px 24px rgba(44, 40, 37, 0.1)',
                backgroundColor: '#F3ECE2'
              }}>
                <img
                  src="/images/st_josemaria_escriva.jpg"
                  alt="St. Josemaría Escrivá"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#1B1816',
                marginTop: '14px',
                textAlign: 'center',
                lineHeight: 1.25
              }}>
                St. Josemaría<br />
                <span style={{ fontSize: '0.95rem', fontWeight: 400, fontStyle: 'italic', color: '#6E6862' }}>
                  Escrivá
                </span>
              </span>
            </div>
          </div>
        </>
      )
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', color: '#2C2825' }}>
      {/* Main Navigation Header */}
      <NavigationHeader currentPage="about" onNavigate={onNavigate} />

      {/* Centered Main Content Stream */}
      <main style={{ maxWidth: '850px', margin: '0 auto', padding: '64px 4vw 40vh', textAlign: 'center' }}>
        {/* Main Hero Page Title — Distinct & Commanding */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.25rem',
            fontStyle: 'italic',
            letterSpacing: '0.02em',
            color: '#C8524B',
            fontWeight: 500,
            display: 'block',
            marginBottom: '12px'
          }}>
            So funny the Holy Spirit lead you here :)
          </span>
          <h1 className="font-serif" style={{
            fontSize: 'clamp(3.4rem, 6.5vw, 4.8rem)',
            fontWeight: 300,
            letterSpacing: '0.06em',
            lineHeight: 1.05,
            margin: 0,
            color: '#1B1816'
          }}>
            About
          </h1>
          <div style={{
            width: '80px',
            height: '2px',
            backgroundColor: '#C8524B',
            margin: '24px auto 0',
            borderRadius: '2px',
            opacity: 0.85
          }} />
        </div>

        {/* Centered Editorial Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '72px' }}>
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
                    margin: '16px 0'
                  }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E6DFD3', maxWidth: '180px' }} />
                    <span style={{ color: '#C8524B', fontSize: '0.75rem', opacity: 0.7 }}>❖</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E6DFD3', maxWidth: '180px' }} />
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
                  {/* Section Title & Wider Dynamic Red Accent Underline */}
                  <div style={{
                    display: 'inline-block',
                    textAlign: 'center',
                    marginBottom: '24px'
                  }}>
                    <h2 className="font-serif" style={{
                      fontSize: '2.1rem',
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                      margin: 0,
                      color: '#1B1816'
                    }}>
                      {label}
                    </h2>
                    
                    {/* Dynamic Red Accent Line — Spans across phrase */}
                    <div style={{
                      width: '100%',
                      minWidth: '160px',
                      height: '2px',
                      backgroundColor: '#C8524B',
                      margin: '10px auto 0',
                      borderRadius: '1px',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0.15)',
                      transformOrigin: 'center center',
                      transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
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

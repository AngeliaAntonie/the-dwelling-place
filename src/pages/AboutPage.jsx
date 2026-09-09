import React, { useState, useEffect, useRef } from 'react';
import NavigationHeader from '../components/NavigationHeader';
import { BookOpen, User, ShieldCheck } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('the-blog');
  const [visibleSections, setVisibleSections] = useState({
    'the-blog': true,
    'the-blogger': false,
    'the-patrons': false
  });

  const blogRef = useRef(null);
  const bloggerRef = useRef(null);
  const patronsRef = useRef(null);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // Account for sticky top navigation header & sticky pill bar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -40% 0px',
      threshold: 0.15
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
      <NavigationHeader currentPage="about" onNavigate={onNavigate} />

      {/* Sticky Pill Navigation Controls */}
      <div style={{
        position: 'sticky',
        top: '60px',
        zIndex: 90,
        backgroundColor: 'rgba(250, 247, 242, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E6DFD3',
        padding: '14px 24px',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        boxShadow: '0 4px 12px rgba(44, 40, 37, 0.03)',
        transition: 'all 0.3s ease'
      }}>
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              style={{
                padding: '10px 24px',
                borderRadius: '24px',
                border: '1px solid',
                borderColor: isActive ? '#C8524B' : '#E6DFD3',
                backgroundColor: isActive ? '#C8524B' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#2C2825',
                fontFamily: "'Century Gothic', sans-serif",
                fontSize: '0.9rem',
                letterSpacing: '0.06em',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isActive ? 'scale(1.03)' : 'scale(1)',
                boxShadow: isActive ? '0 4px 12px rgba(200, 82, 75, 0.25)' : 'none'
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 className="font-serif" style={{ fontSize: '3rem', margin: 0, color: '#1B1816' }}>
            About
          </h1>
        </div>

        {/* Stacked Sections in Scroll View */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {sections.map(({ id, label, icon: IconComponent, ref, content }) => {
            const isActive = activeSection === id;
            const isVisible = visibleSections[id];

            return (
              <section
                key={id}
                id={id}
                ref={ref}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '40px',
                  border: '1px solid',
                  borderColor: isActive ? '#C8524B' : '#E6DFD3',
                  borderLeft: isActive ? '5px solid #C8524B' : '1px solid #E6DFD3',
                  boxShadow: isActive
                    ? '0 8px 30px rgba(200, 82, 75, 0.12)'
                    : '0 4px 20px rgba(44, 40, 37, 0.04)',
                  opacity: isVisible ? 1 : 0.35,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.98)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  scrollMarginTop: '130px'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#F9EDED' : '#FAF7F2',
                    transition: 'all 0.3s ease'
                  }}>
                    <IconComponent
                      size={26}
                      style={{
                        color: '#C8524B',
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </div>
                  <h2 className="font-serif" style={{ fontSize: '2rem', margin: 0, color: '#1B1816' }}>
                    {label}
                  </h2>
                </div>
                {content}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}

const paragraphStyle = {
  fontSize: '1.1rem',
  color: '#4A5568',
  lineHeight: '1.8',
  marginBottom: '16px'
};

import React from 'react';
import { BookOpen, Clock, Heart, ChevronDown, Sparkles } from 'lucide-react';
import { DAILY_VERSE } from '../data/meditations';

export default function HeroSection({ featuredMeditation, onSelectMeditation, onScrollToIntentions }) {
  const landingImage = '/landing-page-image.jpg';

  return (
    <section style={{ position: 'relative', width: '100%' }}>
      {/* Full-bleed Hero Visual Cover — First thing the user sees */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        maxHeight: '750px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${landingImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        backgroundRepeat: 'no-repeat',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '60px 24px'
      }}>
        {/* Dark overlay for rich contrast and readable typography */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(18, 21, 27, 0.45) 0%, rgba(18, 21, 27, 0.78) 100%)',
          backdropFilter: 'blur(1px)'
        }} />

        {/* Hero Banner Floating Content Box */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '860px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Liturgical & Brand Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '30px',
            backgroundColor: 'rgba(217, 119, 6, 0.25)',
            border: '1px solid rgba(217, 119, 6, 0.6)',
            backdropFilter: 'blur(8px)',
            fontSize: '0.825rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: '#FCD34D'
          }}>
            <Sparkles size={14} />
            <span>Catholic Monthly Meditations & Prayer Sanctuary</span>
          </div>

          {/* Main Title */}
          <h1 className="font-cinzel" style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            margin: '8px 0 0 0',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
          }}>
            THE DWELLING PLACE
          </h1>

          {/* Subtitle / Tagline */}
          <p className="font-serif" style={{
            fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
            fontStyle: 'italic',
            color: '#E2E8F0',
            margin: 0,
            maxWidth: '680px',
            lineHeight: 1.4,
            fontWeight: 300
          }}>
            A quiet sanctuary for heart-felt reflection, scripture meditation, and monthly prayer
          </p>

          {/* Daily Verse Card embedded in Hero */}
          <div style={{
            marginTop: '12px',
            padding: '16px 28px',
            borderRadius: '12px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(217, 119, 6, 0.4)',
            backdropFilter: 'blur(12px)',
            maxWidth: '680px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <p className="font-serif" style={{
              fontSize: '1.1rem',
              fontStyle: 'italic',
              margin: '0 0 6px 0',
              color: '#F8FAFC',
              lineHeight: 1.5
            }}>
              "{DAILY_VERSE.quote}"
            </p>
            <span style={{ fontSize: '0.8rem', color: '#FCD34D', fontWeight: 600, letterSpacing: '0.06em' }}>
              — {DAILY_VERSE.reference}
            </span>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
            {featuredMeditation && (
              <button 
                onClick={() => onSelectMeditation(featuredMeditation)} 
                className="btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: '1rem',
                  borderRadius: '30px',
                  boxShadow: '0 8px 24px rgba(217, 119, 6, 0.35)'
                }}
              >
                <BookOpen size={18} />
                <span>Read Current Monthly Post</span>
              </button>
            )}

            <button 
              onClick={onScrollToIntentions} 
              className="btn-outline"
              style={{
                padding: '14px 26px',
                fontSize: '1rem',
                borderRadius: '30px',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF'
              }}
            >
              <Heart size={17} />
              <span>Light a Candle</span>
            </button>
          </div>
        </div>

        {/* Smooth Scroll Indicator */}
        <a 
          href="#meditations"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            zIndex: 3
          }}
        >
          <span>Explore Meditations</span>
          <ChevronDown size={18} style={{ animation: 'bounce 2s infinite' }} />
        </a>
      </div>
    </section>
  );
}

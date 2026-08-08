import React from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, Quote, Heart } from 'lucide-react';
import { DAILY_VERSE } from '../data/meditations';

export default function HeroSection({ featuredMeditation, onSelectMeditation, onScrollToIntentions }) {
  if (!featuredMeditation) return null;

  return (
    <section style={{
      padding: '48px 0 32px',
      position: 'relative'
    }}>
      <div className="container">
        {/* Daily Scripture Candlelight Banner */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-gold)',
          borderRadius: '8px',
          padding: '20px 28px',
          marginBottom: '40px',
          boxShadow: 'var(--shadow-soft)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-gold)' }}>
            <span className="flame" style={{ width: '10px', height: '16px' }}></span>
            <span className="font-cinzel" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>
              Monthly Scripture Spotlight
            </span>
          </div>

          <p className="font-serif" style={{
            fontSize: '1.25rem',
            fontStyle: 'italic',
            color: 'var(--text-heading)',
            maxWidth: '720px',
            margin: '0 0 6px 0',
            lineHeight: 1.5
          }}>
            "{DAILY_VERSE.quote}"
          </p>

          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.05em' }}>
            — {DAILY_VERSE.reference}
          </span>
        </div>

        {/* Hero Featured Article Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-hover)'
        }}>
          {/* Image Banner */}
          <div style={{
            position: 'relative',
            height: '100%',
            minHeight: '340px',
            backgroundImage: `url(${featuredMeditation.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)'
            }} />
            
            <div style={{ position: 'relative', zIndex: 2, color: '#FFF' }}>
              <span className={`liturgical-badge ${featuredMeditation.liturgicalColor}`} style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#FFF',
                borderColor: 'rgba(255,255,255,0.3)',
                marginBottom: '12px'
              }}>
                ✦ Monthly Meditation • {featuredMeditation.month} {featuredMeditation.year}
              </span>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', margin: '6px 0', color: '#FFF', fontWeight: 600 }}>
                {featuredMeditation.title}
              </h3>
            </div>
          </div>

          {/* Article Info Content */}
          <div style={{ padding: '36px 36px 36px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>By {featuredMeditation.author}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> {featuredMeditation.readingTime}
              </span>
            </div>

            <h2 className="font-serif" style={{
              fontSize: '2.1rem',
              lineHeight: 1.25,
              color: 'var(--text-heading)',
              marginBottom: '12px'
            }}>
              {featuredMeditation.title}
            </h2>

            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              marginBottom: '24px',
              lineHeight: 1.6
            }}>
              {featuredMeditation.excerpt}
            </p>

            {/* Scripture snippet box */}
            <div style={{
              borderLeft: '3px solid var(--accent-gold)',
              paddingLeft: '16px',
              marginBottom: '28px',
              backgroundColor: 'var(--bg-secondary)',
              padding: '12px 16px',
              borderRadius: '0 4px 4px 0'
            }}>
              <p className="font-serif" style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-heading)', margin: 0 }}>
                "{featuredMeditation.scripture}"
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                — {featuredMeditation.scriptureRef}
              </span>
            </div>

            {/* Call to Action buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button 
                onClick={() => onSelectMeditation(featuredMeditation)} 
                className="btn-primary"
              >
                <BookOpen size={16} />
                <span>Begin Meditation</span>
              </button>

              <button 
                onClick={onScrollToIntentions} 
                className="btn-outline"
              >
                <Heart size={15} />
                <span>Light a Candle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

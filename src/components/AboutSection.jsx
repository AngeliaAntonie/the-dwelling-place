import React from 'react';
import { Cross, Heart, Sparkles, Feather, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" style={{
      padding: '72px 0',
      backgroundColor: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-gold-light)',
          border: '1px solid var(--border-gold)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-gold)',
          marginBottom: '16px'
        }}>
          <Cross size={20} />
        </div>

        <span className="liturgical-badge gold" style={{ marginBottom: '12px' }}>
          ABOUT THE DWELLING PLACE
        </span>

        <h2 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--text-heading)', margin: '12px 0 20px', lineHeight: 1.2 }}>
          A Digital Sanctuary for Sacred Stillness
        </h2>

        <div className="sacred-divider">
          <Cross size={16} />
        </div>

        <p className="font-serif" style={{
          fontSize: '1.2rem',
          lineHeight: 1.7,
          color: 'var(--text-main)',
          marginBottom: '24px'
        }}>
          "The Dwelling Place" was born out of a gentle longing: to craft a peaceful internet sanctuary where weary souls can step away from the relentless noise of modern life and rest in Catholic spiritual meditations.
        </p>

        <p style={{
          fontSize: '0.98rem',
          lineHeight: 1.7,
          color: 'var(--text-muted)',
          marginBottom: '40px'
        }}>
          Each month, we publish a thoughtful meditation grounded in Sacred Scripture, Catholic tradition, and the wisdom of the Saints. Whether you join us for five minutes during your morning commute or spend an hour in quiet adoration, our goal is to companion your journey toward intimacy with God.
        </p>

        {/* 3 Core Values Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          textAlign: 'center',
          marginTop: '32px'
        }}>
          <div className="card" style={{ padding: '24px 16px' }}>
            <Feather size={24} style={{ color: 'var(--accent-gold)', marginBottom: '12px' }} />
            <h4 className="font-cinzel" style={{ fontSize: '0.95rem', marginBottom: '6px', color: 'var(--text-heading)' }}>
              REVERENT TYPOGRAPHY
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Designed with timeless beauty, uncluttered layouts, and distraction-free reading controls.
            </p>
          </div>

          <div className="card" style={{ padding: '24px 16px' }}>
            <Heart size={24} style={{ color: 'var(--accent-gold)', marginBottom: '12px' }} />
            <h4 className="font-cinzel" style={{ fontSize: '0.95rem', marginBottom: '6px', color: 'var(--text-heading)' }}>
              COMMUNITY PRAYER
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Light virtual devotional candles and carry one another's intentions before the altar.
            </p>
          </div>

          <div className="card" style={{ padding: '24px 16px' }}>
            <ShieldCheck size={24} style={{ color: 'var(--accent-gold)', marginBottom: '12px' }} />
            <h4 className="font-cinzel" style={{ fontSize: '0.95rem', marginBottom: '6px', color: 'var(--text-heading)' }}>
              FAITHFUL TRADITION
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Rooted in Catholic theology, Scripture, Liturgical Seasons, and Saintly reflections.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

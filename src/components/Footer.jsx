import React from 'react';
import { Cross, Heart, Mail } from 'lucide-react';
import { DAILY_VERSE } from '../data/meditations';

export default function Footer({ onOpenNewsletter }) {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-gold)',
      padding: '48px 0 32px',
      color: 'var(--text-muted)',
      fontSize: '0.85rem'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        {/* Sacred Cross Motif Header */}
        <div style={{ color: 'var(--accent-gold)', marginBottom: '16px' }}>
          <Cross size={24} />
        </div>

        <h3 className="font-cinzel" style={{
          fontSize: '1.2rem',
          letterSpacing: '0.08em',
          color: 'var(--text-heading)',
          marginBottom: '8px'
        }}>
          THE DWELLING PLACE
        </h3>

        <p className="font-serif" style={{
          fontStyle: 'italic',
          fontSize: '1.05rem',
          color: 'var(--text-main)',
          maxWidth: '560px',
          margin: '0 auto 24px'
        }}>
          "{DAILY_VERSE.saintQuote}"
          <br />
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontStyle: 'normal', fontWeight: 600 }}>
            — {DAILY_VERSE.saintRef}
          </span>
        </p>

        {/* Quick Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Home</a>
          <a href="#meditations" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Monthly Meditations</a>
          <a href="#intentions-wall" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Devotional Wall</a>
          <a href="#about" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>About Sanctuary</a>
          <button onClick={onOpenNewsletter} style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontWeight: 600, cursor: 'pointer', padding: 0 }}>
            Monthly Companion PDF
          </button>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} The Dwelling Place. Catholic Monthly Meditations & Spiritual Companion.
          </p>
          <p style={{ fontSize: '0.78rem', opacity: 0.7, margin: 0 }}>
            Glory be to the Father, and to the Son, and to the Holy Spirit.
          </p>
        </div>
      </div>
    </footer>
  );
}

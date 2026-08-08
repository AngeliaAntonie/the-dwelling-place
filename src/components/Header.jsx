import React, { useState } from 'react';
import { BookOpen, Moon, Sun, Volume2, VolumeX, Bookmark, Search, Mail, Cross, Sparkles } from 'lucide-react';
import { ambientAudio } from '../utils/ambientAudio';

export default function Header({ 
  theme, 
  setTheme, 
  bookmarksCount, 
  onOpenBookmarks, 
  onOpenNewsletter, 
  onOpenSearch,
  currentSeason 
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleToggleAudio = () => {
    const playing = ambientAudio.toggle();
    setIsPlayingAudio(playing);
  };

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-primary)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)',
      transition: 'background-color 0.4s ease'
    }}>
      {/* Top Banner — Liturgical Season & Saint Notice */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: '0.8rem',
        padding: '6px 0',
        textAlign: 'center',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`liturgical-badge ${currentSeason.color}`}>
              {currentSeason.icon} {currentSeason.name}
            </span>
            <span style={{ display: 'none', mdDisplay: 'inline' }}>•</span>
            <span style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>August 2026 Monthly Meditation Edition</span>
          </div>
          
          <button 
            onClick={onOpenNewsletter} 
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-gold)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Mail size={13} />
            <span>Get Monthly Companion PDF</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px'
      }}>
        {/* Brand Logo & Title */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-gold-light)',
            border: '1px solid var(--border-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)'
          }}>
            <Cross size={18} />
          </div>
          <div>
            <h1 className="font-cinzel" style={{
              fontSize: '1.4rem',
              margin: 0,
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: 'var(--text-heading)',
              lineHeight: 1.1
            }}>
              THE DWELLING PLACE
            </h1>
            <p style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0
            }}>
              Catholic Monthly Meditations
            </p>
          </div>
        </a>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Ambient Sound Generator Button */}
          <button 
            onClick={handleToggleAudio}
            className="btn-outline"
            title={isPlayingAudio ? "Mute Chapel Ambiance" : "Play Peaceful Chapel Ambiance"}
            style={{
              borderColor: isPlayingAudio ? 'var(--accent-gold)' : 'var(--border-subtle)',
              backgroundColor: isPlayingAudio ? 'var(--accent-gold-light)' : 'transparent',
              color: isPlayingAudio ? 'var(--accent-gold)' : 'var(--text-main)',
              padding: '8px 12px',
              fontSize: '0.8rem'
            }}
          >
            {isPlayingAudio ? <Volume2 size={16} className="flame" /> : <VolumeX size={16} />}
            <span style={{ display: 'none', smDisplay: 'inline' }}>
              {isPlayingAudio ? "Chapel Ambiance" : "Quiet Sanctuary"}
            </span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="btn-outline"
            title="Search Meditations"
            style={{ padding: '8px 10px', borderColor: 'var(--border-subtle)' }}
          >
            <Search size={16} />
          </button>

          {/* Bookmarks Counter Button */}
          <button
            onClick={onOpenBookmarks}
            className="btn-outline"
            title="Saved Meditations"
            style={{ padding: '8px 12px', borderColor: 'var(--border-subtle)', position: 'relative' }}
          >
            <Bookmark size={16} />
            {bookmarksCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: 'var(--accent-gold)',
                color: '#FFF',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Theme Toggle Button (Light/Dark) */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="btn-outline"
            title={theme === 'light' ? 'Switch to Vigil Night Theme' : 'Switch to Sacred Parchment Theme'}
            style={{ padding: '8px 10px', borderColor: 'var(--border-subtle)' }}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { X, Volume2, VolumeX, Bookmark, Share2, Type, Sun, Moon, Cross, Heart, Check, ArrowLeft } from 'lucide-react';
import { ambientAudio } from '../utils/ambientAudio';

export default function MeditationModal({ 
  meditation, 
  onClose, 
  isBookmarked, 
  onToggleBookmark,
  theme,
  setTheme 
}) {
  if (!meditation) return null;

  const [fontSize, setFontSize] = useState(1.15); // rem
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [savedNote, setSavedNote] = useState(false);

  const handleToggleAudio = () => {
    const playing = ambientAudio.toggle();
    setIsPlayingAudio(playing);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (userNote.trim()) {
      setSavedNote(true);
      setTimeout(() => setSavedNote(false), 3000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          fontSize: `${fontSize}rem`,
          lineHeight: 1.7
        }}
      >
        {/* Reader Control Header Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '16px',
          marginBottom: '28px'
        }}>
          <button 
            onClick={onClose}
            className="btn-outline"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <ArrowLeft size={15} />
            <span>Return to Archive</span>
          </button>

          {/* Typography & Ambiance Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Font Size Adjusters */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '2px 6px',
              gap: '4px'
            }}>
              <Type size={14} style={{ color: 'var(--text-muted)' }} />
              <button 
                onClick={() => setFontSize(Math.max(0.95, fontSize - 0.1))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', padding: '2px 6px', color: 'var(--text-main)' }}
                title="Decrease Font Size"
              >
                A-
              </button>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>|</span>
              <button 
                onClick={() => setFontSize(Math.min(1.4, fontSize + 0.1))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: '2px 6px', color: 'var(--text-main)', fontWeight: 600 }}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* Ambient Sound Toggle */}
            <button
              onClick={handleToggleAudio}
              className="btn-outline"
              style={{
                borderColor: isPlayingAudio ? 'var(--accent-gold)' : 'var(--border-subtle)',
                backgroundColor: isPlayingAudio ? 'var(--accent-gold-light)' : 'transparent',
                color: isPlayingAudio ? 'var(--accent-gold)' : 'var(--text-main)',
                padding: '6px 10px',
                fontSize: '0.8rem'
              }}
              title={isPlayingAudio ? "Mute Chapel Ambiance" : "Play Chapel Ambiance"}
            >
              {isPlayingAudio ? <Volume2 size={15} className="flame" /> : <VolumeX size={15} />}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(meditation.id)}
              className="btn-outline"
              style={{
                borderColor: isBookmarked ? 'var(--accent-gold)' : 'var(--border-subtle)',
                backgroundColor: isBookmarked ? 'var(--accent-gold-light)' : 'transparent',
                color: isBookmarked ? 'var(--accent-gold)' : 'var(--text-main)',
                padding: '6px 10px'
              }}
              title={isBookmarked ? "Saved in Bookmarks" : "Save Meditation"}
            >
              <Bookmark size={15} fill={isBookmarked ? "var(--accent-gold)" : "none"} />
            </button>

            {/* Share Link */}
            <button
              onClick={handleShare}
              className="btn-outline"
              style={{ padding: '6px 10px' }}
              title="Share Meditation"
            >
              {copiedShare ? <Check size={15} style={{ color: 'green' }} /> : <Share2 size={15} />}
            </button>

            {/* Close Button */}
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Meditation Article Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className={`liturgical-badge ${meditation.liturgicalColor}`} style={{ marginBottom: '12px' }}>
            ✝ {meditation.month} {meditation.year} Meditation • {meditation.liturgicalSeason}
          </span>

          <h1 className="font-serif" style={{
            fontSize: '2.4em',
            lineHeight: 1.2,
            margin: '12px 0 8px',
            color: 'var(--text-heading)'
          }}>
            {meditation.title}
          </h1>

          <p className="font-serif" style={{
            fontSize: '1.2em',
            fontStyle: 'italic',
            color: 'var(--text-muted)',
            marginBottom: '16px'
          }}>
            {meditation.subtitle}
          </p>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            By {meditation.author} • Published {meditation.date} • {meditation.readingTime}
          </div>

          <div className="sacred-divider">
            <Cross size={16} />
          </div>
        </div>

        {/* Scripture Box */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '4px solid var(--accent-gold)',
          padding: '24px 28px',
          borderRadius: '0 8px 8px 0',
          marginBottom: '36px'
        }}>
          <p className="font-serif" style={{
            fontSize: '1.25em',
            fontStyle: 'italic',
            color: 'var(--text-heading)',
            marginBottom: '8px',
            lineHeight: 1.5
          }}>
            "{meditation.scripture}"
          </p>
          <span style={{ fontSize: '0.85em', color: 'var(--accent-gold)', fontWeight: 600 }}>
            — {meditation.scriptureRef}
          </span>
        </div>

        {/* Body Paragraphs */}
        <div style={{ color: 'var(--text-main)', margin: '0 auto', maxWidth: '680px' }}>
          {meditation.content.map((block, idx) => {
            if (block.type === 'paragraph') {
              return (
                <p 
                  key={idx} 
                  className={idx === 0 ? "drop-cap" : ""} 
                  style={{ marginBottom: '24px' }}
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === 'heading') {
              return (
                <h3 
                  key={idx} 
                  className="font-serif" 
                  style={{
                    fontSize: '1.5em',
                    color: 'var(--text-heading)',
                    marginTop: '36px',
                    marginBottom: '16px',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '6px'
                  }}
                >
                  {block.text}
                </h3>
              );
            }
            if (block.type === 'quote') {
              return (
                <blockquote 
                  key={idx}
                  className="font-serif"
                  style={{
                    fontSize: '1.15em',
                    fontStyle: 'italic',
                    padding: '16px 24px',
                    borderLeft: '3px solid var(--border-gold)',
                    backgroundColor: 'var(--bg-secondary)',
                    margin: '28px 0',
                    borderRadius: '4px'
                  }}
                >
                  {block.text}
                </blockquote>
              );
            }
            return null;
          })}

          {/* Reflection Questions Box */}
          {meditation.reflectionQuestions && (
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              borderRadius: '8px',
              padding: '24px 28px',
              margin: '40px 0'
            }}>
              <h4 className="font-cinzel" style={{
                fontSize: '1em',
                color: 'var(--accent-gold)',
                marginBottom: '16px',
                letterSpacing: '0.05em'
              }}>
                ✦ QUESTIONS FOR PERSONAL REFLECTION
              </h4>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                {meditation.reflectionQuestions.map((q, qIdx) => (
                  <li key={qIdx} style={{ marginBottom: '12px', fontSize: '0.95em', color: 'var(--text-main)' }}>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Personal Journal Notes Entry */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '40px'
          }}>
            <h4 className="font-serif" style={{ fontSize: '1.2em', marginBottom: '8px', color: 'var(--text-heading)' }}>
              My Private Journal Notes for this Meditation
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Your reflections are stored locally in your browser so you can revisit them anytime.
            </p>
            <form onSubmit={handleSaveNote}>
              <textarea
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="Write your prayers or personal thoughts here..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                  marginBottom: '12px'
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  Save Journal Entry
                </button>
                {savedNote && (
                  <span style={{ fontSize: '0.8rem', color: 'green', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={14} /> Reflection Saved
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Closing Prayer Box */}
          <div style={{
            textAlign: 'center',
            backgroundColor: 'var(--accent-gold-light)',
            border: '1px solid var(--border-gold)',
            borderRadius: '8px',
            padding: '28px',
            marginTop: '36px'
          }}>
            <div style={{ color: 'var(--accent-gold)', marginBottom: '8px' }}>
              <Cross size={20} />
            </div>
            <h4 className="font-cinzel" style={{ fontSize: '1.1em', color: 'var(--text-heading)', marginBottom: '12px' }}>
              CLOSING PRAYER
            </h4>
            <p className="font-serif" style={{ fontStyle: 'italic', fontSize: '1.1em', lineHeight: 1.6, color: 'var(--text-main)', margin: 0 }}>
              "{meditation.prayer}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

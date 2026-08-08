import React from 'react';
import { BookOpen, Bookmark, Clock, ArrowUpRight, Share2 } from 'lucide-react';

export default function MeditationCard({ 
  meditation, 
  onSelect, 
  isBookmarked, 
  onToggleBookmark 
}) {
  return (
    <article className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      position: 'relative',
      height: '100%'
    }}>
      <div>
        {/* Top Header Image & Tags */}
        <div style={{
          position: 'relative',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '20px',
          aspectRatio: '16/9'
        }}>
          <img 
            src={meditation.image} 
            alt={meditation.title} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
          />
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            gap: '8px'
          }}>
            <span className={`liturgical-badge ${meditation.liturgicalColor}`} style={{
              backgroundColor: 'rgba(250, 247, 242, 0.9)',
              backdropFilter: 'blur(4px)',
              fontSize: '0.7rem'
            }}>
              {meditation.month} {meditation.year}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(meditation.id);
            }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: isBookmarked ? 'var(--accent-gold)' : 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              border: 'none',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title={isBookmarked ? "Remove Bookmark" : "Save Meditation"}
          >
            <Bookmark size={15} fill={isBookmarked ? "#FFF" : "none"} />
          </button>
        </div>

        {/* Post Metadata */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          marginBottom: '8px'
        }}>
          <span>{meditation.liturgicalSeason}</span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} /> {meditation.readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="font-serif" 
          onClick={() => onSelect(meditation)}
          style={{
            fontSize: '1.5rem',
            lineHeight: 1.3,
            color: 'var(--text-heading)',
            marginBottom: '10px',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
        >
          {meditation.title}
        </h3>

        {/* Excerpt */}
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          marginBottom: '20px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {meditation.excerpt}
        </p>
      </div>

      {/* Footer Read Action */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '16px',
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={() => onSelect(meditation)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--accent-gold)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0
          }}
        >
          <span>Read Reflection</span>
          <ArrowUpRight size={15} />
        </button>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          {meditation.date}
        </span>
      </div>
    </article>
  );
}

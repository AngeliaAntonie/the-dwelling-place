import React, { useState, useEffect, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import AdminPortal from './components/AdminPortal';
import MeditationCard from './components/MeditationCard';
import MeditationModal from './components/MeditationModal';
import { supabase, isSupabaseConfigured } from './utils/supabase';
import { MEDITATIONS, LITURGICAL_SEASONS } from './data/meditations';
import { Sparkles, BookOpen, User, ShieldCheck, HeartHandshake, Book, Mic, Quote } from 'lucide-react';

export default function App() {
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [allMeditations, setAllMeditations] = useState(MEDITATIONS);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem('dwelling_place_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch posts from Supabase if configured
  const loadSupabasePosts = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching Supabase posts:', error);
        return;
      }

      if (data && data.length > 0) {
        const formatted = data.map(p => ({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle || '',
          scripture: p.scripture || '',
          author: p.author || 'Dwelling Place Contributor',
          date: p.date,
          readTime: p.read_time || '5 min read',
          liturgicalSeason: p.season || 'ORDINARY TIME',
          featured: Boolean(p.featured),
          tags: Array.isArray(p.tags) ? p.tags : (p.tags ? [p.tags] : ['Meditation']),
          image: p.image_url || '/landing-page-image.jpg',
          paragraphs: typeof p.content === 'string' ? p.content.split('\n\n').filter(Boolean) : [p.content],
          reflectionPrompt: p.reflection_prompt || '',
          isFromDb: true
        }));

        setAllMeditations([...formatted, ...MEDITATIONS]);
      }
    } catch (err) {
      console.error('Failed to load database posts:', err);
    }
  }, []);

  useEffect(() => {
    loadSupabasePosts();
  }, [loadSupabasePosts]);

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF7F2' }}>
      {/* Top Banner Image with Interactive Dropdown Navigation */}
      <main style={{ flex: 1 }}>
        <HeroSection />

        {/* Generous Gap + Quote Spotlight Section */}
        <section id="quote-spotlight" style={{
          padding: '90px 24px 70px',
          textAlign: 'center',
          maxWidth: '820px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: '#F4EAD3',
            color: '#B8860B',
            marginBottom: '20px'
          }}>
            <Quote size={20} />
          </div>

          <p className="font-serif" style={{
            fontSize: 'clamp(1.35rem, 2.8vw, 1.95rem)',
            fontStyle: 'italic',
            color: '#2C2825',
            lineHeight: 1.6,
            margin: '0 0 16px 0',
            fontWeight: 400
          }}>
            "Be still, and know that I am God."
          </p>

          <span style={{
            fontFamily: "'Century Gothic', sans-serif",
            fontSize: '0.85rem',
            color: '#B8860B',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            — Psalm 46:10
          </span>
        </section>

        {/* Content Sections Container */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px 24px 60px' }}>
          
          {/* ================= 1. ABOUT SECTIONS ================= */}
          <section id="the-blog" style={sectionCardStyle}>
            <div style={sectionHeaderStyle}>
              <BookOpen size={24} style={{ color: '#B8860B' }} />
              <h2 className="font-serif" style={sectionTitleStyle}>The Blog</h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: '#4A5568', lineHeight: '1.8' }}>
              Welcome to <strong>The Dwelling Place</strong>—a sacred digital sanctuary for monthly meditations, scripture reflections, and quiet prayer. Here, each month offers a space to pause, abide in God's presence, and reflect on timeless Catholic wisdom.
            </p>
          </section>

          <section id="the-blogger" style={sectionCardStyle}>
            <div style={sectionHeaderStyle}>
              <User size={24} style={{ color: '#B8860B' }} />
              <h2 className="font-serif" style={sectionTitleStyle}>The Blogger</h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: '#4A5568', lineHeight: '1.8' }}>
              Written and curated with love, each reflection comes from a personal journey of faith, monthly prayer, and devotion.
            </p>
          </section>

          <section id="the-patrons" style={sectionCardStyle}>
            <div style={sectionHeaderStyle}>
              <ShieldCheck size={24} style={{ color: '#B8860B' }} />
              <h2 className="font-serif" style={sectionTitleStyle}>The Patrons</h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: '#4A5568', lineHeight: '1.8' }}>
              Dedicated under the heavenly patronage of Our Lady, Seat of Wisdom, and Saint Joseph, protector of the holy home.
            </p>
          </section>

          {/* ================= 2. BLOG POSTS ARCHIVE (2026 -> August) ================= */}
          <section id="blog-2026-august" style={{ ...sectionCardStyle, borderLeft: '4px solid #B8860B' }}>
            <div style={sectionHeaderStyle}>
              <Sparkles size={24} style={{ color: '#B8860B' }} />
              <div>
                <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: '#B8860B', textTransform: 'uppercase', fontWeight: 600 }}>
                  2026 Archive
                </span>
                <h2 className="font-serif" style={{ ...sectionTitleStyle, margin: 0 }}>August 2026 Meditations</h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginTop: '24px' }}>
              {allMeditations.map(meditation => (
                <MeditationCard 
                  key={meditation.id}
                  meditation={meditation}
                  onSelect={(m) => setSelectedMeditation(m)}
                  isBookmarked={bookmarkedIds.includes(meditation.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          </section>

          {/* ================= 3. RESOURCES SECTIONS ================= */}
          <section id="rest" style={sectionCardStyle}>
            <div style={sectionHeaderStyle}>
              <HeartHandshake size={24} style={{ color: '#B8860B' }} />
              <h2 className="font-serif" style={sectionTitleStyle}>Rest</h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: '#4A5568', lineHeight: '1.8' }}>
              Guides and quiet reflections on entering Sabbath rest, mental stillness, and resting in the divine presence.
            </p>
          </section>

          <section id="books" style={sectionCardStyle}>
            <div style={sectionHeaderStyle}>
              <Book size={24} style={{ color: '#B8860B' }} />
              <h2 className="font-serif" style={sectionTitleStyle}>Books</h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: '#4A5568', lineHeight: '1.8' }}>
              Recommended spiritual reading, monthly book lists, and classic spiritual devotionals.
            </p>
          </section>

          <section id="interviews" style={sectionCardStyle}>
            <div style={sectionHeaderStyle}>
              <Mic size={24} style={{ color: '#B8860B' }} />
              <h2 className="font-serif" style={sectionTitleStyle}>Interviews</h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: '#4A5568', lineHeight: '1.8' }}>
              Conversations, audio reflections, and interviews with guest writers and spiritual directors.
            </p>
          </section>
        </div>
      </main>

      {/* Reader Modal */}
      {selectedMeditation && (
        <MeditationModal 
          meditation={selectedMeditation}
          onClose={() => setSelectedMeditation(null)}
          isBookmarked={bookmarkedIds.includes(selectedMeditation.id)}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {/* Subtle Writer Portal Trigger at bottom corner */}
      <div style={{
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E2E8F0'
      }}>
        <button
          onClick={() => setAdminPortalOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 10px',
            borderRadius: '6px'
          }}
          title="Writer Portal Login"
        >
          <Sparkles size={14} />
          <span>Writer Portal</span>
        </button>
      </div>

      {/* Writer / Admin Portal Modal */}
      <AdminPortal 
        isOpen={adminPortalOpen}
        onClose={() => setAdminPortalOpen(false)}
        onPostSaved={loadSupabasePosts}
        liturgicalSeasons={LITURGICAL_SEASONS}
      />
    </div>
  );
}

// Section styling helpers
const sectionCardStyle = {
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  padding: '32px',
  marginBottom: '32px',
  border: '1px solid #E6DFD3',
  boxShadow: '0 4px 16px rgba(44, 40, 37, 0.04)'
};

const sectionHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '12px'
};

const sectionTitleStyle = {
  fontSize: '1.8rem',
  color: '#1B1816',
  margin: 0
};

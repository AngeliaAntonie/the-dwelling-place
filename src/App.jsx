import React, { useState, useEffect, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import AdminPortal from './components/AdminPortal';
import MeditationModal from './components/MeditationModal';
import { supabase, isSupabaseConfigured } from './utils/supabase';
import { MEDITATIONS, LITURGICAL_SEASONS } from './data/meditations';
import { Sparkles } from 'lucide-react';

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
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HeroSection />

        {/* Custom Quote Spotlight Section - Stretches to complete initial screen view */}
        <section id="quote-spotlight" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '48px 24px 60px',
          textAlign: 'center',
          maxWidth: '920px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Quote Text */}
          <p className="font-serif" style={{
            fontSize: 'clamp(1.35rem, 2.8vw, 1.95rem)',
            fontStyle: 'italic',
            color: '#2C2825',
            lineHeight: 1.6,
            margin: '0 0 20px 0',
            fontWeight: 400
          }}>
            "You have put into my heart a greater joy than they have from abundance of corn and new wine. I will lie down and sleep comes at once for you alone, Lord, make me dwell in safety"
          </p>

          {/* Reference in Sunset Light Red */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            alignItems: 'center'
          }}>
            <span style={{
              fontFamily: "'Century Gothic', sans-serif",
              fontSize: '0.9rem',
              color: '#C8524B',
              letterSpacing: '0.06em',
              fontWeight: 500
            }}>
              Compline, Benedictine night prayer.
            </span>
            <span style={{
              fontFamily: "'Century Gothic', sans-serif",
              fontSize: '0.85rem',
              color: '#C8524B',
              letterSpacing: '0.06em',
              fontWeight: 400
            }}>
              Psalm 4:7-8.
            </span>
          </div>
        </section>
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

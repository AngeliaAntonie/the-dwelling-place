import React, { useState, useEffect, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import AdminPortal from './components/AdminPortal';
import { supabase, isSupabaseConfigured } from './utils/supabase';
import { MEDITATIONS, LITURGICAL_SEASONS } from './data/meditations';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [allMeditations, setAllMeditations] = useState(MEDITATIONS);

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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* Main Content — Pure Banner Image (Blank Slate) */}
      <main style={{ flex: 1 }}>
        <HeroSection />
      </main>

      {/* Subtle Writer Portal Trigger at bottom corner */}
      <div style={{
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #F1F5F9'
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

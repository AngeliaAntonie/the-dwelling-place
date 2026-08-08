import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import { X, Lock, LogIn, Plus, Edit3, Trash2, CheckCircle, AlertCircle, FileText, Image, Sparkles } from 'lucide-react';

export default function AdminPortal({ isOpen, onClose, onPostSaved, liturgicalSeasons }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'new' | 'edit'

  // Posts list from DB
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(false);

  // Post form state
  const [currentPostId, setCurrentPostId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    scripture: '',
    author: 'Dwelling Place Contributor',
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    readTime: '5 min read',
    season: 'Ordinary Time',
    featured: false,
    tags: 'Meditation, Reflection',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    content: '',
    reflectionPrompt: ''
  });

  // Check auth state on mount/open
  useEffect(() => {
    if (!isOpen || !isSupabaseConfigured()) return;
    
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [isOpen]);

  // Fetch posts when logged in
  useEffect(() => {
    if (user && isOpen && isSupabaseConfigured()) {
      fetchPosts();
    }
  }, [user, isOpen]);

  const fetchPosts = async () => {
    if (!supabase) return;
    setFetchingPosts(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message);
    } finally {
      setFetchingPosts(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured yet. Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      setSuccessMsg('Successfully logged in!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setActiveTab('list');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setCurrentPostId(null);
    setFormData({
      title: '',
      subtitle: '',
      scripture: '',
      author: 'Dwelling Place Contributor',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      readTime: '5 min read',
      season: 'Ordinary Time',
      featured: false,
      tags: 'Meditation, Reflection',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      content: '',
      reflectionPrompt: ''
    });
  };

  const handleNewPost = () => {
    resetForm();
    setActiveTab('new');
  };

  const handleEditClick = (post) => {
    setCurrentPostId(post.id);
    setFormData({
      title: post.title || '',
      subtitle: post.subtitle || '',
      scripture: post.scripture || '',
      author: post.author || 'Dwelling Place Contributor',
      date: post.date || '',
      readTime: post.read_time || '5 min read',
      season: post.season || 'Ordinary Time',
      featured: Boolean(post.featured),
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      imageUrl: post.image_url || '',
      content: post.content || '',
      reflectionPrompt: post.reflection_prompt || ''
    });
    setActiveTab('edit');
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
      setSuccessMsg('Post deleted successfully');
      fetchPosts();
      if (onPostSaved) onPostSaved();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setError('Title and Content are required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    const postPayload = {
      title: formData.title,
      subtitle: formData.subtitle,
      scripture: formData.scripture,
      author: formData.author,
      date: formData.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      read_time: formData.readTime,
      season: formData.season,
      featured: formData.featured,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      image_url: formData.imageUrl,
      content: formData.content,
      reflection_prompt: formData.reflectionPrompt
    };

    try {
      if (currentPostId) {
        // Update
        const { error } = await supabase
          .from('posts')
          .update(postPayload)
          .eq('id', currentPostId);
        if (error) throw error;
        setSuccessMsg('Post updated successfully!');
      } else {
        // Create
        const { error } = await supabase
          .from('posts')
          .insert([postPayload]);
        if (error) throw error;
        setSuccessMsg('New post published successfully!');
      }

      fetchPosts();
      if (onPostSaved) onPostSaved();
      setActiveTab('list');
      resetForm();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-primary, #ffffff)',
        color: 'var(--text-primary, #1e293b)',
        borderRadius: '16px',
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid var(--border-subtle, #e2e8f0)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle, #e2e8f0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-secondary, #f8fafc)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={22} style={{ color: 'var(--gold-color, #d97706)' }} />
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'serif' }}>Writer & Admin Portal</h2>
              <p style={{ margin: 0, fontSize: '0.825rem', opacity: 0.7 }}>
                {user ? `Logged in as ${user.email}` : 'Monthly Meditation Management'}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user && (
              <button 
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                Log Out
              </button>
            )}
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'currentColor'
              }}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* Status Messages */}
          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fecaca',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.9rem'
            }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div style={{
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              border: '1px solid #a7f3d0',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.9rem'
            }}>
              <CheckCircle size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Not Configured Alert */}
          {!isSupabaseConfigured() && (
            <div style={{
              backgroundColor: '#fffbeb',
              color: '#92400e',
              border: '1px solid #fef3c7',
              padding: '16px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem' }}>⚙️ Setup Required</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: '1.5' }}>
                To enable live updates and authentication, add your <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your project's <code>.env</code> file.
              </p>
            </div>
          )}

          {/* Login Form if not logged in */}
          {!user ? (
            <div style={{ maxWidth: '400px', margin: '30px auto', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(217, 119, 6, 0.12)',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Lock size={26} />
              </div>
              
              <h3 style={{ margin: '0 0 8px 0', fontFamily: 'serif', fontSize: '1.4rem' }}>Writer Login</h3>
              <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '24px' }}>
                Log in to edit and publish monthly meditations for The Dwelling Place.
              </p>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="writer@thedwellingplace.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle, #cbd5e1)',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
                    Password
                  </label>
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle, #cbd5e1)',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    padding: '12px',
                    fontSize: '1rem',
                    justifyContent: 'center',
                    marginTop: '8px'
                  }}
                >
                  <LogIn size={18} />
                  <span>{loading ? 'Logging in...' : 'Sign In to Portal'}</span>
                </button>
              </form>
            </div>
          ) : (
            /* Logged In Dashboard */
            <div>
              {/* Navigation Tabs */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                borderBottom: '1px solid var(--border-subtle, #e2e8f0)',
                paddingBottom: '12px'
              }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setActiveTab('list')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: activeTab === 'list' ? 'var(--gold-color, #d97706)' : 'transparent',
                      color: activeTab === 'list' ? '#fff' : 'currentColor',
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    All Meditations ({posts.length})
                  </button>
                  <button
                    onClick={handleNewPost}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: activeTab === 'new' ? 'var(--gold-color, #d97706)' : 'transparent',
                      color: activeTab === 'new' ? '#fff' : 'currentColor',
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={16} />
                    New Post
                  </button>
                </div>
              </div>

              {/* LIST TAB */}
              {activeTab === 'list' && (
                <div>
                  {fetchingPosts ? (
                    <p style={{ textAlign: 'center', opacity: 0.7, padding: '30px' }}>Loading monthly posts...</p>
                  ) : posts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                      <FileText size={40} style={{ opacity: 0.4, marginBottom: '12px' }} />
                      <h3>No database posts yet</h3>
                      <p style={{ opacity: 0.7, maxWidth: '400px', margin: '0 auto 20px', fontSize: '0.9rem' }}>
                        Click "New Post" above to write and publish your friend's first monthly meditation!
                      </p>
                      <button onClick={handleNewPost} className="btn btn-primary">
                        <Plus size={18} />
                        Create First Post
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {posts.map(post => (
                        <div 
                          key={post.id}
                          style={{
                            padding: '16px',
                            borderRadius: '10px',
                            border: '1px solid var(--border-subtle, #e2e8f0)',
                            backgroundColor: 'var(--bg-secondary, #f8fafc)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px'
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span className="liturgical-badge gold" style={{ fontSize: '0.75rem' }}>
                                {post.season || 'Ordinary Time'}
                              </span>
                              {post.featured && (
                                <span style={{ fontSize: '0.75rem', background: '#d97706', color: '#fff', padding: '2px 8px', borderRadius: '12px' }}>
                                  ★ Featured
                                </span>
                              )}
                              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{post.date}</span>
                            </div>
                            <h4 style={{ margin: '4px 0', fontFamily: 'serif', fontSize: '1.1rem' }}>{post.title}</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7, lineClamp: 1, WebkitLineClamp: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {post.subtitle || post.scripture || post.content}
                            </p>
                          </div>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => handleEditClick(post)}
                              className="btn btn-secondary"
                              style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                            >
                              <Edit3 size={15} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '6px',
                                border: '1px solid #fecaca',
                                backgroundColor: '#fef2f2',
                                color: '#dc2626',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* NEW / EDIT TAB FORM */}
              {(activeTab === 'new' || activeTab === 'edit') && (
                <form onSubmit={handleSavePost} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ margin: 0, fontFamily: 'serif' }}>
                    {activeTab === 'edit' ? 'Edit Monthly Post' : 'Create New Monthly Post'}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '4px' }}>
                        Post Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g. Abiding in the Stillness of Hope"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle, #cbd5e1)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '4px' }}>
                        Subtitle / Catchphrase
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => handleInputChange('subtitle', e.target.value)}
                        placeholder="e.g. A reflection on quiet trust in God's timing"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle, #cbd5e1)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '4px' }}>
                        Scripture Reference
                      </label>
                      <input
                        type="text"
                        value={formData.scripture}
                        onChange={(e) => handleInputChange('scripture', e.target.value)}
                        placeholder="e.g. Psalm 46:10"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle, #cbd5e1)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '4px' }}>
                        Publication Month/Date
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        placeholder="e.g. August 2026"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle, #cbd5e1)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '4px' }}>
                        Liturgical Season
                      </label>
                      <select
                        value={formData.season}
                        onChange={(e) => handleInputChange('season', e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle, #cbd5e1)' }}
                      >
                        <option value="Ordinary Time">Ordinary Time</option>
                        <option value="Advent">Advent</option>
                        <option value="Christmas">Christmas</option>
                        <option value="Lent">Lent</option>
                        <option value="Easter">Easter</option>
                        <option value="Sacred Heart">Sacred Heart</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '4px' }}>
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle, #cbd5e1)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '4px' }}>
                      Meditation Content * (Separate paragraphs with double enter)
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Write the monthly meditation post content here..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle, #cbd5e1)', fontSize: '0.95rem', fontFamily: 'sans-serif' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '4px' }}>
                      Reflection Question / Closing Prayer
                    </label>
                    <textarea
                      rows={3}
                      value={formData.reflectionPrompt}
                      onChange={(e) => handleInputChange('reflectionPrompt', e.target.value)}
                      placeholder="e.g. Where in your life is God calling you to step into quiet trust this month?"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle, #cbd5e1)' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                    />
                    <label htmlFor="featured" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                      Mark as Featured Post on Hero Banner
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '12px', marginTop: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setActiveTab('list')}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      {loading ? 'Saving...' : activeTab === 'edit' ? 'Update Post' : 'Publish Monthly Post'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

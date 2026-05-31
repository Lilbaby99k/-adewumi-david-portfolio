import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import './Admin.css';

/* ── LOGIN PAGE ── */
function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = onLogin(password);
    if (!ok) { setError('Wrong password! Please try again.'); setPassword(''); }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <div className="admin-login__icon"><i className="fas fa-lock" /></div>
        <h2>Admin Login</h2>
        <p>Enter your password to manage your portfolio</p>
        <form onSubmit={handleSubmit}>
          <div className="admin-login__input-wrap">
            <input
              type={show ? 'text' : 'password'}
              placeholder="Enter admin password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              required
            />
            <button type="button" className="admin-login__eye" onClick={() => setShow(s => !s)}>
              <i className={`fas ${show ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>
          {error && <p className="admin-login__error"><i className="fas fa-exclamation-circle" /> {error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <i className="fas fa-sign-in-alt" /> Login
          </button>
        </form>
        <p className="admin-login__hint">Contact the site owner to get access.</p>
      </div>
    </div>
  );
}

/* ── PROJECTS TAB ── */
function ProjectsTab() {
  const { projects, addProject, deleteProject } = useAdmin();
  const [form, setForm] = useState({ title: '', tags: '', img: '', link: '', cat: 'html' });
  const [msg, setMsg] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.tags || !form.img) return;
    addProject({ ...form, cat: [form.cat] });
    setForm({ title: '', tags: '', img: '', link: '', cat: 'html' });
    setMsg('✅ Project added and saved!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="admin-tab">
      <div className="admin-tab__header">
        <h3><i className="fas fa-plus-circle" /> Add New Project</h3>
        <span className="admin-badge">{projects.length} Projects</span>
      </div>

      <form className="admin-form" onSubmit={handleAdd}>
        <div className="admin-form__row">
          <div className="form-group">
            <label>Project Title *</label>
            <input placeholder="E.g. E-Commerce Website" value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label>Tags *</label>
            <input placeholder="E.g. HTML · CSS · JS" value={form.tags}
              onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} required />
          </div>
        </div>
        <div className="admin-form__row">
          <div className="form-group">
            <label>Image URL *</label>
            <input placeholder="https://your-image-url.com/img.jpg" value={form.img}
              onChange={e => setForm(p => ({ ...p, img: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label>Live Project Link</label>
            <input placeholder="https://your-project.com" value={form.link}
              onChange={e => setForm(p => ({ ...p, link: e.target.value }))} />
          </div>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={form.cat} onChange={e => setForm(p => ({ ...p, cat: e.target.value }))}>
            <option value="html">HTML/CSS</option>
            <option value="react">React</option>
            <option value="js">JavaScript</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-plus" /> Add Project
        </button>
        {msg && <p className="admin-success">{msg}</p>}
      </form>

      <div className="admin-tab__header" style={{ marginTop: '2rem' }}>
        <h3><i className="fas fa-list" /> All Projects</h3>
      </div>
      <div className="admin-list">
        {projects.map(p => (
          <div key={p.id} className="admin-list__item">
            <img src={p.img} alt={p.title} onError={e => e.target.src = 'https://picsum.photos/seed/default/100/100'} />
            <div>
              <strong>{p.title}</strong>
              <span>{p.tags}</span>
            </div>
            <span className="admin-list__cat">{p.cat?.[0]}</span>
            <button className="admin-list__delete" onClick={() => deleteProject(p.id)} title="Delete">
              <i className="fas fa-trash" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── BLOG TAB ── */
function BlogTab() {
  const { blogs, addBlog, deleteBlog } = useAdmin();
  const [form, setForm] = useState({ title: '', category: '', excerpt: '', content: '', img: '' });
  const [msg, setMsg] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    addBlog(form);
    setForm({ title: '', category: '', excerpt: '', content: '', img: '' });
    setMsg('✅ Blog post added and saved!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="admin-tab">
      <div className="admin-tab__header">
        <h3><i className="fas fa-plus-circle" /> Add New Blog Post</h3>
        <span className="admin-badge">{blogs.length} Posts</span>
      </div>

      <form className="admin-form" onSubmit={handleAdd}>
        <div className="admin-form__row">
          <div className="form-group">
            <label>Title *</label>
            <input placeholder="Blog post title" value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <input placeholder="E.g. React, CSS, Career" value={form.category}
              onChange={e => setForm(p => ({ ...p, category: e.target.value }))} required />
          </div>
        </div>
        <div className="form-group">
          <label>Image URL *</label>
          <input placeholder="https://your-image-url.com/img.jpg" value={form.img}
            onChange={e => setForm(p => ({ ...p, img: e.target.value }))} required />
        </div>
        <div className="form-group">
          <label>Short Excerpt * (shown on card)</label>
          <input placeholder="Brief description shown on the blog card..." value={form.excerpt}
            onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} required />
        </div>
        <div className="form-group">
          <label>Full Content *</label>
          <textarea rows={5} placeholder="Write your full blog post content here..." value={form.content}
            onChange={e => setForm(p => ({ ...p, content: e.target.value }))} required />
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-plus" /> Add Blog Post
        </button>
        {msg && <p className="admin-success">{msg}</p>}
      </form>

      <div className="admin-tab__header" style={{ marginTop: '2rem' }}>
        <h3><i className="fas fa-list" /> All Blog Posts</h3>
      </div>
      <div className="admin-list">
        {blogs.map(b => (
          <div key={b.id} className="admin-list__item">
            <img src={b.img} alt={b.title} onError={e => e.target.src = 'https://picsum.photos/seed/default/100/100'} />
            <div>
              <strong>{b.title}</strong>
              <span>{b.date} · {b.category}</span>
            </div>
            <button className="admin-list__delete" onClick={() => deleteBlog(b.id)} title="Delete">
              <i className="fas fa-trash" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── TESTIMONIALS TAB ── */
function TestimonialsTab() {
  const { testimonials, addTestimonial, deleteTestimonial } = useAdmin();
  const [form, setForm] = useState({ name: '', role: '', message: '', stars: 5 });
  const [msg, setMsg] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    addTestimonial({ ...form, stars: Number(form.stars) });
    setForm({ name: '', role: '', message: '', stars: 5 });
    setMsg('✅ Testimonial added and saved!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="admin-tab">
      <div className="admin-tab__header">
        <h3><i className="fas fa-plus-circle" /> Add New Testimonial</h3>
        <span className="admin-badge">{testimonials.length} Reviews</span>
      </div>

      <form className="admin-form" onSubmit={handleAdd}>
        <div className="admin-form__row">
          <div className="form-group">
            <label>Client Name *</label>
            <input placeholder="E.g. John Smith" value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label>Role / Company *</label>
            <input placeholder="E.g. CEO, TechStart" value={form.role}
              onChange={e => setForm(p => ({ ...p, role: e.target.value }))} required />
          </div>
        </div>
        <div className="form-group">
          <label>Their Message *</label>
          <textarea rows={3} placeholder="What they said about your work..." value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required />
        </div>
        <div className="form-group">
          <label>Star Rating</label>
          <select value={form.stars} onChange={e => setForm(p => ({ ...p, stars: e.target.value }))}>
            <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
            <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
            <option value={3}>⭐⭐⭐ 3 Stars</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-plus" /> Add Testimonial
        </button>
        {msg && <p className="admin-success">{msg}</p>}
      </form>

      <div className="admin-tab__header" style={{ marginTop: '2rem' }}>
        <h3><i className="fas fa-list" /> All Testimonials</h3>
      </div>
      <div className="admin-list">
        {testimonials.map(t => (
          <div key={t.id} className="admin-list__item">
            <img src={t.avatar} alt={t.name} style={{ borderRadius: '50%' }} />
            <div>
              <strong>{t.name}</strong>
              <span>{t.role} · {'⭐'.repeat(t.stars)}</span>
            </div>
            <button className="admin-list__delete" onClick={() => deleteTestimonial(t.id)} title="Delete">
              <i className="fas fa-trash" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MAIN ADMIN DASHBOARD ── */
export default function Admin() {
  const { isLoggedIn, login, logout, projects, blogs, testimonials, resetAll } = useAdmin();
  const [activeTab, setActiveTab] = useState('projects');
  const [showReset, setShowReset] = useState(false);

  if (!isLoggedIn) return <LoginPage onLogin={login} />;

  const TABS = [
    { id: 'projects', label: 'Projects', icon: 'fas fa-briefcase', count: projects.length },
    { id: 'blog', label: 'Blog Posts', icon: 'fas fa-blog', count: blogs.length },
    { id: 'testimonials', label: 'Testimonials', icon: 'fas fa-star', count: testimonials.length },
  ];

  const handleReset = () => {
    resetAll();
    setShowReset(false);
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard__header">
        <div>
          <h1><i className="fas fa-tachometer-alt" /> Admin Dashboard</h1>
          <p>Welcome back, <strong>Adewumi David</strong>! Changes save automatically. ✅</p>
        </div>
        <div className="admin-dashboard__header-btns">
          <button className="btn btn-outline btn--sm" onClick={() => setShowReset(true)}>
            <i className="fas fa-redo" /> Reset
          </button>
          <button className="btn btn-outline btn--sm" onClick={logout}>
            <i className="fas fa-sign-out-alt" /> Logout
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="admin-overview">
        {TABS.map(tab => (
          <div key={tab.id} className="admin-overview__card" onClick={() => setActiveTab(tab.id)}>
            <i className={tab.icon} />
            <div>
              <strong>{tab.count}</strong>
              <span>{tab.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="admin-dashboard__tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab__btn ${activeTab === tab.id ? 'admin-tab__btn--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={tab.icon} /> {tab.label}
            <span className="admin-tab__count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="admin-dashboard__content">
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'blog' && <BlogTab />}
        {activeTab === 'testimonials' && <TestimonialsTab />}
      </div>

      {/* Reset Confirm Modal */}
      {showReset && (
        <div className="admin-modal">
          <div className="admin-modal__box">
            <i className="fas fa-exclamation-triangle admin-modal__icon" />
            <h3>Reset All Data?</h3>
            <p>This will delete all your custom projects, blog posts, and testimonials and restore the defaults. This cannot be undone!</p>
            <div className="admin-modal__btns">
              <button className="btn btn-outline" onClick={() => setShowReset(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleReset}>Yes, Reset All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

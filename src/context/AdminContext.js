import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const AdminContext = createContext();

const ADMIN_PASSWORD = 'Adewumi@David2026';

export function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── FETCH ALL DATA FROM SUPABASE ──
  useEffect(() => {
    fetchAll();
  }, []);

 const fetchAll = async () => {
    setLoading(true);
    try {
      const [
        { data: p, error: pe },
        { data: b, error: be },
        { data: t, error: te }
      ] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: true }),
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: true }),
      ]);

      if (pe) console.error('Projects error:', pe);
      if (be) console.error('Blogs error:', be);
      if (te) console.error('Testimonials error:', te);

      setProjects(p || []);
      setBlogs(b || []);
      setTestimonials(t || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    setLoading(false);
  };

  // ── AUTH ──
  const login = (password) => {
    if (password === ADMIN_PASSWORD) { setIsLoggedIn(true); return true; }
    return false;
  };
  const logout = () => setIsLoggedIn(false);

  // ── PROJECTS ──
  const addProject = async (project) => {
    const { data, error } = await supabase.from('projects').insert([{
      title: project.title,
      tags: project.tags,
      img: project.img,
      link: project.link || '#',
      cat: Array.isArray(project.cat) ? project.cat : [project.cat],
    }]).select();
    if (!error && data) setProjects(prev => [...prev, data[0]]);
  };

  const deleteProject = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjects(prev => prev.filter(p => p.id !== id));
  };

  // ── BLOGS ──
  const addBlog = async (blog) => {
    const { data, error } = await supabase.from('blogs').insert([{
      title: blog.title,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      img: blog.img,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      }),
    }]).select();
    if (!error && data) setBlogs(prev => [data[0], ...prev]);
  };

  const deleteBlog = async (id) => {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (!error) setBlogs(prev => prev.filter(b => b.id !== id));
  };

  // ── TESTIMONIALS ──
  const addTestimonial = async (testimonial) => {
    const { data, error } = await supabase.from('testimonials').insert([{
      name: testimonial.name,
      role: testimonial.role,
      message: testimonial.message,
      stars: Number(testimonial.stars),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=00b4d8&color=fff&bold=true`,
    }]).select();
    if (!error && data) setTestimonials(prev => [...prev, data[0]]);
  };

  const deleteTestimonial = async (id) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // ── RESET ──
  const resetAll = async () => {
    await Promise.all([
      supabase.from('projects').delete().neq('id', 0),
      supabase.from('blogs').delete().neq('id', 0),
      supabase.from('testimonials').delete().neq('id', 0),
    ]);
    setProjects([]);
    setBlogs([]);
    setTestimonials([]);
  };

  return (
    <AdminContext.Provider value={{
      isLoggedIn, login, logout, loading,
      projects, addProject, deleteProject,
      blogs, addBlog, deleteBlog,
      testimonials, addTestimonial, deleteTestimonial,
      resetAll, fetchAll,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
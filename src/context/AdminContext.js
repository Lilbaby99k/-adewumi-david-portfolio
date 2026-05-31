import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

const ADMIN_PASSWORD = 'Adewumi@David2026'; // Your secret password

const DEFAULT_PROJECTS = [
  { id: 1, title: 'E-Commerce Website', tags: 'HTML · CSS · JavaScript', cat: ['html', 'js'], img: 'https://picsum.photos/seed/ecom1/600/400', link: '#' },
  { id: 2, title: 'Portfolio Website', tags: 'HTML · CSS · JS', cat: ['html', 'js'], img: 'https://picsum.photos/seed/port2/600/400', link: '#' },
  { id: 3, title: 'Dashboard UI', tags: 'React · CSS', cat: ['react'], img: 'https://picsum.photos/seed/dash3/600/400', link: '#' },
  { id: 4, title: 'Landing Page', tags: 'HTML · CSS · JS', cat: ['html', 'js'], img: 'https://picsum.photos/seed/land4/600/400', link: '#' },
  { id: 5, title: 'Blog Platform', tags: 'HTML · CSS · JS', cat: ['html', 'js'], img: 'https://picsum.photos/seed/blog5/600/400', link: '#' },
  { id: 6, title: 'Restaurant App', tags: 'React · CSS', cat: ['react'], img: 'https://picsum.photos/seed/rest6/600/400', link: '#' },
];

const DEFAULT_BLOGS = [
  {
    id: 1,
    title: 'Why I Chose Frontend Development',
    date: 'May 20, 2026',
    category: 'Career',
    excerpt: 'My journey into frontend development started with curiosity and grew into a passion for building beautiful web experiences.',
    content: 'My journey into frontend development started with curiosity and grew into a passion for building beautiful web experiences. I discovered that combining design and code was exactly what I loved doing.',
    img: 'https://picsum.photos/seed/blog1/600/400',
  },
  {
    id: 2,
    title: 'What I Learned from My First React Project',
    date: 'May 25, 2026',
    category: 'React',
    excerpt: 'Building my first React project taught me so much about components, state, and the power of modern JavaScript frameworks.',
    content: 'Building my first React project taught me so much about components, state, and the power of modern JavaScript frameworks. React changed the way I think about UI development.',
    img: 'https://picsum.photos/seed/blog2/600/400',
  },
  {
    id: 3,
    title: 'Top 5 CSS Tips Every Developer Should Know',
    date: 'May 28, 2026',
    category: 'CSS',
    excerpt: 'CSS can be tricky but these 5 tips will make your styling faster, cleaner, and more professional.',
    content: 'CSS can be tricky but these 5 tips will make your styling faster, cleaner, and more professional. From flexbox to CSS variables, mastering these concepts will level up your frontend skills.',
    img: 'https://picsum.photos/seed/blog3/600/400',
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: 'John Smith',
    role: 'CEO, TechStart',
    message: 'David delivered an exceptional website for our company. His attention to detail and clean code is impressive. Highly recommended!',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=00b4d8&color=fff&bold=true',
    stars: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    message: 'Working with David was a great experience. He understood our requirements perfectly and delivered beyond expectations.',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0096c7&color=fff&bold=true',
    stars: 5,
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Startup Founder',
    message: 'David built our landing page and it looks absolutely stunning. Very professional, responsive, and fast. Will work with him again!',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=007ea7&color=fff&bold=true',
    stars: 5,
  },
];

// Helper: load from localStorage or use default
function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Helper: save to localStorage
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('Could not save to localStorage');
  }
}

export function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [projects, setProjects] = useState(() =>
    loadFromStorage('portfolio_projects', DEFAULT_PROJECTS)
  );

  const [blogs, setBlogs] = useState(() =>
    loadFromStorage('portfolio_blogs', DEFAULT_BLOGS)
  );

  const [testimonials, setTestimonials] = useState(() =>
    loadFromStorage('portfolio_testimonials', DEFAULT_TESTIMONIALS)
  );

  // Save projects to localStorage whenever they change
  useEffect(() => {
    saveToStorage('portfolio_projects', projects);
  }, [projects]);

  // Save blogs to localStorage whenever they change
  useEffect(() => {
    saveToStorage('portfolio_blogs', blogs);
  }, [blogs]);

  // Save testimonials to localStorage whenever they change
  useEffect(() => {
    saveToStorage('portfolio_testimonials', testimonials);
  }, [testimonials]);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsLoggedIn(false);

  // PROJECTS
  const addProject = (project) => {
    setProjects(prev => [...prev, {
      ...project,
      id: Date.now(),
      cat: Array.isArray(project.cat) ? project.cat : [project.cat]
    }]);
  };

  const deleteProject = (id) =>
    setProjects(prev => prev.filter(p => p.id !== id));

  const updateProject = (id, updated) =>
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));

  // BLOGS
  const addBlog = (blog) => {
    setBlogs(prev => [...prev, {
      ...blog,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    }]);
  };

  const deleteBlog = (id) =>
    setBlogs(prev => prev.filter(b => b.id !== id));

  // TESTIMONIALS
  const addTestimonial = (testimonial) => {
    setTestimonials(prev => [...prev, {
      ...testimonial,
      id: Date.now(),
      stars: Number(testimonial.stars),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=00b4d8&color=fff&bold=true`
    }]);
  };

  const deleteTestimonial = (id) =>
    setTestimonials(prev => prev.filter(t => t.id !== id));

  // RESET to defaults
  const resetAll = () => {
    setProjects(DEFAULT_PROJECTS);
    setBlogs(DEFAULT_BLOGS);
    setTestimonials(DEFAULT_TESTIMONIALS);
    localStorage.removeItem('portfolio_projects');
    localStorage.removeItem('portfolio_blogs');
    localStorage.removeItem('portfolio_testimonials');
  };

  return (
    <AdminContext.Provider value={{
      isLoggedIn, login, logout,
      projects, addProject, deleteProject, updateProject,
      blogs, addBlog, deleteBlog,
      testimonials, addTestimonial, deleteTestimonial,
      resetAll,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);

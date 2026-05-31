import React, { useEffect, useRef, useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import './Blog.css';

export default function Blog() {
  const { blogs } = useAdmin();
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section section-alt" id="blog" ref={ref}>
      <div className="section__container">
        <span className="section__tag reveal">My Thoughts</span>
        <h2 className="section__title reveal">Blog <span>Posts</span></h2>
        <div className="section__line reveal" />

        <div className="blog__grid">
          {blogs.map((post, i) => (
            <div key={post.id} className={`blog-card reveal delay-${(i % 3) + 1}`}>
              <div className="blog-card__img">
                <img src={post.img} alt={post.title} loading="lazy" />
                <span className="blog-card__cat">{post.category}</span>
              </div>
              <div className="blog-card__body">
                <span className="blog-card__date">
                  <i className="fas fa-calendar-alt" /> {post.date}
                </span>
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <button
                  className="blog-card__btn"
                  onClick={() => setSelected(post)}
                >
                  Read More <i className="fas fa-arrow-right" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="blog-modal" onClick={() => setSelected(null)}>
          <div className="blog-modal__box" onClick={e => e.stopPropagation()}>
            <button className="blog-modal__close" onClick={() => setSelected(null)}>
              <i className="fas fa-times" />
            </button>
            <img src={selected.img} alt={selected.title} />
            <div className="blog-modal__content">
              <span className="blog-card__cat">{selected.category}</span>
              <h2>{selected.title}</h2>
              <span className="blog-card__date">
                <i className="fas fa-calendar-alt" /> {selected.date}
              </span>
              <p>{selected.content}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

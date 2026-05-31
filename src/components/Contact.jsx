import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase';
import './Contact.css';
import emailjs from 'emailjs-com';

const INFO = [
  { icon: 'fas fa-envelope', title: 'Email', value: 'davidlovemathematics@gmail.com' },
  { icon: 'fas fa-map-marker-alt', title: 'Location', value: 'Nigeria' },
  { icon: 'fas fa-clock', title: 'Availability', value: 'Mon – Sat, 9am – 6pm WAT' },
  { icon: 'fas fa-phone', title: 'Phone / WhatsApp', value: 'Available on request' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
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

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setError('');

    // Save to Supabase
    const { error } = await supabase.from('contacts').insert([{
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    }]);

    if (error) {
      setSending(false);
      setError('Something went wrong. Please try again!');
    } else {
      // Send email notification via EmailJS
      emailjs.send(
        'service_5bhh0j7',
        'template_6aq78tj',
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        'KFhSffXmrwysGs57O'
      );

      setSending(false);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="section__container">
        <span className="section__tag reveal">Get In Touch</span>
        <h2 className="section__title reveal">Contact <span>Me</span></h2>
        <div className="section__line reveal" />

        <div className="contact__inner">
          {/* Info */}
          <div className="contact__info">
            {INFO.map((item, i) => (
              <div key={item.title} className={`contact__info-item reveal delay-${i + 1}`}>
                <div className="contact__icon">
                  <i className={item.icon} />
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form className="contact__form reveal delay-1" onSubmit={handleSubmit}>
            <div className="contact__form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name" name="name" type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  id="email" name="email" type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject" name="subject" type="text"
                placeholder="Project Inquiry"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message" name="message" rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending
                ? <><i className="fas fa-spinner fa-spin" /> Sending…</>
                : <><i className="fas fa-paper-plane" /> Send Message</>
              }
            </button>

            {success && (
              <div className="contact__success">
                <i className="fas fa-check-circle" /> Message sent! I'll get back to you soon.
              </div>
            )}

            {error && (
              <div className="contact__error">
                <i className="fas fa-exclamation-circle" /> {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
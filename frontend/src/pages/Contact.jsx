import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="landing-page">
            <header className="navbar flex-between" style={{ background: '#0f172a', color: 'white', borderBottom: 'none' }}>
                <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none' }}>
                    ExpenseFlow
                </Link>
                <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" style={{ color: 'white', fontWeight: 500 }}>Home</Link>
                    <Link to="/login" style={{ color: 'white', fontWeight: 500 }}>Log In</Link>
                    <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
                        Get Started
                    </Link>
                </nav>
            </header>

            <section className="container flex-center" style={{ padding: '5rem 0', minHeight: 'calc(100vh - 80px)' }}>
                <div style={{ background: 'var(--secondary-bg)', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', maxWidth: '900px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-blue-dark)', marginBottom: '1rem' }}>Get in Touch</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                            Have a question or want to see a demo? Fill out the form and our team will get back to you shortly.
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--accent-yellow)' }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem', color: 'var(--text-main)' }}>Email</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>info@expenseflow.com</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--accent-blue)' }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem', color: 'var(--text-main)' }}>Phone</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>+1-800-555-0199<br />+1-800-555-0198</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--accent-green)' }}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem', color: 'var(--text-main)' }}>Office</h4>
                                    <p style={{ color: 'var(--text-muted)' }}>10009 Mount Tabor Road<br />Odessa, Missouri<br />United States</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Full Name</label>
                            <input type="text" className="form-control" placeholder="John Doe" required style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Email Address</label>
                            <input type="email" className="form-control" placeholder="john@company.com" required style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Message</label>
                            <textarea className="form-control" rows="4" placeholder="How can we help you?" required style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', resize: 'vertical' }}></textarea>
                        </div>
                        <button type="button" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;

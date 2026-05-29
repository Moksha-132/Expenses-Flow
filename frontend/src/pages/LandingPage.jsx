import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Zap, Mail, Phone, MapPin, Menu, X } from 'lucide-react';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="landing-page">
            <header className="navbar flex-between" style={{ background: '#0f172a', color: 'white', borderBottom: 'none' }}>
                <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ExpenseFlow
                </div>
                <button 
                    className="mobile-menu-btn" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <nav className={`desktop-nav ${isMenuOpen ? 'mobile-open' : ''}`} style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="#about" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', fontWeight: 500 }}>About</a>
                    <a href="#features" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', fontWeight: 500 }}>Features</a>
                    <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', fontWeight: 500 }}>How It Works</a>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', fontWeight: 500 }}>Contact</Link>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', fontWeight: 500 }}>Log In</Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
                        Get Started
                    </Link>
                </nav>
            </header>

            <section style={{ position: 'relative', minHeight: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4" type="video/mp4" />
                </video>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.9))', zIndex: 1 }}></div>
                
                <div className="container flex-center" style={{ position: 'relative', zIndex: 2, textAlign: 'center', flexDirection: 'column' }}>
                    <h1 style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', color: 'white' }}>
                        The Ultimate Expense Hub <br />
                        for modern <span style={{ color: 'var(--accent-yellow)' }}>teams.</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                        Connect with your employees, manage reimbursements, and scale your business with ease. Managers approve the best expenses, and you reap the benefits.
                    </p>
                    <div className="flex-center" style={{ gap: '1rem' }}>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                            Get Started Now <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            <section id="about" style={{ background: 'var(--secondary-bg)', padding: '5rem 0' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-blue-dark)', marginBottom: '1.5rem' }}>About ExpenseFlow</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                        ExpenseFlow was built out of the necessity to simplify corporate spending. We noticed that companies spent way too much time managing endless paper trails, manual approvals, and disjointed systems.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                        Our platform unifies the entire expense process from employee submission to manager approval and final payout. We believe that internal tools should look as good and work as seamlessly as the consumer apps you use every day.
                    </p>
                </div>
            </section>

            <section id="features" style={{ background: '#0f172a', padding: '5rem 0', color: 'white' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>Why Choose ExpenseFlow?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)' }}>Everything you need to manage your business expenses.</p>
                    </div>
                    
                    <div className="grid-cards">
                        <div className="glass-panel feature-card" style={{ padding: '2.5rem 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.5rem', background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lightning Fast</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>Submit and approve expenses in seconds, not days. Keep your team moving seamlessly without the traditional paperwork bottleneck.</p>
                        </div>
                        <div className="glass-panel feature-card" style={{ padding: '2.5rem 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.5rem', background: 'linear-gradient(135deg, #facc15, #eab308)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Secure & Reliable</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>Enterprise-grade security for your financial data and receipts. Your business expenses are encrypted and stored safely in the cloud.</p>
                        </div>
                        <div className="glass-panel feature-card" style={{ padding: '2.5rem 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.5rem', background: 'linear-gradient(135deg, #34d399, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Easy Tracking</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>Get real-time updates on expense statuses from pending to paid. Both managers and employees have full visibility into the timeline.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-it-works" style={{ background: 'var(--secondary-bg)', padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-blue-dark)' }}>How It Works</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Simple steps to streamline your workflow.</p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                        <div>
                            <div style={{ background: 'var(--accent-yellow)', color: 'var(--text-main)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 auto 1.5rem' }}>1</div>
                            <h3 style={{ marginBottom: '1rem' }}>Submit Expense</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Employees log in, fill out the amount, and upload the receipt.</p>
                        </div>
                        <div>
                            <div style={{ background: 'var(--accent-blue)', color: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 auto 1.5rem' }}>2</div>
                            <h3 style={{ marginBottom: '1rem' }}>Manager Reviews</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Managers get notified, review details, and approve or reject the request.</p>
                        </div>
                        <div>
                            <div style={{ background: 'var(--accent-green)', color: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 auto 1.5rem' }}>3</div>
                            <h3 style={{ marginBottom: '1rem' }}>Get Reimbursed</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Once approved, expenses are marked as paid and the employee gets their money back.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer style={{ background: '#0f172a', color: 'white', paddingTop: '4rem', paddingBottom: '1.5rem' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', gap: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '3rem', marginBottom: '1.5rem' }}>
                    <div>
                        <div className="nav-brand" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            EXPENSEFLOW
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: '400px' }}>
                            Transform your expense management with a unified platform that connects employees and managers in one consistent experience.
                        </p>
                    </div>
                    
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</a></li>
                            <li><a href="#features" style={{ color: 'rgba(255,255,255,0.7)' }}>Features</a></li>
                            <li><Link to="/contact" style={{ color: 'rgba(255,255,255,0.7)' }}>Contact Us</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Contact & Support</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'rgba(255,255,255,0.7)' }}>
                                <Mail size={20} color="var(--accent-yellow)" style={{ flexShrink: 0 }} />
                                <span>info@expenseflow.com</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'rgba(255,255,255,0.7)' }}>
                                <Phone size={20} color="var(--accent-yellow)" style={{ flexShrink: 0 }} />
                                <span>+1-800-555-0199<br />+1-800-555-0198</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'rgba(255,255,255,0.7)' }}>
                                <MapPin size={20} color="var(--accent-yellow)" style={{ flexShrink: 0 }} />
                                <span>10009 Mount Tabor Road, City,<br />Odessa<br />Missouri, United States</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="container" style={{ paddingTop: 0, paddingBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                    <div>© 2026 ExpenseFlow. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy Policy</Link>
                        <Link to="/terms" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms & Conditions</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

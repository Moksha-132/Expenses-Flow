import React from 'react';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
    return (
        <div className="animate-fade-in" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
            <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }}>
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4" type="video/mp4" />
            </video>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.75)', zIndex: -1 }}></div>

            <header className="navbar" style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
                    <Link to="/" className="nav-brand" style={{ textDecoration: 'none', color: 'white' }}>EXPENSEFLOW</Link>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    </div>
                </div>
            </header>

            <main className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 24px 40px -10px rgba(0,0,0,0.5)', padding: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#60a5fa', textAlign: 'center' }}>Terms & Conditions</h1>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.9)' }}>
                        <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '1rem' }}>Last updated: May 2026</p>
                        
                        <h2 style={{ color: 'white', fontSize: '1.25rem', marginTop: '1rem' }}>1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using ExpenseFlow, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                        
                        <h2 style={{ color: 'white', fontSize: '1.25rem', marginTop: '1rem' }}>2. User Accounts</h2>
                        <p>
                            To use our platform, you must register for an account. You agree to provide accurate and complete information and keep this information up to date. You are solely responsible for maintaining the confidentiality of your account credentials.
                        </p>
                        
                        <h2 style={{ color: 'white', fontSize: '1.25rem', marginTop: '1rem' }}>3. Use of Service</h2>
                        <p>
                            You agree to use the Service only for lawful purposes. You must not use the Service to submit fraudulent expense claims, upload malicious software, or attempt to gain unauthorized access to our systems.
                        </p>

                        <h2 style={{ color: 'white', fontSize: '1.25rem', marginTop: '1rem' }}>4. Intellectual Property</h2>
                        <p>
                            The Service and its original content, features, and functionality are owned by ExpenseFlow and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                        </p>

                        <h2 style={{ color: 'white', fontSize: '1.25rem', marginTop: '1rem' }}>5. Termination</h2>
                        <p>
                            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                        </p>

                        <h2 style={{ color: 'white', fontSize: '1.25rem', marginTop: '1rem' }}>6. Limitation of Liability</h2>
                        <p>
                            In no event shall ExpenseFlow, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TermsConditions;

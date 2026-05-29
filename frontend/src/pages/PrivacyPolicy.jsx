import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#60a5fa', textAlign: 'center' }}>Privacy Policy</h1>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.9)' }}>
                        <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '1rem' }}>Last updated: May 2026</p>
                        
                        <h2 style={{ color: 'white', fontSize: '1.25rem', marginTop: '1rem' }}>1. Information We Collect</h2>
                        <p>
                            When you use ExpenseFlow, we collect information that you provide directly to us, such as your name, email address, role, and the contents of any expenses you submit, including receipts and transaction data.
                        </p>
                        
                        <h2 style={{ color: 'white', fontSize: '1.25rem', marginTop: '1rem' }}>2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to operate, maintain, and provide you with the features and functionality of the Service. We also use this information to communicate with you, such as sending you password reset emails or notifications about expense approvals.
                        </p>
                        
                        <h2 style={{ color: 'white', fontSize: '1.25rem', marginTop: '1rem' }}>3. Data Security</h2>
                        <p>
                            We care about the security of your information and use commercially reasonable safeguards to preserve the integrity and security of all information collected through the Service. However, no security system is impenetrable and we cannot guarantee the security of our systems 100%.
                        </p>

                        <h2 style={{ color: 'white', fontSize: '1.25rem', marginTop: '1rem' }}>4. Sharing of Information</h2>
                        <p>
                            Your expense data is shared with managers within your organization who are authorized to review and approve your submissions. We do not sell, rent, or share your personal information with third parties for their commercial use.
                        </p>

                        <h2 style={{ color: 'white', fontSize: '1.25rem', marginTop: '1rem' }}>5. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;

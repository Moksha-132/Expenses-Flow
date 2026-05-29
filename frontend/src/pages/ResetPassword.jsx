import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Hash, ShieldCheck } from 'lucide-react';
import { API_URL } from '../config';

const ResetPassword = () => {
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const res = await fetch(`${API_URL}/api/reset-password/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token, newPassword })
            });
            const data = await res.json();
            
            if (res.ok) {
                setMessage('Password reset successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data.error || 'Failed to reset password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex-center animate-fade-in" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_110052_2e127257-5236-40b1-ba48-4690260f1185.mp4" type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', zIndex: 1 }}></div>

            <Link to="/login" style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'white', zIndex: 3, textDecoration: 'none' }}>
                &larr; Back to Login
            </Link>
            
            <div style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', position: 'relative', zIndex: 2, background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 24px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="flex-center" style={{ background: 'rgba(168, 85, 247, 0.2)', width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 1rem', color: '#c084fc' }}>
                            <ShieldCheck size={32} />
                        </div>
                        <h2 style={{ fontSize: '1.75rem', color: 'white', marginBottom: '0.5rem' }}>Reset Password</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Enter the code sent to your email</p>
                    </div>
                    
                    {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)' }}>{error}</div>}
                    {message && <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.3)' }}>{message}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'white' }}>Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required readOnly={!!location.state?.email} style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', opacity: location.state?.email ? 0.7 : 1 }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'white' }}>Reset Code</label>
                            <div style={{ position: 'relative' }}>
                                <Hash size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }} />
                                <input type="text" value={token} onChange={e => setToken(e.target.value.toUpperCase())} required placeholder="6-character code" maxLength="6" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', letterSpacing: '2px', textTransform: 'uppercase' }} />
                            </div>
                        </div>
                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'white' }}>New Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }} />
                                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required placeholder="••••••••" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', background: '#a855f7' }}>Update Password</button>
                    </form>
                </div>
        </div>
    );
};

export default ResetPassword;

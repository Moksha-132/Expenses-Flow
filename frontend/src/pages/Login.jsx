import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Phone, MapPin } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user) {
            if (user.role === 'manager') navigate('/manager');
            else navigate('/employee');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (!success) {
            setError('Invalid credentials. Please check your username and password.');
        }
    };

    return (
        <div className="flex-center animate-fade-in" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_110052_2e127257-5236-40b1-ba48-4690260f1185.mp4" type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', zIndex: 1 }}></div>

            <Link to="/" style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'white', zIndex: 3, textDecoration: 'none' }}>
                &larr; Back to Home
            </Link>
            
            <div style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', position: 'relative', zIndex: 2, background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 24px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="flex-center" style={{ background: 'rgba(59, 130, 246, 0.2)', width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 1rem', color: '#60a5fa' }}>
                            <LogIn size={32} />
                        </div>
                        <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '0.5rem' }}>Welcome Back</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)' }}>Login to manage expenses</p>
                    </div>
                    
                    {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'white' }}>Username or Email</label>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'white' }}>Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                        </div>
                        <div style={{ textAlign: 'right', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                            <Link to="/forgot-password" style={{ color: '#60a5fa', textDecoration: 'none' }}>Forgot Password?</Link>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign In</button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                        Don't have an account? <Link to="/register" style={{ color: '#60a5fa', fontWeight: 500, textDecoration: 'none' }}>Sign Up</Link>
                    </div>
                </div>
        </div>
    );
};

export default Login;

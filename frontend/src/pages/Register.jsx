import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Phone, MapPin } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user) {
            if (user.role === 'manager') navigate('/manager');
            else navigate('/employee');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role })
            });
            const data = await res.json();
            if (res.ok) {
                navigate('/login');
            } else {
                setError(data.error || 'Registration failed');
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

            <Link to="/" style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'white', zIndex: 3, textDecoration: 'none' }}>
                &larr; Back to Home
            </Link>
            
            <div style={{ width: '100%', maxWidth: '400px', padding: '1.5rem 2rem', position: 'relative', zIndex: 2, background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 24px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <div className="flex-center" style={{ background: 'rgba(16, 185, 129, 0.2)', width: '56px', height: '56px', borderRadius: '50%', margin: '0 auto 0.5rem', color: 'var(--accent-green)' }}>
                            <UserPlus size={28} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.25rem' }}>Create Account</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Sign up to manage expenses</p>
                    </div>
                    
                    {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '0.5rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)' }}>{error}</div>}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, color: 'white', fontSize: '0.9rem' }}>Username</label>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, color: 'white', fontSize: '0.9rem' }}>Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, color: 'white', fontSize: '0.9rem' }}>Role</label>
                            <select value={role} onChange={e => setRole(e.target.value)} required style={{ width: '100%', padding: '0.6rem', background: 'rgba(15, 23, 42, 0.8)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                                <option value="employee">Employee</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, color: 'white', fontSize: '0.9rem' }}>Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', fontWeight: 600, background: '#f59e0b', color: '#451a03', border: 'none' }}>
                            Sign Up
                        </button>
                        
                        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                            Already have an account? <Link to="/login" style={{ color: '#60a5fa', fontWeight: 500, textDecoration: 'none' }}>Log In</Link>
                        </div>
                    </form>
                </div>
        </div>
    );
};

export default Register;

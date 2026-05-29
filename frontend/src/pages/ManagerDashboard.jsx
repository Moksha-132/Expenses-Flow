import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../config';
import { LogOut, Filter, Check, X, CreditCard, ExternalLink } from 'lucide-react';
import { requestNotificationPermission, sendDesktopNotification } from '../utils/notifications';

const ManagerDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState('All');

    const fetchExpenses = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/expenses`);
            setExpenses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchExpenses();
        requestNotificationPermission();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.patch(`${API_URL}/api/expenses/${id}/status`, { status });
            fetchExpenses();
            sendDesktopNotification('Status Updated', { body: `Expense status marked as ${status}` });
        } catch (err) {
            console.error(err);
        }
    };

    const filteredExpenses = filter === 'All' ? expenses : expenses.filter(e => e.status === filter);

    return (
        <div className="animate-fade-in" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
            <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }}>
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_101827_abebfeec-f243-466b-b494-7f6814c0fbbf.mp4" type="video/mp4" />
            </video>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.5)', zIndex: -1 }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <nav className="navbar flex-between" style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                    <a href="/" className="nav-brand" style={{ color: 'white', textDecoration: 'none' }}>ExpenseFlow (Manager)</a>
                    <div className="flex-center" style={{ gap: '1rem' }}>
                        <span>Hello, {user?.username}</span>
                        <button className="btn btn-secondary" onClick={logout} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}>
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </nav>

            <div className="container">
                <div className="flex-between" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: 'white' }}>All Expenses</h2>
                    <div className="flex-center" style={{ gap: '0.5rem' }}>
                        <Filter size={18} color="white" />
                        <select className="input-field" style={{ width: 'auto', padding: '0.5rem 2rem 0.5rem 1rem' }} value={filter} onChange={e => setFilter(e.target.value)}>
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    {filteredExpenses.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            No expenses found for the selected filter.
                        </div>
                    ) : (
                        <div className="table-container">
                            <table style={{ minWidth: '800px' }}>
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Date & Time</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Ref Number</th>
                                        <th>Status</th>
                                        <th>Notes</th>
                                        <th>Bill</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredExpenses.map(exp => (
                                        <tr key={exp.id}>
                                            <td><div style={{ fontWeight: 500 }}>{exp.username}</div></td>
                                            <td>{new Date(exp.date_time || exp.created_at).toLocaleString()}</td>
                                            <td>{exp.expense_category}</td>
                                            <td><strong style={{ color: 'var(--text-main)' }}>${exp.amount.toFixed(2)}</strong></td>
                                            <td>{exp.reference_number || '-'}</td>
                                            <td>
                                                <span className={`badge ${exp.status.toLowerCase()}`}>{exp.status}</span>
                                            </td>
                                            <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={exp.notes}>
                                                {exp.notes || '-'}
                                            </td>
                                            <td>
                                                {exp.receipt_url ? (
                                                    <a href={`${API_URL}${exp.receipt_url}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <ExternalLink size={14} /> Link
                                                    </a>
                                                ) : (
                                                    <span style={{ color: 'var(--text-muted)' }}>N/A</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start' }}>
                                                    {exp.status === 'Pending' && (
                                                        <>
                                                            <button className="btn btn-success" style={{ padding: '0.4rem', borderRadius: '6px' }} onClick={() => updateStatus(exp.id, 'Approved')} title="Approve">
                                                                <Check size={16} />
                                                            </button>
                                                            <button className="btn btn-danger" style={{ padding: '0.4rem', borderRadius: '6px' }} onClick={() => updateStatus(exp.id, 'Rejected')} title="Reject">
                                                                <X size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                    {exp.status === 'Approved' && (
                                                        <button className="btn btn-primary" style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem' }} onClick={() => updateStatus(exp.id, 'Paid')} title="Mark as Paid">
                                                            <CreditCard size={14} style={{ marginRight: '4px' }}/> Pay
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;

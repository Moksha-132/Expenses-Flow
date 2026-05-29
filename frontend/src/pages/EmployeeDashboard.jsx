import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../config';
import { DollarSign, CheckCircle, Clock, CreditCard, Plus, LogOut, Upload } from 'lucide-react';
import { requestNotificationPermission, sendDesktopNotification } from '../utils/notifications';

const EmployeeDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    
    const [expenseCategory, setExpenseCategory] = useState('');
    const [otherCategory, setOtherCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [receipt, setReceipt] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const category = expenseCategory === 'Other' ? otherCategory : expenseCategory;
        formData.append('expense_category', category);
        formData.append('amount', amount);
        formData.append('date_time', dateTime);
        formData.append('reference_number', referenceNumber);
        formData.append('notes', notes);
        if (receipt) formData.append('receipt', receipt);

        try {
            await axios.post(`${API_URL}/api/expenses`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setShowForm(false);
            setExpenseCategory('');
            setOtherCategory('');
            setAmount('');
            setDateTime('');
            setReferenceNumber('');
            setNotes('');
            setReceipt(null);
            fetchExpenses();
            sendDesktopNotification('Expense Submitted', { body: `Successfully submitted $${amount} for ${category}` });
        } catch (err) {
            console.error(err);
        }
    };

    const stats = {
        total: expenses.length,
        approved: expenses.filter(e => e.status === 'Approved').length,
        pending: expenses.filter(e => e.status === 'Pending').length,
        paid: expenses.filter(e => e.status === 'Paid').length
    };

    return (
        <div className="animate-fade-in" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
            <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }}>
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_101827_abebfeec-f243-466b-b494-7f6814c0fbbf.mp4" type="video/mp4" />
            </video>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.5)', zIndex: -1 }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <nav className="navbar flex-between" style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                    <a href="/" className="nav-brand" style={{ color: 'white', textDecoration: 'none' }}>ExpenseFlow</a>
                    <div className="flex-center" style={{ gap: '1rem' }}>
                        <span>Hello, {user?.username}</span>
                        <button className="btn btn-secondary" onClick={logout} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}>
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </nav>

                <div className="container">
                <div className="flex-between" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: 'white' }}>Employee Dashboard</h2>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        <Plus size={18} /> Add Expense
                    </button>
                </div>

                <div className="grid-cards" style={{ marginBottom: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-blue)', padding: '1rem', borderRadius: '12px' }}>
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Expenses</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.total}</div>
                        </div>
                    </div>
                    
                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-yellow)', padding: '1rem', borderRadius: '12px' }}>
                            <Clock size={24} />
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pending</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.pending}</div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-green)', padding: '1rem', borderRadius: '12px' }}>
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Approved</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.approved}</div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-purple)', padding: '1rem', borderRadius: '12px' }}>
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Paid</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.paid}</div>
                        </div>
                    </div>
                </div>

                {showForm && (
                    <div className="glass-panel animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Add New Expense</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Expense Category <span style={{color: 'red'}}>*</span></label>
                                <select className="input-field" value={expenseCategory} onChange={e => setExpenseCategory(e.target.value)} required>
                                    <option value="" disabled>Select Expense Category...</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Meals">Meals</option>
                                    <option value="Supplies">Supplies</option>
                                    <option value="Other">Other</option>
                                </select>
                                {expenseCategory === 'Other' && (
                                    <input 
                                        type="text" 
                                        className="input-field" 
                                        style={{ marginTop: '0.75rem' }} 
                                        value={otherCategory} 
                                        onChange={e => setOtherCategory(e.target.value)} 
                                        placeholder="Please specify other category" 
                                        required 
                                    />
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Amount <span style={{color: 'red'}}>*</span></label>
                                <input type="number" step="0.01" className="input-field" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="Please Enter Amount" />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Date Time <span style={{color: 'red'}}>*</span></label>
                                <input type="datetime-local" className="input-field" value={dateTime} onChange={e => setDateTime(e.target.value)} required />
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Reference Number</label>
                                <input type="text" className="input-field" value={referenceNumber} onChange={e => setReferenceNumber(e.target.value)} placeholder="Please Enter Reference Number" />
                            </div>
                            <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}>
                                <label className="form-label">Expense Bill (Optional)</label>
                                <div className="input-field" style={{ display: 'flex', alignItems: 'center', padding: '0' }}>
                                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', width: '100%' }}>
                                        <Upload size={18} color="var(--accent-blue)" />
                                        <span style={{ color: receipt ? 'var(--text-main)' : 'var(--text-muted)' }}>
                                            {receipt ? receipt.name : 'Upload'}
                                        </span>
                                        <input type="file" style={{ display: 'none' }} onChange={e => setReceipt(e.target.files[0])} accept="image/*,.pdf" />
                                    </label>
                                </div>
                            </div>
                            <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: 0 }}>
                                <label className="form-label">Notes</label>
                                <textarea className="input-field" rows="3" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Please Enter Notes" style={{ resize: 'vertical' }}></textarea>
                            </div>
                            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Expense History</h3>
                    {expenses.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            No expenses found. Submit your first expense above.
                        </div>
                    ) : (
                        <div className="table-container">
                            <table style={{ minWidth: '800px' }}>
                                <thead>
                                    <tr>
                                        <th>Date & Time</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Ref Number</th>
                                        <th>Status</th>
                                        <th>Notes</th>
                                        <th>Bill</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map(exp => (
                                        <tr key={exp.id}>
                                            <td>{new Date(exp.date_time || exp.created_at).toLocaleString()}</td>
                                            <td>{exp.expense_category}</td>
                                            <td>${exp.amount.toFixed(2)}</td>
                                            <td>{exp.reference_number || '-'}</td>
                                            <td>
                                                <span className={`badge ${exp.status.toLowerCase()}`}>{exp.status}</span>
                                            </td>
                                            <td style={{ maxWidth: '250px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                                {exp.notes || '-'}
                                            </td>
                                            <td>
                                                {exp.receipt_url ? (
                                                    <a href={`${API_URL}${exp.receipt_url}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <Upload size={14} /> View
                                                    </a>
                                                ) : (
                                                    <span style={{ color: 'var(--text-muted)' }}>N/A</span>
                                                )}
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

export default EmployeeDashboard;

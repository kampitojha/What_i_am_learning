import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const requestDelete = async (userId) => {
        if(!window.confirm("Are you sure you want to request DELETION for this user?")) return;
        try {
            const { data } = await api.post('/admin/request-delete-user', { userId });
            setMessage(data.message);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setMessage("Failed to send request");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user?.username} ({user?.role}) <button onClick={logout}>Logout</button></p>
            
            {message && <div style={{ background: '#dff0d8', padding: '10px', marginBottom: '10px' }}>{message}</div>}

            <h3>All Users</h3>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id}>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                {u.role === 'User' && (
                                    <button onClick={() => requestDelete(u._id)} style={{ background: 'orange', color: 'white' }}>
                                        Request Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;

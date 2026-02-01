import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const SuperAdminDashboard = () => {
    const { user, logout } = useAuth();
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState('');

    const fetchRequests = async () => {
        try {
            const { data } = await api.get('/superadmin/requests');
            setRequests(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleProcess = async (requestId, decision) => {
        try {
            const { data } = await api.post('/superadmin/process-request', { requestId, decision });
            setMessage(data.message);
            fetchRequests(); // Refresh list
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setMessage("Failed to process request");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Super Admin Dashboard</h1>
            <p>Welcome, {user?.username} ({user?.role}) <button onClick={logout}>Logout</button></p>

            {message && <div style={{ background: '#dff0d8', padding: '10px', marginBottom: '10px' }}>{message}</div>}

            <h3>Pending Requests</h3>
            {requests.length === 0 ? <p>No pending requests.</p> : (
                <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Details</th>
                            <th>Requested By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td>{req.actionType}</td>
                                <td>{JSON.stringify(req.details)}</td>
                                <td>{req.requestedBy?.username}</td>
                                <td>
                                    <button 
                                        onClick={() => handleProcess(req._id, 'Approved')} 
                                        style={{ background: 'green', color: 'white', marginRight: '5px' }}>
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => handleProcess(req._id, 'Rejected')} 
                                        style={{ background: 'red', color: 'white' }}>
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SuperAdminDashboard;

import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/user/tasks');
            setTasks(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await api.post('/user/tasks', newTask);
            setNewTask({ title: '', description: '' });
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleComplete = async (taskId) => {
        try {
            await api.put(`/user/tasks/${taskId}`, { status: 'Completed' });
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>User Dashboard</h1>
            <p>Welcome, {user?.username} ({user?.role}) <button onClick={logout}>Logout</button></p>

            <div style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
                <h3>Create Task</h3>
                <form onSubmit={handleCreateTask}>
                    <input 
                        type="text" placeholder="Title" value={newTask.title} 
                        onChange={e => setNewTask({...newTask, title: e.target.value})} required 
                        style={{ marginRight: '10px' }}
                    />
                    <input 
                        type="text" placeholder="Description" value={newTask.description} 
                        onChange={e => setNewTask({...newTask, description: e.target.value})} 
                        style={{ marginRight: '10px' }}
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>

            <h3>My Tasks</h3>
            <ul>
                {tasks.map(task => (
                    <li key={task._id} style={{ marginBottom: '10px' }}>
                        <strong>{task.title}</strong> - {task.status}
                        {task.status !== 'Completed' && (
                            <button onClick={() => handleComplete(task._id)} style={{ marginLeft: '10px' }}>
                                Mark Completed
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;

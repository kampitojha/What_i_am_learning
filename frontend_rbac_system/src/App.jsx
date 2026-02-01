import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<Navigate to="/login" />} />

          {/* User Routes */}
          <Route element={<PrivateRoute roles={['User', 'Admin', 'SuperAdmin']} />}>
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<PrivateRoute roles={['Admin', 'SuperAdmin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* SuperAdmin Routes */}
          <Route element={<PrivateRoute roles={['SuperAdmin']} />}>
            <Route path="/superadmin" element={<SuperAdminDashboard />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

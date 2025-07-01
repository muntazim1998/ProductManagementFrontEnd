import React from 'react';
import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import ForgotPassword from './Components/ForgotPassword';

import {AuthProvider, useAuth} from './Context/AuthContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

function MainRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/*" element={token ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>
  );
}
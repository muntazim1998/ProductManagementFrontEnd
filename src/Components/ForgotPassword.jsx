import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock,User } from 'lucide-react';
import api from '../API/Api';
import { useAuth } from '../Context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <img src="/loginbg.svg" alt="Background" className="absolute inset-0 w-full h-full object-cover -z-10" />
      <div className="relative w-full max-w-md p-8 bg-[#0A1642C4]/70 backdrop-blur-md rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Forgot Password</h2>
        {error && <div className="mb-4 p-2 text-red-600 bg-red-100 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='mb-4 text-white' >Enter registered email address</div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="email" placeholder="email" className="w-full text-white pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <button type="submit" className="w-full mt-6 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-xl hover:scale-105 transition-transform">Send OTP</button>
        </form>
      </div>
    </div>
  );
}

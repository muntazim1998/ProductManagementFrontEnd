import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import api from '../API/Api';

export default function Register() {
  const role = 'User'; // Default role for registration
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if password and re-entered password match
  useEffect(() => {
    setPasswordMismatch(password !== rePassword && rePassword.length > 0);
  }, [password, rePassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/UserAuth/register', {
        username,
        email,
        password,
        role,
      });
      setSuccess('Registered successfully');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <img
        src="/LoginBg.webp"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="relative w-full max-w-md p-8 bg-[#0A1642C4]/70 backdrop-blur-md rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Register</h2>
        {error && (
          <div className="mb-4 p-2 text-red-600 bg-red-100 rounded">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-2 text-green-600 bg-green-100 rounded">{success}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full text-white pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full text-white pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              className="w-full text-white pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute text-white right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showRePassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              className="w-full text-white pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
            <div
              className="absolute text-white right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowRePassword(!showRePassword)}
            >
              {showRePassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          {passwordMismatch && (
            <div className="text-yellow-300 text-sm -mt-2">
              Password and Re-entered password do not match.
            </div>
          )}

          <div className="flex items-center space-x-2 text-white">
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={accepted}
              onChange={() => setAccepted(!accepted)}
            />
            <span>I accept the terms and conditions</span>
          </div>

          <button
            type="submit"
            disabled={!accepted || passwordMismatch}
            className={`w-full cursor-pointer mt-4 font-bold py-3 rounded-xl hover:scale-105 transition-transform ${
              accepted && !passwordMismatch
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-white">
          Already have an account?{' '}
          <span
            className="text-white font-semibold cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

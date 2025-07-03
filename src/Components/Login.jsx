import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import api from "../API/Api";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/UserAuth/login", { username, password });
      login(res.data.accesstoken); // update token in context + localStorage
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accesstoken}`; // set token in axios headers
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Login failed");
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
        <div className="flex justify-center mb-6">
          <img
            src="/LoginLogo.webp"
            alt="Logo"
            className="h-16 w-auto sm:h-20 md:h-24 lg:h-28 object-contain"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Login
        </h2>
        {error && (
          <div className="mb-4 p-2 text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="User name or email address"
              className="w-full text-white pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
          <div
            className="text-right text-sm text-white cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </div>
          <button
            type="submit"
            className="w-full mt-4 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-xl hover:scale-105 transition-transform"
          >
            Sign in
          </button>
        </form>
        <div className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <span
            className="text-white font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}

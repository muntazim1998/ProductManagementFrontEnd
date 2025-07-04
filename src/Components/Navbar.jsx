import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import api from '../API/Api';

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isSticky, setIsSticky] = useState(false);

  // Sticky effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logout handler
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/login');
  };

  // Admin check before creating product
  const handleCreateProduct = async () => {
    try {
      const response = await api.get('/UserAuth/check-admin');
      if (response.data.isAdmin) {
        navigate('/create-product');
      } else {
        toast.error('You are not authorized to create a product');
      }
    } catch (error) {
      toast.error('Error checking admin status');
    }
  };

  return (
    <nav
      className={`z-50 w-full ttransition-all duration-300 ease-in-out ${
        isSticky
          ? 'fixed top-0 backdrop-blur-lg bg-[#0f172a]/90 shadow-md border-b border-white/10'
          : 'bg-gradient-to-r from-[#0f172a]/80 via-[#1e293b]/80 to-[#0f172a]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <img
                src="/LoginLogo.webp"
                alt="Logo"
                className="h-12 w-auto rounded-lg shadow-sm"
              />
            </button>
          </div>

          {/* Title */}
          <div className="text-2xl font-semibold text-white hidden sm:block">
            LAPTOP BONZANA
          </div>

          {/* Right Buttons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={handleCreateProduct}
              className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
            >
              + Add Product
            </button>

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r cursor-pointer from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

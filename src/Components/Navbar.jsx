import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import api from '../API/Api';

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully",);
    navigate('/login');
  };

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
    <nav className="bg-gradient-to-r from-[#0f172a]/80 via-[#1e293b]/80 to-[#0f172a]/80 backdrop-blur-lg shadow-md border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => navigate('/')} className="flex items-center space-x-3 cursor-pointer">
              <img src="/LoginLogo.webp" alt="Logo" className="h-12 w-auto rounded-lg shadow-sm" />
              <span className="text-2xl ml-4 font-bold text-white hidden sm:block tracking-wide">Product Management</span>
            </button>
          </div>

          {/* Right-side Buttons */}
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

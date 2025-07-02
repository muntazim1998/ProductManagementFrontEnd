import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import api from '../API/Api';

const Navbar = () => {


  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  const onclickcreateproduct = async () => {
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
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Product Store
            </Link>
          </div>
          <div className="flex items-center">
            <Link
            onClick={onclickcreateproduct}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add New Product
            </Link>
            <Link
              onClick={handleLogout}
              className="bg-red-400 hover:bg-red-600 ml-6 text-white px-4 py-2 rounded-md"
            >
              LogOut
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

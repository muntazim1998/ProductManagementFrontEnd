import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../API/Api';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/Product');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.get('/UserAuth/check-admin');
      if (response.data.isAdmin) {
        if (window.confirm('Are you sure you want to delete this product?')) {
          try {
            await api.delete(`/Product/${id}`);
            toast.success('Product deleted successfully');
            fetchProducts(); // Refresh list
          } catch (error) {
            console.error('Error deleting product:', error);
          }
        }
      } else {
        toast.error('You are not authorized to delete a product');
      }
    } catch (error) {
      toast.error('Error checking admin status');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-10 px-4">
      <h1 className="text-4xl font-bold text-white text-center mb-10">All Laptop Product Models</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg overflow-hidden transition-transform hover:scale-105"
          >
            {/* Product Image */}
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-3xl"
              />
               
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-white/10 text-white text-sm italic">
                No Image Available
              </div>
            )}
                  
            {/* Product Info */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-2">{product.name || 'Unnamed Product'}</h2>
              <p className="text-white/80 mb-4 text-sm">{product.description || 'No description available'}</p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-400">
                  ₹{product.price?.toLocaleString() || 'N/A'}
                </span>

                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-gradient-to-r cursor-pointer from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../API/Api";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/Product/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await api.get('/UserAuth/check-admin');
      if (response.data.isAdmin) {
        navigate(`/edit-product/${id}`);
      } else {
        toast.error('You are not authorized to edit a product');
      }
    } catch (error) {
      toast.error('Error checking admin status');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.get('/UserAuth/check-admin');
      if (response.data.isAdmin) {
        if (window.confirm("Are you sure you want to delete this product?")) {
          await api.delete(`/Product/${id}`);
          toast.success('Product deleted successfully');
          navigate("/");
        }
      } else {
        toast.error('You are not authorized to delete this product');
      }
    } catch (error) {
      toast.error('Error checking admin status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">

        {/* Image */}
        {product?.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-t-3xl"
          />
          
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-white/10 text-white text-sm italic rounded-t-3xl">
            No Image Available
          </div>
        )}
          
        {/* Content */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-white mb-4">{product?.name}</h1>
          <p className="text-white/80 text-lg mb-6">{product?.description}</p>
          <div className="text-3xl font-bold text-blue-400 mb-8">
            ₹{product?.price?.toLocaleString()}
          </div>

          <div className="flex flex-wrap gap-6">
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r cursor-pointer from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-5 py-2.5 rounded-xl shadow-md transition-transform hover:scale-105"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleEdit}
              className="bg-gradient-to-r cursor-pointer from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl shadow-md transition-transform hover:scale-105"
            >
              Edit Product
            </button>
            <button
              onClick={handleDelete}
              className="bg-gradient-to-r cursor-pointer from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-5 py-2.5 rounded-xl shadow-md transition-transform hover:scale-105"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

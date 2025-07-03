import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../API/Api";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    image: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/Product/${id}`);
      setFormData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Product/${id}`, formData);
      toast.success('Product updated successfully');
      navigate(`/product/${id}`);
    } catch (error) {
      console.error('Error updating product:', error);
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
      <div className="max-w-3xl mx-auto bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Edit Product</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-white">
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-white/80">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-white/80">Description</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-medium text-white/80">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-medium text-white/80">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-transform hover:scale-105"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={() => navigate(`/product/${id}`)}
              className="bg-gradient-to-r cursor-pointer from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-2.5 rounded-xl font-semibold transition-transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

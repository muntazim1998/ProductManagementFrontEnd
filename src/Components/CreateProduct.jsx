import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/Api";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/Product', {
        ...formData,
        price: Number(formData.price),
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Create New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-white mb-2 font-medium">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white mb-2 font-medium">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              rows="4"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-white mb-2 font-medium">Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition hover:scale-105"
            >
              Create Product
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto cursor-pointer  bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

import React from 'react';

import {  Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import ProductDetails from './ProductDetails';
import ProductList from './ProductList';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';


const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </div>
  )
}

export default Dashboard
// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Department from './components/products/Department';
import ProductType from './components/products/ProductType';
import Brand from './components/products/Brand';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import Cart from './components/Cart';
import Navbar from './components/layout/Navbar';
import Checkout from './components/Checkout';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
        <Navbar />
    <CartProvider>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/product-type/:department" element={<ProductType />} />
          <Route path="/brand/:productType" element={<Brand />} />
          <Route path="/products/:brand" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        <Route path="/404" element={<Navigate to="/login" />} />
      </Routes>
      </AuthProvider>
      </CartProvider>

    </Router>

  );
};

export default App;

// frontend/src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/department">Departments</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        {/* Add additional links as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;

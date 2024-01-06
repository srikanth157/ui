// Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

const Cart = () => {
  const { cart, updateCart, removeProductFromCart } = useCart();
  const { userId } = useAuth(); // Assuming useAuth provides the userId and token
console.log(userId)
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/', // Adjust the base URL according to your API endpoint
    headers: {
      Authorization: `Bearer ${userId}`, // Include the token in the Authorization header
    },
  });
  console.log(axiosInstance)

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      // Make a PATCH request to update the quantity of a product in the cart
      await axiosInstance.patch(`carts/update/${productId}`, {
        quantity,
      });

      // Update the cart locally
      updateCart(productId, quantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      // Make a DELETE request to remove a product from the cart
      await axiosInstance.delete(`carts/remove/${productId}`);

      // Remove the product from the cart locally
      removeProductFromCart(productId);
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 16, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty. Start adding some products!</Typography>
      ) : (
        <div>
          <List>
            {cart.map((item) => (
              <ListItem key={item.productId} alignItems="flex-start">
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveProduct(item.productId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" gutterBottom style={{ marginTop: 16 }}>
            Total: ${calculateTotal()}
          </Typography>

          <Link to="/checkout" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      )}
    </Paper>
  );
};

export default Cart;

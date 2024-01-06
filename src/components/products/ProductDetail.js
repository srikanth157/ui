// frontend/src/components/products/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import { useCart } from '../CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {product?.name} Details
      </Typography>
      <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia
          component="img"
          height="1000px"
          width="500"
          image={product?.img}
          alt={product?.name}
          sx={{ objectFit: 'cover', width: '100%' }}
        />
        <div style={{ margin:'100px' }}>
        <CardContent style={{ width: '100%' }}>
          <Typography variant="h5" component="div">
            {product?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product?.description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
            Price: ${product?.price}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddToCart} sx={{ marginTop: 3 }}>
            Add to Cart
          </Button>
        </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;

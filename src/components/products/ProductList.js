// frontend/src/components/products/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';

const ProductList = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/pr/${brand}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [brand]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
      {products.map((product) => (
        <Card key={product._id} sx={{ maxWidth: 300, margin: 2, display: 'flex', flexDirection: 'column' }}>
          {product.img && (
            <CardMedia
              component="img"
              height="140"
              image={product.img}
              alt={`${product.name} product`}
            />
          )}
          <CardContent style={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6">
              {product.name}
            </Typography>
            <Link to={`/product/${product._id}`}>
              <Button variant="contained" color="primary">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;

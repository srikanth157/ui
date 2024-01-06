// frontend/src/components/products/ProductType.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';

const ProductType = () => {
  const { department } = useParams();
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    // Fetch product types based on the selected department from the backend API
    const fetchProductTypes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/productTypes/depart/${department}`);
        setProductTypes(response.data);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProductTypes();
  }, [department]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
      {productTypes.map((productType) => (
        <Card key={productType._id} sx={{ maxWidth: 345, margin: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={productType.img}
            alt={`${productType.name} category`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productType.name}
            </Typography>
            <Link to={`/brand/${productType._id}`}>
              <Button variant="contained" color="primary">
                Explore {productType.name}
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductType;

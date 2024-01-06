// frontend/src/components/products/Brand.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';

const Brand = () => {
  const { productType } = useParams();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch brands based on the selected product type from the backend API
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/brands/br/${productType}`);
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, [productType]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
      {brands.map((brand) => (
        <Card key={brand._id} sx={{ maxWidth: 300, margin: 2, display: 'flex', flexDirection: 'column' }}>
          {brand.img && (
            <CardMedia
              component="img"
              height="140"
              image={brand.img}
              alt={`${brand.name} brand`}
            />
          )}
          <CardContent style={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6">
              {brand.name}
            </Typography>
            <Link to={`/products/${brand._id}`}>
              <Button variant="contained" color="primary">
                Explore {brand.name}
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Brand;

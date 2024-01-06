// frontend/src/components/products/Department.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';

const Department = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch departments from the backend API
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
      {departments.map((department) => (
        <Card key={department._id} sx={{ maxWidth: 345, margin: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={department.img}
            alt={`${department.name} department`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {department.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore the {department.name} department
            </Typography>
            <Link to={`/product-type/${department._id}`}>
              <Button variant="contained" color="primary">
                Explore
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Department;

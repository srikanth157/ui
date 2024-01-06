// frontend/src/components/layout/Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#212121',
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Your Website Name. All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Made with ❤️ by Your Name
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Link href="#" color="inherit" sx={{ marginX: 1 }}>
          Privacy Policy
        </Link>
        <Link href="#" color="inherit" sx={{ marginX: 1 }}>
          Terms of Service
        </Link>
        <Link href="#" color="inherit" sx={{ marginX: 1 }}>
          Contact Us
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;

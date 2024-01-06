// frontend/src/components/layout/Layout.js
import React from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Navbar />
      <Container component="main" sx={{ flexGrow: 1, paddingTop: 2 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;

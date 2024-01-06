// frontend/src/components/Checkout.js
import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Modal, Backdrop, Fade } from '@mui/material';
import axios from 'axios';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
  });

  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/orders/create', formData);
      console.log('Order placed successfully:', response.data);

      // Open success modal
      handleOpenModal();

      // Reset form data or redirect to a success page as needed
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error and display a message to the user
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Paper elevation={3} style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                fullWidth
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Postal Code"
                fullWidth
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                fullWidth
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Place Order
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Success Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <Typography variant="h5" id="transition-modal-title" gutterBottom>
              Order Placed Successfully!
            </Typography>
            <Typography variant="body1" id="transition-modal-description">
              Thank you for your order. You will receive a confirmation shortly.
            </Typography>
            <Button onClick={handleCloseModal} variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Close
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Checkout;

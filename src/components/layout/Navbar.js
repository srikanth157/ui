// Navbar.js
import React, { useState } from 'react';
import { Link ,useLocation} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  InputBase,
  alpha,
  styled,
  Modal,
  Box,
  Button,
} from '@mui/material';
import { Search,ArrowBack, ShoppingCart } from '@mui/icons-material';
import { useCart } from '../CartContext';
import axios from 'axios';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 3),
  },
}));

const Navbar = () => {
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();

  const handleGoBack = () => {
    window.history.back();
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${searchQuery}`);
      setSearchResults(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleSelectItem = (itemId, itemType) => {
    setShowModal(false);
    setSelectedItem({ itemId, itemType });
  };

  return (
    <AppBar position="sticky" sx={{marginBottom:"100px"}}>
      <Toolbar>
      <IconButton color="inherit" onClick={handleGoBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Your Logo
          </Link>
        </Typography>

        <SearchContainer>
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', padding: 1 }}>
            <Search />
          </div>
          <SearchInput
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </SearchContainer>

        <IconButton color="inherit" component={Link} to="/cart">
          {/* Display the cart icon with the number of items in the cart as a badge */}
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        {/* Modal for displaying search results */}
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Search Results
            </Typography>
            <ul>
              {searchResults.products &&
                searchResults.products.length > 0 &&
                searchResults.products.map((product) => (
                  <li key={product._id}>
                    {product.name}{' '}
                    <Button onClick={() => handleSelectItem(product._id, 'product')}>Select</Button>
                  </li>
                ))}
              {searchResults.productTypes &&
                searchResults.productTypes.length > 0 &&
                searchResults.productTypes.map((productType) => (
                  <li key={productType._id}>
                    {productType.name}{' '}
                    <Button onClick={() => handleSelectItem(productType._id, 'productType')}>
                      Select
                    </Button>
                  </li>
                ))}
              {searchResults.departments &&
                searchResults.departments.length > 0 &&
                searchResults.departments.map((department) => (
                  <li key={department._id}>
                    {department.name}{' '}
                    <Button onClick={() => handleSelectItem(department._id, 'department')}>
                      Select
                    </Button>
                  </li>
                ))}
              {searchResults.brands &&
                searchResults.brands.length > 0 &&
                searchResults.brands.map((brand) => (
                  <li key={brand._id}>
                    {brand.name}{' '}
                    <Button onClick={() => handleSelectItem(brand._id, 'brand')}>Select</Button>
                  </li>
                ))}
            </ul>
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

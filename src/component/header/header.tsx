import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toggleFilterLiked, setCards, setLoading, setCurrentPage, setTotalPages } from '../../features/cardSlice';
import { RootState } from '../../store/store.ts';
import { fetchCards, fetchTotalObjects } from '../../API/api.ts';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const filterLiked = useSelector((state: RootState) => state.cards.filterLiked);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigate('/products');
      dispatch(setLoading(true));

      try {
        const totalObjects = await fetchTotalObjects(searchQuery);
        dispatch(setTotalPages(Math.ceil(totalObjects / 21)));
        dispatch(setCurrentPage(1));

        const cards = await fetchCards(1, 21, searchQuery);
        dispatch(setCards({ page: 1, cards }));
      } catch (error) {
        console.error('Ошибка при поиске:', error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const handleFilterLiked = () => {
    if (location.pathname !== '/products') {
      window.location.href = '/products';
    }
    dispatch(toggleFilterLiked());
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f0f4f8',
        padding: '16px 32px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',
        margin: '16px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#607d8b',
          fontWeight: 'bold',
          fontSize: '1.8rem',
          fontFamily: '"Segoe UI", sans-serif',
        }}
      >
        <Link to="/products" style={{ textDecoration: 'none', color: '#607d8b' }}>
          Museum Collection
        </Link>
      </Typography>

      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          label="Поиск..."
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            width: '250px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
            '& .MuiInputLabel-root': {
              color: '#607d8b',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#b2dfdb',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#80cbc4',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#80cbc4',
            },
          }}
        />

        <Link to="/create-product" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#80cbc4',
              color: '#37474f',
              padding: '8px 16px',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#4db6ac',
              },
            }}
          >
            Добавить продукт
          </Button>
        </Link>

        <Button
          onClick={handleFilterLiked}
          variant="contained"
          sx={{
            backgroundColor: filterLiked ? '#ffccbc' : '#b2dfdb',
            color: '#37474f',
            padding: '8px 16px',
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: filterLiked ? '#ffab91' : '#80cbc4',
            },
          }}
        >
          {filterLiked ? 'Вернуться' : 'Избранное'}
        </Button>
      </Box>
    </Box>
  );
};

export default Header;

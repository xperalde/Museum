import { Box, CardContent, CardMedia, IconButton, Card as MuiCard, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FcLike } from 'react-icons/fc'
import { MdDeleteForever } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCard, toggleLike } from '../features/cardSlice'

type CardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isLiked: boolean;
};

const Card: React.FC<CardProps> = ({ id, title, description, imageUrl, isLiked }) => {
  const dispatch = useDispatch();
  
  const handleLike = () => {
    dispatch(toggleLike(id));
  };

  const handleDelete = () => {
    dispatch(deleteCard(id));
  };

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <MuiCard
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <Link to={`/products/${id}`} className="card-link">
        {imageUrl ? (
          <CardMedia
            component="img"
            height="300"
            image={imageUrl}
            alt={title}
            sx={{
              objectFit: 'cover',
              maxHeight: '300px',
              transition: 'opacity 0.3s ease',
              opacity: hovered ? 0.3 : 1,
            }}
          />
        ) : (
          <Box sx={{ height: 200, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2">Изображение отсутствует</Typography>
          </Box>
        )}
          <Box
            sx={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            fontSize: '1.5rem',
            color: '#ffffff',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '10px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '4px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
            }}
            >
            Смотреть подробнее
          </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>{title}</Typography>
          <Typography variant="body1" sx={{ fontSize: '1.3rem' }} color="text.secondary">{description}</Typography>
        </CardContent>
      </Link>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', 
          marginTop: 'auto',
          borderTop: '1px solid #ddd' }}>
        <IconButton
          style={{ filter: isLiked ? 'none' : 'grayscale(100%)', cursor: 'pointer'}}
          onClick={handleLike}
          sx={{ fontSize: 50 }}
        >
          <FcLike />
        </IconButton>
        <IconButton
          sx={{ fontSize: 50, color: 'rgba(244, 67, 54, 0.6)' }}
          onClick={handleDelete}
        >
          <MdDeleteForever />
        </IconButton>
      </Box>
    </MuiCard>
  );
};

export default Card;
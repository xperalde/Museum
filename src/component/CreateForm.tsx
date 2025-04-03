import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCard } from '../features/cardSlice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // Генерация уникальных id

const CreateForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !imageUrl.trim()) {
            alert("Все поля обязательны");
            return;
        }

        const newCard = {
            id: uuidv4(),
            title,
            description,
            imageUrl,
            isLiked: false,
            isCreate: true
        };

        dispatch(addCard(newCard));

        setTitle('');
        setDescription('');
        setImageUrl('');

        navigate('/products');
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '24px',
                maxWidth: '480px',
                margin: '40px auto',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                border: '1px solid #e0e0e0',
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    color: '#607d8b',
                    textAlign: 'center',
                }}
            >
                Создание продукта
            </Typography>

            <TextField
                label="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
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
            <TextField
                label="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                minRows={3}
                required
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
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
            <TextField
                label="Ссылка на изображение"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
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

            <Button
                type="submit"
                variant="contained"
                sx={{
                    backgroundColor: '#80cbc4',
                    color: '#37474f',
                    padding: '10px 20px',
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
                Сохранить
            </Button>
        </Box>
    );
};

export default CreateForm;

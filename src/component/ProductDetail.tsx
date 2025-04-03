import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProductById } from '../API/api'
import { RootState } from '../store/store'
import Preloader from './preloader/Preloader'

interface ProductDetailProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  creator?: string;
  date?: string;
  dimensions?: string;
  isCreate?: boolean;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetailProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const localProduct = useSelector((state: RootState) =>
    Object.values(state.cards.pages)
      .flat()
      .find((item: ProductDetailProps) => item.id === id && item.isCreate === true)
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (localProduct) {
          setProduct(localProduct);
        } else {
          const productData = await fetchProductById(id!);
          setProduct(productData);
        }
      } catch (error) {
        console.error('Ошибка при загрузке продукта:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, localProduct]);

  const handleBackClick = () => {
    navigate('/products');
  };

  if (loading) return <Preloader />;
  if (!product) return <p>Продукт не найден</p>;

  return (
    <Box
      sx={{
        backgroundColor: '#f0f4f8',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        width: '80%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: '#607d8b',
          fontWeight: 'bold',
          fontSize: '2.5rem',
        }}
      >
        {product.title}
      </Typography>

      <Box
        sx={{
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            style={{
              maxWidth: '100%',
              maxHeight: '500px',
              objectFit: 'contain',
              borderRadius: '12px',
            }}
          />
        ) : (
          <Box
            sx={{
              height: '300px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
            }}
          >
            <Typography variant="body2">Изображение отсутствует</Typography>
          </Box>
        )}
      </Box>

      <Typography
        variant="body1"
        sx={{
          fontSize: '1.3rem',
          color: '#607d8b',
        }}
      >
        {product.description}
      </Typography>

      {product.creator && (
        <Typography variant="body2" sx={{ fontSize: '1.2rem', color: '#607d8b' }}>
          <b>Автор:</b> {product.creator}
        </Typography>
      )}

      {product.date && (
        <Typography variant="body2" sx={{ fontSize: '1.2rem', color: '#607d8b' }}>
          <b>Дата создания:</b> {product.date}
        </Typography>
      )}

      {product.dimensions && (
        <Typography variant="body2" sx={{ fontSize: '1.2rem', color: '#607d8b' }}>
          <b>Размеры:</b> {product.dimensions}
        </Typography>
      )}

      <Button
        onClick={handleBackClick}
        variant="contained"
        sx={{
          backgroundColor: '#b2dfdb',
          color:'#37474f',
          padding: '10px 20px',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'none',
          borderRadius: '20px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: '#80cbc4',
          },
        }}
      >
        Вернуться к списку
      </Button>
    </Box>
  );
};

export default ProductDetail;
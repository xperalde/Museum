import { Button, Pagination, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCards, fetchTotalObjects } from '../API/api.ts'
import { setCards, setCurrentPage, setLoading, setTotalPages } from '../features/cardSlice'
import { RootState } from '../store/store'
import Card from './Card'
import Preloader from './preloader/Preloader.tsx'

const PER_PAGE = 21;

const CardList: React.FC = () => {
  const dispatch = useDispatch();
  const { pages, loading, currentPage, totalPages, filterLiked } = useSelector((state: RootState) => state.cards);

  useEffect(() => {
    const getTotalPages = async () => {
      dispatch(setLoading(true));
      const totalObjects = await fetchTotalObjects();
      dispatch(setTotalPages(Math.ceil(totalObjects / PER_PAGE)));
      dispatch(setLoading(false));
    };

    getTotalPages();
  }, [dispatch]);

  useEffect(() => {
    const getCards = async () => {
      dispatch(setLoading(true));
      if (pages[currentPage]) {
        dispatch(setLoading(false));
        return;
      }
      const cardsData = await fetchCards(currentPage, PER_PAGE);
      dispatch(setCards({ page: currentPage, cards: cardsData }));
      dispatch(setLoading(false));
    };

    getCards();
  }, [dispatch, currentPage, pages]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const allCards = Object.values(pages).flat();
  const displayedCards = filterLiked
  ? allCards.filter(card => card.isLiked)
  : pages[currentPage] || [];

  if (loading) {
    return <Preloader />;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', flexGrow: 1, marginBottom: '20px' }}>
      
      {displayedCards.length === 0 && (
        <div style={{ width: '100%', textAlign: 'center', marginTop: '20px', color: '#607d8b' }}>
        <h2>Записи не найдены</h2>
        </div>
      )}

      {displayedCards?.map((card) => (
        <div key={card.id} style={{ width: 'calc(33.33% - 16px)', marginBottom: '16px' }}>
          <Card
            id={card.id}
            imageUrl={card.imageUrl}
            title={card.title}
            description={card.description}
            isLiked={card.isLiked ?? false}
          />
        </div>
      ))}

      {!filterLiked && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
          <Stack direction="row" spacing={2} sx={{ marginBottom: '16px' }}>
            <Button
              variant="outlined"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Назад
            </Button>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value:number) => dispatch(setCurrentPage(value))}
              shape="rounded"
            />
            <Button
              variant="outlined"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Вперед
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default CardList;
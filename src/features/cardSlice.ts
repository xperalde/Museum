import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../tipization';

interface CardsState {
  pages: Record<number, Card[]>;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  filterLiked: boolean;
}

const initialState: CardsState = {
  pages: {},
  loading: false,
  currentPage: 1,
  totalPages: 1,
  filterLiked: false,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<{ page: number; cards: Card[] }>) => {
      const { page, cards } = action.payload;
      state.pages[page] = cards;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    toggleFilterLiked: (state) => {
      state.filterLiked = !state.filterLiked;
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      Object.values(state.pages).forEach((cards) => {
        const card = cards.find((c) => c.id === cardId);
        if (card) {
          card.isLiked = !card.isLiked;
        }
      });
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      Object.keys(state.pages).forEach((key) => {
        const page = state.pages[parseInt(key)];
        const updatedPage = page.filter((card) => card.id !== cardId);
        state.pages[parseInt(key)] = updatedPage;
      });
    },
    addCard: (state, action: PayloadAction<Card>) => {
      const newCard = action.payload;
      if (!state.pages[1]) {
          state.pages[1] = [];
      }
      state.pages[1].unshift(newCard);
    },
  },
});

export const { 
  setCards, 
  setLoading, 
  setCurrentPage, 
  setTotalPages, 
  toggleFilterLiked, 
  toggleLike, 
  deleteCard, 
  addCard,
} = cardsSlice.actions;
export default cardsSlice.reducer;
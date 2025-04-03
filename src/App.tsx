import React, { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './component/layout/Layout';

const CardList = lazy(() => import('./component/CardList.tsx'));
const ProductDetail = lazy(() => import('./component/ProductDetail.tsx'));
const CreateForm = lazy(() => import('./component/CreateForm.tsx'));
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="products" replace />} />
        <Route index path="products" element={<CardList />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="create-product" element ={<CreateForm/>} />
        
      </Route>
    </Routes>
  );
};

export default App;
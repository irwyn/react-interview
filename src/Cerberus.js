import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFound';

const HomePage = lazy(() => import('@/pages/Home'));

/**
 * Cerberus manage routes to Page components
 */
const Cerberus = () => {
  // @TODO: add nicer loading indicator
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
};

export default Cerberus;

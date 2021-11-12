import { lazy, Suspense } from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

import NotFoundPage from '@/pages/NotFound';

const HomePage = lazy(() => import('@/pages/Home'));
const CarriersReportsPage = lazy(() => import('@/pages/CarriersReports/index'));

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
          <Route path="/carriers/reports" element={<CarriersReportsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Cerberus;

import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { Main } from '@pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

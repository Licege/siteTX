import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import '../shared/styles/index.css';
import './App.css';

export function App() {
  return (
    <RouterProvider router={router} />
  );
}

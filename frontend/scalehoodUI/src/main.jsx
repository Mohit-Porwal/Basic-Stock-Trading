import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import TradePage from './pages/TradePage/TradePage.jsx';

import './index.css'
import TickerInfoPage from './pages/TickerInfoPage/TickerInfoPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path:'/tickerInfo/:ticker',
    element: <TickerInfoPage/>
  },
  {
    path:'/trade',
    element: <TradePage/>
  }
])
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CountryProvider } from './context/CountryProvider';
import router from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CountryProvider>
            <RouterProvider router={router} />
        </CountryProvider>
    </React.StrictMode>
);

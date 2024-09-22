// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Créer un root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendre l'application
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
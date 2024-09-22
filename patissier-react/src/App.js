// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Customer from './Customer'; // Assure-toi que le nom du fichier est correct
import Patissier from './Patissier'; // Assure-toi que le nom du fichier est correct

const App = () => {
    return (
        <Router>
            <h1>Application en cours de fonctionnement</h1> {/* Message de débogage */}
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/Customer" element={<Customer />} />
                <Route path="/Patissier" element={<Patissier />} />
                <Route path="/" element={<Login />} /> {/* Page par défaut */}
            </Routes>
        </Router>
    );
};

export default App;

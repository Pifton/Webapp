// src/Patissier.js
import React from 'react';

const Patissier = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Récupérer l'utilisateur depuis le localStorage

    return (
        <div>
            <h1>Hello Patissier</h1>
            {user ? (
                <div>
                    <p>Email: {user.mail}</p>
                    <p>Title: {user.user_title}</p>
                </div>
            ) : (
                <p>Aucune information utilisateur trouvée.</p>
            )}
        </div>
    );
};

export default Patissier;

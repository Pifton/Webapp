// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.data.token); // Stocker le token
            localStorage.setItem('user', JSON.stringify({  // Stocker le mail et le user_title
                mail: data.data.mail,
                user_title: data.data.user_title,
            }));

            if (data.data.user_title === 'customer') {
                navigate('/customer');
            } else if (data.data.user_title === 'patissier') {
                navigate('/patissier');
            }
        } else {
            alert(data.error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;

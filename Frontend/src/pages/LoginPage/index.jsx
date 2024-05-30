import React, { useState } from 'react';
import { useUser } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const { setUser } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
            const url = 'http://localhost:5000/auth/login';
            const body = isEmail ? { email: username, password } : { username, password };
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(body),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            console.log('Login response:', response);
            if (response.message === "Login successful") {
                Cookies.set('token', response.token, { expires: 1 }); // Save token in cookies
                setUser(response.data);
                navigate("/home");
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-[#0A1625] p-8 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={loginHandler}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-white font-bold mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#CEAB79]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white font-bold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#CEAB79]"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
                </form>
                <p className="mt-4 text-center text-white">Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-600">Register</a></p>
            </div>
        </div>
    );
};

export default LoginPage;

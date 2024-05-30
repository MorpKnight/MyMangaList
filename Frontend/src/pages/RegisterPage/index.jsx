import React, {useState, useEffect} from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const {setUser} = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const register = async (username, password, email) => {
        try {
            console.log(localStorage.getItem('token'));
            const response = await axios.post('http://mymangalist.giovan.live/auth/register', { username, password, email },  { headers: { cookies: `token=${localStorage.getItem('token')}` } });
            return response.data;
        } catch (error) {
            console.error('Error registering:', error);
        }
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await register(username, password, email);
            if (response.message!= "User created successfully") {
                setError(response.message);
            }
            else{
                setUser(response.data);
                navigate("/home");
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="bg-[#0A1625] p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 w-max text-white">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={registerHandler}>
                    <div className="mb-4">
                        <label htmlFor="Username" className="block text-white font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="Username"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#CEAB79]"
                            placeholder="Enter your username"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#CEAB79]"
                            placeholder="Enter your email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#CEAB79]"
                            placeholder="Enter your password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#3577FF] text-white py-2 px-4 rounded hover:bg-[#4566A7] focus:outline-none"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
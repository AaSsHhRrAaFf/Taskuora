
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import signupImage from '../../assets/signup.png';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            navigate('/');
        } catch (error) {
            setError(error.message || 'Registration failed');
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Section (Visual Illustration) */}
            <div className="w-1/2 bg-gradient-to-b from-black to-emerald-900 flex items-center justify-center">
                <img src={signupImage} alt="Signup Illustration" className="max-w-full max-h-full" />
            </div>

            {/* Right Section (Signup Form) */}
            <div className="w-1/2 flex items-center justify-center">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
                    <p className="text-gray-600 mb-6">Create an account to start managing your tasks!</p>
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    <form onSubmit={handleSubmit} className="w-full max-w-sm">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="m32220@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="bg-emerald-400 hover:bg-emerald-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            Sign Up
                        </button>
                        <div className="flex items-center mt-6">
                            <div className="border-t border-gray-400 flex-grow"></div>
                            <div className="mx-4 text-gray-600">Or</div>
                            <div className="border-t border-gray-400 flex-grow"></div>
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-sm">Already have an account?
                                <Link to="/login" className="font-bold text-teal-500 hover:text-teal-800 ml-1">
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;


import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/error.png'; 

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={errorImage} alt="Error" className="w-64 h-auto mb-8" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Something went wrong.</h1>
      <p className="text-gray-600 mb-8">We couldn't find the page you were looking for.</p>
      <Link to="/" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;

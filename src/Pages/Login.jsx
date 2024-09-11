
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { handleError, handleSuccess } from '../util.js';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('name, email, and password are required');
    }
    try {
      const url = 'https://backend-loginsignup-1.onrender.com/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { email, success, message, name, jwt, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwt);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate(`/profile/${email}`);
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md">
        <div className="bg-stone-50 shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-center text-slate-950 mb-6">
            Login Here
          </h3>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-stone-50 text-sm font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                required
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, email: e.target.value });
                }}
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-gray-900"
                placeholder="Enter your email"
                value={loginInfo.email}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-stone-50 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                required
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-gray-900"
                placeholder="Enter your password"
                value={loginInfo.password}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-950 text-white font-semibold py-2 rounded-lg hover:bg-slate-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
            >
              Login
            </button>
            <p className="text-sm text-center text-gray-600 mt-4">
                    Dont have an account? 
                    <Link to="/signup" className="text-slate-950 hover:underline ml-1">Signup</Link>
                </p>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

 

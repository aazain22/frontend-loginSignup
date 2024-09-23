
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
const [err, setErr]= useState(false)
const [isSend, setIsSend]= useState(false)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email, and password are required');
    }
    try {
      const url = 'https://backend-loginsignup-1b73.onrender.com/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();

      setIsSend(true);
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
        setErr(message)
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-stone-50 shadow-lg rounded-lg p-8 sm:p-10">
          <h3 className="text-2xl sm:text-3xl font-semibold text-center text-slate-950 mb-6">
            Login Here
          </h3>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-slate-950 text-sm font-semibold mb-2"
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
                className="block text-slate-950 text-sm font-semibold mb-2"
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
              Don't have an account?
              <Link to="/signup" className="text-slate-950 hover:underline ml-1">
                Signup
              </Link>
            </p>
          </form>
          <div>
            {isSend ?  err? <p>{err}</p> :<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
</svg>: ''}
          </div>
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
}


 

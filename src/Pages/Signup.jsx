



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { handleError, handleSuccess } from '../util.js';
import Image from './Image.jsx';

export default function Signup() {
    
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });
    const [gender, setGender]= useState('')

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, phone } = signupInfo;

        if (!name || !email || !password || !phone) {
            return handleError('Name, email, password, and phone are required');
        }

        try {
            const url = 'https://backend-loginsignup-1b73.onrender.com/auth/signup';
            const formData = new FormData();

            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('phone', phone);

            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-6 bg-stone-50 shadow-lg rounded-lg space-y-8">
                <h3 className="text-3xl font-bold text-center text-slate-950">Create an Account</h3>
                <form onSubmit={handleSignup} className="space-y-6" encType="multipart/form-data">
                    <div>
                        <label htmlFor="name" className="block text-slate-950 text-sm font-medium">Full Name</label>
                        <input
                            onChange={(e) => setSignupInfo({ ...signupInfo, name: e.target.value })}
                            id="name"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-black"
                            placeholder="Enter your full name"
                            value={signupInfo.name}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-slate-950 text-sm font-medium">Email Address</label>
                        <input
                            onChange={(e) => setSignupInfo({ ...signupInfo, email: e.target.value })}
                            type="email"
                            id="email"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-black"
                            placeholder="Enter your email"
                            value={signupInfo.email}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-slate-950 text-sm font-medium">Password</label>
                        <input
                            onChange={(e) => setSignupInfo({ ...signupInfo, password: e.target.value })}
                            type="password"
                            id="password"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-black"
                            placeholder="Enter your password"
                            value={signupInfo.password}
                        />
                    </div>

                    <div>
                        <h1>{gender}</h1>
                        <input type="radio" name='gender' value= 'male' onChange={e=> setGender(e.target.value)}/> Male
                        <input type="radio" name='gender' value= 'female'
                        onChange={e=> setGender(e.target.value)}
                        /> Female
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-slate-950 text-sm font-medium">Phone Number</label>
                        <input
                            onChange={(e) => setSignupInfo({ ...signupInfo, phone: e.target.value })}
                            type="tel"
                            id="phone"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-black"
                            placeholder="Enter your phone number"
                            value={signupInfo.phone}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-950 text-stone-50 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-700 transition duration-300">
                        Sign Up
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        Already have an account?
                        <Link to="/login" className="text-slate-950 hover:underline ml-1">Login</Link>
                    </p>
                </form>
                <ToastContainer />
            </div>
            <Image />
        </div>
    );
}






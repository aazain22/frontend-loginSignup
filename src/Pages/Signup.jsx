import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { useState } from 'react'
import { handleError,handleSuccess } from '../util.js'
import Image from './Image.jsx'
// import { auth, provider, signInWithPopup } from '../firebase.js';

export default function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    // const handleSignIn = () => {
    //     signInWithPopup(auth, provider)
    //       .then((result) => {
    //         const user = result.user;
    //         console.log('User info:', user);
    //       })
    //       .catch((error) => {
    //         console.error('Error during sign-in:', error);
    //       });
console.log(window.location.origin);

    const handleSignup = async (e) => {

        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = 'https://backend-loginsignup-1b73.onrender.com/auth/signup';
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
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
    }
    return (
<div className="h-screen flex items-center justify-center bg-slate-950">
    <div className="w-full max-w-md p-6">
        <div className="bg-stone-50 shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-slate-950">Create an Account</h3>
            <form onSubmit={handleSignup} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-slate-950 text-sm font-medium mb-1">Full Name</label>
                    <input  
                        onChange={(e) => {
                            setSignupInfo({ ...signupInfo, name: e.target.value });
                        }}
                        id="name" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-black" 
                        placeholder="Enter your full name"
                        value={signupInfo.name}
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-slate-950 text-sm font-medium mb-1">Email Address</label>
                    <input 
                        onChange={(e) => {
                            setSignupInfo({ ...signupInfo, email: e.target.value });
                        }}
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-black" 
                        placeholder="Enter your email" 
                        value={signupInfo.email}
                    />
                </div>
                
                <div>
                    <label htmlFor="password" className="block text-slate-950 text-sm font-medium mb-1">Password</label>
                    <input 
                        onChange={(e) => {
                            setSignupInfo({ ...signupInfo, password: e.target.value });
                        }}
                        type="password" 
                        id="password" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-black" 
                        placeholder="Enter your password" 
                        value={signupInfo.password}
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="w-full bg-slate-950 text-stone-50 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-700">
                    Sign Up
                </button>
                <div>
      {/* <h1>Login with Google</h1>
      <button onClick={handleSignIn}>Sign In with Google</button> */}
    </div>
                
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account? 
                    <Link to="/login" className="text-slate-950 hover:underline ml-1">Login</Link>
                </p>
            </form>
            
            <ToastContainer />
        </div>
    </div>
    <Image/>
</div>


    )
}



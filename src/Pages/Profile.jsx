

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import bg from '../assets/background.jpg';
import UserProfile from './Update';
import DeleteUser from './Delete';

export default function Profile() {
  const { email } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://backend-loginsignup-1b73.onrender.com/auth/user/${email}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error fetching user data');
        }

        setUserData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  console.log(userData);

  if (loading) {
    return <h1 className="text-stone-50">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }

  const handleUpdateUser = () => {
    navigate(`/update/${userData._id}`);
  };

  const handleDeleteUser = () => {
    navigate(`/delete/${userData._id}`);
  };

  return (
    <div
      className="flex flex-col items-start justify-evenly min-h-screen bg-slate-950 relative bg-cover px-4 sm:px-6 lg:px-8 "
      style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat' }}
    >
      <div className="bg-slate-900 shadow-lg rounded-lg p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative sm:mt-20 md:mt-28">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-50 mb-6 text-center">
          Welcome, <span className="text-stone-50">{userData?.name}</span>!
        </h1>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-medium text-stone-50 mb-2">
            Name: <span className="font-semibold text-stone-50">{userData?.name}</span>
          </h2>
          <h2 className="text-xl sm:text-2xl font-medium text-stone-50">
            Email: <span className="font-semibold text-stone-50">{userData?.email}</span>
          </h2>
          <h2 className="text-xl sm:text-2xl font-medium text-stone-50">
            Phone: <span className="font-semibold text-stone-50">{userData?.phone}</span>
          </h2>
        </div>
        <div className="flex flex-col items-center mt-8">
          <h3 className="text-lg font-medium text-stone-50 mb-4">Your Profile QR Code:</h3>
          <QRCode value={`${window.location.origin}/profile/scan/${userData?.email}`} size={160} />
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleUpdateUser}
            className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>

          <button
            onClick={handleDeleteUser}
            className="w-full sm:w-auto bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Account
          </button>
        </div>
      </div>

     
      <p
        className="text-stone-50 font-sans text-lg sm:text-2xl md:text-3xl leading-relaxed absolute right-6 sm:right-16 lg:right-28 top-24 sm:top-32 lg:top-20 w-full sm:w-1/2 lg:w-1/3 text-right"
      >
        “What are you so hesitant about? It’s your dream, isn’t it? Right there in front of you, and still you waver? Be reckless! Seize everything you can!”
      </p>
    </div>
  );
}

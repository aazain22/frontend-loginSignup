import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import bg from '../assets/background.jpg';
import UpdateUser from './Update';
import DeleteUser from './Delete';

export default function Profile() {
  const { email } = useParams(); 
  const [userData, setUserData] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);
  const navigate= useNavigate()

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
  
  const UpdateUser= () => {
navigate('/update/123')

  }



  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-slate-950 relative bg-cover " 
      style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat',  }}
    >
      <div className="bg-slate-900 shadow-lg rounded-lg p-8 w-full max-w-md  absolute left-36">
        <h1 className="text-4xl font-bold text-stone-50 mb-6 text-center">
          Welcome, <span className="text-stone-50">{userData?.name}</span>!
        </h1>
        <div className="mb-6">
          <h2 className="text-2xl font-medium text-stone-50 mb-2">
            Name: <span className="font-semibold text-stone-50">{userData?.name}</span>
          </h2>
          <h2 className="text-2xl font-medium text-stone-50">
            Email: <span className="font-semibold text-stone-50">{userData?.email}</span>
          </h2>
        </div>
        <div className="flex flex-col items-center mt-8">
          <h3 className="text-lg font-medium text-stone-50 mb-4">Your Profile QR Code:</h3>
          <QRCode value={`${window.location.origin}/profile/scan/${userData?.email}`} size={160} />
        </div>
        {/* <input type="file" name="profilePhoto" onChange={handleFileChange}  onSubmit={handleUpdateUser}/> */}

        <button type='submit' onSubmit={ UpdateUser} >Update</button>

        <button onClick={()=> DeleteUser}>Delete Account</button>
      </div>
      
      {/* Quote aligned to the right side and slightly above */}
      <p 
        className="text-stone-50 font-sans text-4xl leading-relaxed absolute right-28 top-20 w-1/3 text-right"
      >
        “What are you so hesitant about? It’s your dream, isn’t it? Right there in front of you, and still you waver? Be reckless! Seize everything you can!”
      </p>

      
      
    </div>
  );
}

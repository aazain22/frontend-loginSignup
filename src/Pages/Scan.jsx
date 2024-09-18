// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// export default function Scan() {
//   const { email } = useParams(); 
//   const [userData, setUserData] = useState(null); 
//   const [error, setError] = useState(null); 
//   const [loading, setLoading] = useState(true); 

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`https://backend-loginsignup-1b73.onrender.com/auth/user/${email}`);
//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || 'Error fetching user data');
//         }

//         setUserData(data.data); 
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchUserData();
//   }, [email]); 

//   if (loading) {
//     return <h1 className="text-stone-50">Loading...</h1>; 
//   }

//   if (error) {
//     return <h1 className="text-red-500">{error}</h1>; 
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950">
//       <div className="bg-slate-900 shadow-lg rounded-lg p-8 w-full max-w-md">
//         <h1 className="text-4xl font-bold text-stone-50 mb-6 text-center">
//           User Profile
//         </h1>
//         <div className="mb-6">
//           <h2 className="text-2xl font-medium text-stone-50 mb-2">
//             Name: <span className="font-semibold text-stone-50">{userData?.name}</span>
//           </h2>
//           <h2 className="text-2xl font-medium text-stone-50">
//             Email: <span className="font-semibold text-stone-50">{userData?.email}</span>
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Scan() {
  const { email } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <h1 className="text-stone-50">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-4">
      <div className="bg-slate-900 shadow-lg rounded-lg p-8 w-full max-w-lg md:max-w-md sm:max-w-xs">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-50 mb-6 text-center">
          User Profile
        </h1>
        <div className="mb-6">
          <h2 className="text-lg md:text-2xl font-medium text-stone-50 mb-2">
            Name: <span className="font-semibold text-stone-50">{userData?.name}</span>
          </h2>
          <h2 className="text-lg md:text-2xl font-medium text-stone-50">
            Email: <span className="font-semibold text-stone-50">{userData?.email}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}



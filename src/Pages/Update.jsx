

// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { handleError, handleSuccess } from '../util.js';

// export default function UserProfile() {
//   const {userId}= useParams()
//   const [isEditing, setIsEditing] = useState(false); // Control whether the form is visible or not
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
    
//   });

//   const navigate = useNavigate();

//   // Function to toggle the update form visibility
//   const toggleEditForm = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // const handleFileChange = (e) => {
//   //   setFormData({ ...formData, profilePhoto: e.target.files[0] });
//   // };

//   const handleUpdateUser = async (e) => {
//     e.preventDefault();

 
   

//     try {
     
//       const response = await fetch(`https://backend-loginsignup-1b73.onrender.com/auth/user/update/${userId}`, {
//         method: 'PATCH',
//         body: formData
//       });

//       const result = await response.json();
//       if (result.success) {
//         handleSuccess(result.message);
//         setTimeout(() => {
//           navigate('/login');
//         }, 1000);
//       } else {
//         handleError(result.message);
//       }
//     } catch (error) {
//       handleError('Failed to update user');
//     }
//   };

//   // const handleDeleteUser = async () => {
//   //   try {
//   //     const userId = "USER_ID"; // Replace with the logged-in user's ID
//   //     const response = await fetch(`http://localhost:5000/user/delete/${userId}`, {
//   //       method: 'DELETE'
//   //     });

//   //     const result = await response.json();
//   //     if (result.success) {
//   //       handleSuccess(result.message);
//   //       setTimeout(() => {
//   //         navigate('/login'); // Redirect to login after deleting
//   //       }, 1000);
//   //     } else {
//   //       handleError(result.message);
//   //     }
//   //   } catch (error) {
//   //     handleError('Failed to delete user');
//   //   }
//   // };

//   return (
//     <div>
//       <h1>User Profile</h1>
//       {/* Button to toggle edit form */}
//       <button onClick={toggleEditForm}>
//         {isEditing ? 'Cancel' : 'Update Profile'}
//       </button>
   

//       {/* Conditionally render update form */}
//       {isEditing && (
//         <form onSubmit={handleUpdateUser}>
//           <div>
//             <label>Name</label>
//             <input 
//               type="text" 
//               name="name" 
//               value={formData.name} 
//               onChange={handleInputChange} 
//             />
//           </div>
//           <div>
//             <label>Email</label>
//             <input 
//               type="email" 
//               name="email" 
//               value={formData.email} 
//               onChange={handleInputChange} 
//             />
//           </div>
//           <div>
//             <label>Phone</label>
//             <input 
//               type="text" 
//               name="phone" 
//               value={formData.phone} 
//               onChange={handleInputChange} 
//             />
//           </div>
//           <div>
//             <label>Password</label>
//             <input 
//               type="password" 
//               name="password" 
//               value={formData.password} 
//               onChange={handleInputChange} 
//             />
//           </div>
        
//           <button type="submit">Save Changes</button>
//         </form>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleError, handleSuccess } from '../util.js';

export default function UserProfile() {
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false); // Control whether the form is visible or not
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const navigate = useNavigate();

  // Function to toggle the update form visibility
  const toggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://backend-loginsignup-1b73.onrender.com/auth/user/update/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError('Failed to update user');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900 shadow-lg rounded-lg p-8 w-full max-w-md sm:max-w-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-50 mb-6 text-center">
          User Profile
        </h1>
        <button
          onClick={toggleEditForm}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEditing ? 'Cancel' : 'Update Profile'}
        </button>

        {isEditing && (
          <form onSubmit={handleUpdateUser} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-stone-50 text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-gray-900"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-stone-50 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-gray-900"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-stone-50 text-sm font-semibold mb-2">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-gray-900"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-stone-50 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 text-gray-900"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-950 text-white font-semibold py-2 rounded-lg hover:bg-slate-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
}



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../util.js';

// export default function UpdateUser() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
  
//   });

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// //   const handleFileChange = (e) => {
// //     setFormData({ ...formData, profilePhoto: e.target.files[0] });
// //   };

//   const handleUpdateUser = async (e) => {
//     e.preventDefault();

//     const { name, email, password, phone, profilePhoto } = formData;
//     if (!name || !email || !password || !phone) {
//       return handleError('All fields are required');
//     }

//     // Create FormData object for file and other fields
//     const userData = new FormData();
//     userData.append('name', name);
//     userData.append('email', email);
//     userData.append('password', password);
//     userData.append('phone', phone);
//     if (profilePhoto) {
//       userData.append('profilePhoto', profilePhoto);
//     }

//     try {
//       const userId = "USER_ID"; // Replace with the logged-in user's ID
//       const response = await fetch(`https://backend-loginsignup-1b73.onrender.com/auth/user/${email}`, {
//         method: 'PATCH',
//         body: userData
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

//   return (
//     <form onSubmit={handleUpdateUser} class="bg-slate-950 p-6 rounded-lg shadow-lg max-w-md mx-auto text-stone-50">
//     <h2 class="text-2xl font-bold mb-6 text-center">Update User Info</h2>
  
//     <div class="mb-4">
//       <label for="name" class="block text-sm font-medium mb-2">Name</label>
//       <input
//         type="text"
//         id="name"
//         name="name"
//         class="w-full px-4 py-2 border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-stone-50"
//         placeholder="Enter your name"
//       />
//     </div>
  
//     <div class="mb-4">
//       <label for="email" class="block text-sm font-medium mb-2">Email</label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         class="w-full px-4 py-2 border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-stone-50"
//         placeholder="Enter your email"
//       />
//     </div>
  
//     <div class="mb-4">
//       <label for="password" class="block text-sm font-medium mb-2">Password</label>
//       <input
//         type="password"
//         id="password"
//         name="password"
//         class="w-full px-4 py-2 border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-stone-50"
//         placeholder="Enter your password"
//       />
//     </div>
  
//     <div class="mb-4">
//       <label for="phone" class="block text-sm font-medium mb-2">Phone Number</label>
//       <input
//         type="tel"
//         id="phone"
//         name="phone"
//         class="w-full px-4 py-2 border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-stone-50"
//         placeholder="Enter your phone number"
//       />
//     </div>
  
//     <button
//       type="submit"
//       class="w-full bg-stone-50 text-slate-950 py-2 px-4 rounded-lg font-semibold hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-50"
//     >
//       Update
//     </button>
//   </form>
  
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../util.js';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false); // Control whether the form is visible or not
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    profilePhoto: null
  });

  const navigate = useNavigate();

  // Function to toggle the update form visibility
  const toggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, profilePhoto: e.target.files[0] });
  // };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const { name, email, password, phone, profilePhoto } = formData;
    if (!name || !email || !password || !phone) {
      return handleError('All fields are required');
    }

    // Create FormData object for file and other fields
    const userData = new FormData();
    userData.append('name', name);
    userData.append('email', email);
    userData.append('password', password);
    userData.append('phone', phone);
    if (profilePhoto) {
      userData.append('profilePhoto', profilePhoto);
    }

    try {
     
      const response = await fetch(`https://backend-loginsignup-1b73.onrender.com/auth/user/update/${userId}`, {
        method: 'PATCH',
        body: userData
      });

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

  // const handleDeleteUser = async () => {
  //   try {
  //     const userId = "USER_ID"; // Replace with the logged-in user's ID
  //     const response = await fetch(`http://localhost:5000/user/delete/${userId}`, {
  //       method: 'DELETE'
  //     });

  //     const result = await response.json();
  //     if (result.success) {
  //       handleSuccess(result.message);
  //       setTimeout(() => {
  //         navigate('/login'); // Redirect to login after deleting
  //       }, 1000);
  //     } else {
  //       handleError(result.message);
  //     }
  //   } catch (error) {
  //     handleError('Failed to delete user');
  //   }
  // };

  return (
    <div>
      <h1>User Profile</h1>
      {/* Button to toggle edit form */}
      <button onClick={toggleEditForm}>
        {isEditing ? 'Cancel' : 'Update Profile'}
      </button>
   

      {/* Conditionally render update form */}
      {isEditing && (
        <form onSubmit={handleUpdateUser}>
          <div>
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Phone</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleInputChange} 
            />
          </div>
        
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}


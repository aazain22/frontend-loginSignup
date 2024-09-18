

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleError, handleSuccess } from '../util.js';

export default function UserProfile() {
  const {userId}= useParams()
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

  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, profilePhoto: e.target.files[0] });
  // };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

 
   

    try {
     
      const response = await fetch(`https://backend-loginsignup-1b73.onrender.com/auth/user/update/${userId}`, {
        method: 'PATCH',
        body: formData
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


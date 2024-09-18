// import { useNavigate, useParams } from 'react-router-dom';
// import { handleError, handleSuccess } from '../util.js';

// export default function DeleteUser() {
//     const navigate = useNavigate();
//     const {userId}= useParams()
  
//     const handleDeleteUser = async () => {
//       try {
//         // Replace with the logged-in user's ID
//         const response = await fetch(`https://backend-loginsignup-1b73.onrender.com/auth/user/delete/${userId}`, {
//           method: 'DELETE'
//         });
  
//         const result = await response.json();
//         if (result.success) {
//           handleSuccess(result.message);
//           setTimeout(() => {
//             navigate('/login'); // Redirect to login after deleting
//           }, 1000);
//         } else {
//           handleError(result.message);
//         }
//       } catch (error) {
//         handleError('Failed to delete user');
//       }
//     };
  
//     return (
//       <button onClick={handleDeleteUser}>Delete Account</button>
//     );
//   }
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { handleError, handleSuccess } from '../util.js';

export default function DeleteUser() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [showConfirm, setShowConfirm] = useState(false); // State to control the confirmation modal

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`https://backend-loginsignup-1b73.onrender.com/auth/user/delete/${userId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => {
          navigate('/login'); // Redirect to login after deleting
        }, 1000);
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError('Failed to delete user');
    }
  };

  const toggleConfirmModal = () => {
    setShowConfirm(!showConfirm); // Toggle the confirmation modal
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <button
        onClick={toggleConfirmModal}
        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete Account
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">
              Do you really want to delete this account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleConfirmModal}
                className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

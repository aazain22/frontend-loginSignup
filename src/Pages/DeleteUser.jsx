import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../util.js';

export default function DeleteUser() {
    const navigate = useNavigate();
  
    const handleDeleteUser = async () => {
      try {
        const userId = "USER_ID"; // Replace with the logged-in user's ID
        const response = await fetch(`https://backend-loginsignup-1b73.onrender.com/auth/user/${email}`, {
          method: 'DELETE'
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
  
    return (
      <button onClick={handleDeleteUser}>Delete Account</button>
    );
  }
  
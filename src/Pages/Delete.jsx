import { useNavigate, useParams } from 'react-router-dom';
import { handleError, handleSuccess } from '../util.js';

export default function DeleteUser() {
    const navigate = useNavigate();
    const {userId}= useParams()
  
    const handleDeleteUser = async () => {
      try {
        // Replace with the logged-in user's ID
        const response = await fetch(`https://backend-loginsignup-1b73.onrender.com/auth/user/delete/${userId}`, {
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
  
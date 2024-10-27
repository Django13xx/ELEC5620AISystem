import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginSuccess } from '../../reducers/manager/userSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      const { role, message, userId } = response.data;

      if (message === 'Login successful') {
        //  loginSuccess action update Redux 
        dispatch(loginSuccess({ userId, role, email }));

        
        switch (role) {
          case 'PROPERTY_MANAGER':
            navigate('/manager');
            break;
          case 'HOMEOWNER':
            navigate('/home');
            break;
          case 'RESIDENT':
            navigate('/resident');
            break;
          case 'SECURITY':
            navigate('/security');
            break;
          default:
            console.error('Invalid role');
        }
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg bg-white border-4 border-transparent" style={{ borderImage: 'linear-gradient(45deg, red, orange, yellow, green, cyan, blue, violet) 1' }}>
        <h2 className="text-center text-3xl font-bold mb-6">Smart Home</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-center">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-full text-center"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-center">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-full text-center"
              required
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="flex-1 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 mr-3"
            >
              Login
            </button>
            <button
              type="button"
              className="flex-1 p-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50"
              onClick={() => {
                window.location.href = 'http://localhost:3000/user';
              }}
            >
              Visitor Mode
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

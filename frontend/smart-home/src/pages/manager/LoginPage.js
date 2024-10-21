import React from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../reducers/manager/userSlice';

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    // 假设你在这里拿到了token、name、email等用户信息
    const userInfo = {
      token: 'abc123',
      name: 'John Doe',
      email: 'john@example.com',
    };

    // 分发 loginSuccess action 更新 Redux 状态
    dispatch(loginSuccess(userInfo));
  };



  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const formStyle = {
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    background: '#fff',
    border: '5px solid',
    borderImage: 'linear-gradient(45deg, red, orange, yellow, green, cyan, blue, violet) 1',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '95%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '25px',
    textAlign: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  };
  
  const buttonStyle = {
    flex: 3, 
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    marginRight: '10px', 
  };
  
  const registerButtonStyle = {
    flex: 1, 
    padding: '10px',
    backgroundColor: '#fff',
    color: '#007bff',
    border: '1px solid #007bff',
    borderRadius: '25px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={{ textAlign: 'center' }}>Smart Home</h2>
        <form>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" style={inputStyle} required />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input type="password" style={inputStyle} required />
          </div>

          <div style={buttonContainerStyle}>
          <button onClick={handleLogin} style={buttonStyle}>
            Login
          </button>
          <button style={registerButtonStyle}>
            Register
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

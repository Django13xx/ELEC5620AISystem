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

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/manager/userSlice'; // 确保路径正确

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // 调用 Redux action 来清空用户信息
    navigate('/login'); // 跳转到登录页面
  };

  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;

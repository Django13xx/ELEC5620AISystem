import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../reducers/manager/userSlice';

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <h1>5620Group12 Smart Home</h1>
      {isAuthenticated ? (
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <span>Please log in</span>
      )}
    </header>
  );
};

export default Header;

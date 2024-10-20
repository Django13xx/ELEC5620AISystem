// src/hoc/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // 如果未登录，重定向到登录页面
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

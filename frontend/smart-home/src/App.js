import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './app/store';

import './App.css';
// import Header from './components/manager/Header';
import LoginPage from './pages/manager/LoginPage';
import RegisterPage from './pages/manager/RegisterPage';
import HomePage from './pages/manager/HomePage';
import AddPage from './pages/manager/AddPage';
import EditPage from './pages/manager/EditPage';
import CharacterDetailPage from './pages/manager/CharacterDetailPage';
import UserInfoPage from './pages/user/UserPage';
import AdminPage from './pages/manager/AdminPage';
import ProtectedRoute from './hoc/ProtectedRoute'; // 导入 ProtectedRoute

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="app-container">
      <Router>
        {/* <Header /> */}
        <Routes>
          {/* 公共路由 */}
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />

          {/* 受保护的路由 */}
          <Route path="/add" element={<ProtectedRoute><AddPage /></ProtectedRoute>} />
          <Route path="/edit" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
          <Route path="/character" element={<ProtectedRoute><CharacterDetailPage /></ProtectedRoute>} />
          {/* set user page to unprotected for dev purpose */}
          <Route path="/user" element={<UserInfoPage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

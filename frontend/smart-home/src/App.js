// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './App.css';
import Header from './components/manager/Header';
import LoginPage from './pages/manager/LoginPage';
import RegisterPage from './pages/manager/RegisterPage';
import HomePage from './pages/manager/HomePage';
import AddPage from './pages/manager/AddPage';
import EditPage from './pages/manager/EditPage';
import CharacterDetailPage from './pages/manager/CharacterDetailPage';
import UserInfoPage from './pages/manager/UserInfoPage';
import AdminPage from './pages/manager/AdminPage';


// Main App Component
function App() {
  const token = useSelector((state) => state.user.user.token);

  return (
    <div className="app-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/" />} />

          <Route path="/add" element={token ? <AddPage /> : <Navigate to="/login" />} />
          <Route path="/edit" element={token ? <EditPage /> : <Navigate to="/login" />} />
          <Route path="/character" element={token ? <CharacterDetailPage /> : <Navigate to="/login" />} />
          <Route path="/user" element={token ? <UserInfoPage /> : <Navigate to="/login" />} />
          <Route path="/admin" element={token ? <AdminPage /> : <Navigate to="/login" />} />

          
        </Routes>
      </Router>
    </div>
  );
};

export default App;

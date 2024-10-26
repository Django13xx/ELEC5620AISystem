import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './app/store';

import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/manager/LoginPage';
import HomePage from './pages/manager/MHomePage';
import RegisterPage from './pages/manager/RegisterPage';
import ManagerPage from './pages/manager/ManagerPage';
import AddPage from './pages/manager/AddPage';
import EditPage from './pages/manager/EditPage';
import CharacterDetailPage from './pages/manager/CharacterDetailPage';
import UserInfoPage from './pages/manager/UserInfoPage';
import AdminPage from './pages/manager/AdminPage';
import UserPage from './pages/user/UserPage';

function App() {
  return (
    <div className="app-container">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manager-home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/manager" element={<ManagerPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
          <Route path="/user-info" element={<UserInfoPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './app/store';

import './App.css';
// import Header from './components/manager/Header';
import LoginPage from './pages/manager/LoginPage';
import RegisterPage from './pages/manager/RegisterPage';
import ManagerPage from './pages/manager/ManagerPage';
import HomePage from './pages/manager/HomePage';
import AddPage from './pages/manager/AddPage';
import EditPage from './pages/manager/EditPage';
import CharacterDetailPage from './pages/manager/CharacterDetailPage';
import UserInfoPage from './pages/user/UserPage';
import AdminPage from './pages/manager/AdminPage';
import UserPage from './pages/user/UserPage';
import SecurityPage from './pages/security/SecurityPage';






function App() {

  return (
    <div className="app-container">
      <Router>
        {/* <Header /> */}
        <Routes>
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
          <Route path="/security" element={<SecurityPage /> } />
      

        </Routes>
      </Router>
    </div>
  );
}

export default App;

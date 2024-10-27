import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './app/store';

import './App.css';

import LoginPage from './pages/public/LoginPage';
import ManagerPage from './pages/manager/ManagerPage';
import HomePage from './pages/homeowner/HomePage';
import UserPage from './pages/user/UserPage';
import ResidentPage from './pages/user/ResidentPage';


function App() {

  return (
    <div className="app-container">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/manager-home" element={<ManagerPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/manager" element={<ManagerPage />} />
          <Route path="/home" element={<HomePage />} />
          

          
          <Route path="/user" element={<UserPage />} />
          <Route path="/resident" element={<ResidentPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

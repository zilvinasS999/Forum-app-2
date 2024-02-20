import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OwnProfilePage from './pages/OwnProfilePage';
import ForumPage from './pages/ForumPage';
import SubTopicPage from './pages/SubTopicPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ForumPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<OwnProfilePage />} />
          <Route path='profile/:userId' element={<OwnProfilePage />} />
          <Route path='/forum/:mainTopicId' element={<SubTopicPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Register /> */}
    <Login />
  </React.StrictMode>
);

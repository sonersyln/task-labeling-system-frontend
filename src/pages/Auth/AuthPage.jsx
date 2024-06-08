import React, { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      {isLogin ? (
        <Login onToggle={toggleAuth} />
      ) : (
        <Register onToggle={toggleAuth} />
      )}
    </div>
  );
};

export default AuthPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";

function Login() {

  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
      setIsLogin(true);
  };

  const toggleRegister = () => {
      setIsLogin(false);
  };

  return (
   <>
    <div className="login-main-container">
    <div className="login-container">
      <h2>Sign In</h2>
      <form className="login-form">
        <input type="text" placeholder="Email or username" required />
        <input type="password" placeholder="Password" required />
        <div className="remember-me">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <div className="forgot-password">
        <a href="/#" >Forgot password?</a>
        </div>
       
        <button type="submit">Sign In</button>
      </form>
      <Link to="/register" className="register-link">Not a member? Register</Link>
    </div>
    </div>
  
    </>
  );
}

export default Login;
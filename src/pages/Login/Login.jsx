import React, { useState } from 'react';
import { loginUser } from "../../services/api";
import "./Login.css";

const Login = ({ onToggle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      // Login successful, handle redirection or state update
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input type="checkbox" /> Remember me
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
      <p>
        Forgot password?
      </p>
      <p>
        Not a member? <a href="#" onClick={onToggle}>Register</a>
      </p>
    </div>
  );
};

export default Login;

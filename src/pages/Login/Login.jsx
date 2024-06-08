import React, { useState } from 'react';
import { loginUser } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/Auth/AuthContext';
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userData = await loginUser(formData);
      login(userData);
      console.log(userData);
      navigate('/');
    } catch (error) {
      setError('Login failed. Please check your username and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input type="checkbox" /> Remember me
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>
        Forgot password?
      </p>
      <p>
      Not a member? <a href="#" onClick={handleRegisterClick}>Register</a>
      </p>
    </div>
  );
};

export default Login;

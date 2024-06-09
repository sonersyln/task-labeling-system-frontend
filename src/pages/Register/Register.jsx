import React, { useState } from 'react';
import { registerUser } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css";

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await schema.validate({ email, username, password });
      await registerUser({ email, username, password });
      navigate('/');
      toast.success('Registration successful');
    } catch (error) {
      console.error("Registration failed", error);
      toast.error('Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p>
        Already a member? <a href="/sign-in">Sign In</a>
      </p>
    </div>
  );
};

export default Register;

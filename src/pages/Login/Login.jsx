import React, { useState } from 'react';
import { loginUser } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/Auth/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(formData);
      const token = response.data;
      login(token);
      toast.success('Giriş başarılı!');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Giriş başarısız oldu. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.';
        toast.error('Giriş başarısız: ' + errorMessage);
      } else {
        toast.error('Giriş başarısız oldu. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="auth-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Şifre</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>
      <p>
        Hoş geldiniz! Lütfen giriş yapın.
      </p>
      <p>
        Üye değil misin? <a href="#" onClick={handleRegisterClick}>Kayıt olmak için tıkla!</a>
      </p>
    </div>
  );
};

export default Login;

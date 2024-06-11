import React, { useState } from 'react';
import { registerUser } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css";

const emailSchema = yup.string().email('Geçersiz e-posta formatı').required('E-posta zorunludur');
const usernameSchema = yup.string().required('Kullanıcı adı zorunludur');
const passwordSchema = yup.string().min(8, 'Şifre en az 8 karakter olmalıdır').required('Şifre zorunludur');

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await emailSchema.validate(email);
      await usernameSchema.validate(username);
      await passwordSchema.validate(password);
      const response = await registerUser({ email, username, password });
      toast.success('Kayıt başarılı');
      setTimeout(() => {
        navigate('/');
      }, 2000); 
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Kayıt başarısız';
        toast.error('Kayıt başarısız: ' + errorMessage);
      } else {
        toast.error('Kayıt başarısız');
      }
      console.error("Kayıt başarısız", error);
    }
  };

  const handleInputChange = async (e, schema, setter, errorSetter) => {
    const { value } = e.target;
    setter(value);
    try {
      await schema.validate(value);
      errorSetter(''); 
    } catch (error) {
      errorSetter(error.message);
    }
  };

  return (
    <div className="authh-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleInputChange(e, emailSchema, setEmail, setEmailError)}
            required
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>
        <div className="form-group">
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            value={username}
            onChange={(e) => handleInputChange(e, usernameSchema, setUsername, setUsernameError)}
            required
          />
          {usernameError && <div className="error-message">{usernameError}</div>}
        </div>
        <div className="form-group">
          <label>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => handleInputChange(e, passwordSchema, setPassword, setPasswordError)}
            required
          />
          {passwordError && <div className="error-message">{passwordError}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Kayıt Ol</button>
      </form>
      <p>
        Zaten üye misiniz? <a href="/sign-in">Giriş Yap</a>
      </p>
    </div>
  );
};

export default Register;

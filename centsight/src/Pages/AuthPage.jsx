import { useState } from 'react';
import AuthForm from '../components/AuthForm';
const AuthPage = ({ initialForm = 'signup' }) => {
  const [form, setForm] = useState(initialForm);

  const handleFormChange = () => {
    if (form === 'signup') setForm('login');
    else setForm('signup');
  };

  return <AuthForm type={form} changeForm={handleFormChange} />;
};

export default AuthPage;

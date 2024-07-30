import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { Center, Box } from '@chakra-ui/react';
import LoginForm from '../components/forms/LoginForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/forms/SignupForm';
import { useEffect } from 'react';
const AuthPage = ({ initialForm = 'login' }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (auth.user) navigate('/dashboard');
  }, [auth, navigate]);

  const handleChangeType = () => {
    if (form === 'signup') setForm('login');
    else setForm('signup');
  };

  return (
    <Center height="100vh">
      {form === 'login' ? (
        <LoginForm changeType={handleChangeType} />
      ) : (
        <SignupForm changeType={handleChangeType} />
      )}
    </Center>
  );
};

export default AuthPage;

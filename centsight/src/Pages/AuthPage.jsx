import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { Center, Box } from '@chakra-ui/react';
const AuthPage = ({ initialForm = 'signup' }) => {
  const [form, setForm] = useState(initialForm);

  const handleFormChange = () => {
    if (form === 'signup') setForm('login');
    else setForm('signup');
  };

  return (
    <Center height="100vh">
      <AuthForm type={form} changeForm={handleFormChange} />
    </Center>
  );
};

export default AuthPage;

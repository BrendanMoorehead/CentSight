import React from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
} from '@chakra-ui/react';
import PasswordInput from './PasswordInput';
import { useState, useEffect } from 'react';
import {
  loginUserWithPassword,
  registerUserWithPassword,
} from '../store/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type, changeForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) navigate('/dashboard');
  }, [auth, navigate]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleFormSubmit = () => {
    if (type === 'signup') {
      dispatch(registerUserWithPassword(email, password));
    } else {
      dispatch(loginUserWithPassword(email, password));
    }
    navigate('/dashboard');
  };

  return (
    <>
      <Heading>{type === 'signup' ? 'Register' : 'Login'}</Heading>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          placeholder="Enter email"
          onChange={handleEmailChange}
        />
      </InputGroup>
      <PasswordInput updatePassword={handlePasswordChange} />
      <Button onClick={handleFormSubmit}>
        {type === 'signup' ? 'Sign up' : 'Login'}
      </Button>
      <Button onClick={changeForm}>Change Form Type</Button>
    </>
  );
};

export default AuthForm;

import React from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
} from '@chakra-ui/react';
import PasswordInput from './PasswordInput';
import { useState } from 'react';
const AuthForm = ({ type, changeForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

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
      <Button>{type === 'signup' ? 'Sign up' : 'Login'}</Button>
      <Button onClick={changeForm}>Change Form Type</Button>
    </>
  );
};

export default AuthForm;

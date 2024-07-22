import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Box,
  Heading,
  Grid,
} from '@chakra-ui/react';
import PasswordInput from './PasswordInput';
import { useState, useEffect } from 'react';
import { EmailIcon } from '@chakra-ui/icons';
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
    <Box minW="lg" borderWidth="1px" borderRadius="lg">
      <Grid templateColumns="repeat(1, 1fr)" gap={6} margin={6}>
        <Heading align="center">
          {type === 'signup' ? 'Register' : 'Login'}
        </Heading>
        <InputGroup size="md">
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          >
            <EmailIcon />
          </InputLeftElement>
          <Input
            pr="4.5rem"
            placeholder="Enter email"
            onChange={handleEmailChange}
          />
        </InputGroup>
        <PasswordInput updatePassword={handlePasswordChange} />
        <Button onClick={handleFormSubmit} colorScheme="teal">
          {type === 'signup' ? 'Sign up' : 'Login'}
        </Button>
        <Button onClick={changeForm}>Change Form Type</Button>
      </Grid>
    </Box>
  );
};

export default AuthForm;

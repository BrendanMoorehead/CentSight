import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth-actions';
import { Button } from '@chakra-ui/react';
const LandingPage = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser);
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LandingPage;

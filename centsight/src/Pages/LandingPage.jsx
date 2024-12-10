import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth-actions';
import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const LandingPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser);
  };
  useEffect(() => {
    if (auth.user) navigate('/dashboard');
  }, [auth, navigate]);

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LandingPage;

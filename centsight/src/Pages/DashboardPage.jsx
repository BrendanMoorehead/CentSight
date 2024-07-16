import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth-actions';
import { Button } from '@chakra-ui/react';
import SideMenu from '../components/SideMenu';
const DashboardPage = () => {
  //TODO: User specific data should be fetched here
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <SideMenu />
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default DashboardPage;

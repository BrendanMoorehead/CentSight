import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth-actions';
import { Button } from '@chakra-ui/react';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
const DashboardPage = () => {
  //TODO: User specific data should be fetched here
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <Header />
      <SideMenu />
    </div>
  );
};

export default DashboardPage;

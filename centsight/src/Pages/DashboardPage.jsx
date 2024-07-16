import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth-actions';
import { Button } from '@chakra-ui/react';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import { FloatButton } from 'antd';
import { TiPlus } from 'react-icons/ti';
import { MdAccountBalance } from 'react-icons/md';
import { FaWallet } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { Tooltip } from '@chakra-ui/react';
const DashboardPage = () => {
  //TODO: User specific data should be fetched here
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div>
        <Header />
        <SideMenu />
      </div>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 24 }}
        icon={<TiPlus />}
      >
        <Tooltip label="New category" placement="auto">
          <FloatButton icon={<MdCategory />} />
        </Tooltip>
        <Tooltip label="New account" placement="auto">
          <FloatButton icon={<MdAccountBalance />} />
        </Tooltip>
        <Tooltip label="New transaction" placement="auto">
          <FloatButton icon={<FaWallet />} />
        </Tooltip>
        {/* <FloatButton icon={<CommentOutlined />} /> */}
      </FloatButton.Group>
    </>
  );
};

export default DashboardPage;

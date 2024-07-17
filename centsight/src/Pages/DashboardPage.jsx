import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth-actions';
import { Button } from '@chakra-ui/react';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import FloatButtonGroup from '../components/floatbutton/FloatButtonGroup';
import ModalWrapper from '../components/ModalWrapper';
import { useDisclosure } from '@chakra-ui/react';
import CategoryForm from '../components/forms/CategoryForm';
import AccountForm from '../components/forms/AccountForm';
import TransactionForm from '../components/forms/TransactionForm';
import { useState } from 'react';
const DashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [title, setTitle] = useState('');
  const [modalSaveFn, setModalSaveFn] = useState(() => {});
  //TODO: User specific data should be fetched here
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleOpenModal = ({ component, title, saveFn }) => {
    setSelectedComponent(component);
    setTitle(title);
    setModalSaveFn(() => saveFn);
    onOpen();
  };

  return (
    <>
      <div>
        <Header />
        <SideMenu />
        <ModalWrapper
          isOpen={isOpen}
          onClose={onClose}
          title={title}
          onConfirm={modalSaveFn}
        >
          {selectedComponent}
        </ModalWrapper>
      </div>
      <FloatButtonGroup onOpenModal={handleOpenModal} />
    </>
  );
};

export default DashboardPage;

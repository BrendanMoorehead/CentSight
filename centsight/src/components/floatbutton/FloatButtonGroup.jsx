import React from 'react';
import { FloatButton } from 'antd';
import { TiPlus } from 'react-icons/ti';
import { MdAccountBalance } from 'react-icons/md';
import { FaWallet } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { Tooltip } from '@chakra-ui/react';
import FloatButtonElement from './FloatButtonElement';
import CategoryForm from '../forms/CategoryForm';
import AccountForm from '../forms/AccountForm';
import TransactionForm from '../forms/TransactionForm';
const FloatButtonGroup = ({ onOpenModal }) => {
  const saveCategory = () => {
    console.log('Save category function executed');
  };
  const saveTransaction = () => {
    console.log('Save transaction function executed');
  };
  const saveAccount = () => {
    console.log('Save account function executed');
  };

  return (
    <>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 24 }}
        icon={<TiPlus />}
      >
        <FloatButtonElement
          label="New category"
          icon={<MdCategory />}
          onClick={() =>
            onOpenModal({
              component: <CategoryForm />,
              title: 'New Category',
              saveFn: saveCategory,
            })
          }
        />
        <FloatButtonElement
          label="New account"
          icon={<MdAccountBalance />}
          onClick={() =>
            onOpenModal({
              component: <AccountForm />,
              title: 'New Account',
              saveFn: saveAccount,
            })
          }
        />
        <FloatButtonElement
          label="New transaction"
          icon={<FaWallet />}
          onClick={() =>
            onOpenModal({
              component: <TransactionForm />,
              title: 'New Transaction',
              saveFn: saveTransaction,
            })
          }
        />
      </FloatButton.Group>
    </>
  );
};

export default FloatButtonGroup;

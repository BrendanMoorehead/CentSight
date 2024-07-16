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
          onClick={() => onOpenModal(<CategoryForm />)}
        />
        <FloatButtonElement
          label="New account"
          icon={<MdAccountBalance />}
          onClick={() => onOpenModal(<AccountForm />)}
        />
        <FloatButtonElement
          label="New transaction"
          icon={<FaWallet />}
          onClick={() => onOpenModal(<TransactionForm />)}
        />
      </FloatButton.Group>
    </>
  );
};

export default FloatButtonGroup;

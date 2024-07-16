import React from 'react';
import { FloatButton } from 'antd';
import { TiPlus } from 'react-icons/ti';
import { MdAccountBalance } from 'react-icons/md';
import { FaWallet } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { Tooltip } from '@chakra-ui/react';
import FloatButtonElement from './FloatButtonElement';
const FloatButtonGroup = () => {
  return (
    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{ right: 24 }}
      icon={<TiPlus />}
    >
      <FloatButtonElement label="New category" icon={<MdCategory />} />
      <FloatButtonElement label="New account" icon={<MdAccountBalance />} />
      <FloatButtonElement label="New transaction" icon={<FaWallet />} />
    </FloatButton.Group>
  );
};

export default FloatButtonGroup;

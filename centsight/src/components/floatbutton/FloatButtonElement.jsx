import React from 'react';
import { Tooltip } from '@chakra-ui/react';
import { FloatButton } from 'antd';
const FloatButtonElement = ({ label, icon, onClick }) => {
  return (
    <Tooltip label={label} placement="auto">
      <FloatButton icon={icon} onClick={onClick} />
    </Tooltip>
  );
};

export default FloatButtonElement;

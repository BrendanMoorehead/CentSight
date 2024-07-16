import React from 'react';
import { Tooltip } from '@chakra-ui/react';
import { FloatButton } from 'antd';
const FloatButtonElement = ({ label, icon }) => {
  return (
    <Tooltip label={label} placement="auto">
      <FloatButton icon={icon} />
    </Tooltip>
  );
};

export default FloatButtonElement;

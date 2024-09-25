/* eslint-disable react/prop-types */
import { Tooltip } from '@chakra-ui/react';
import { FloatButton } from 'antd';
//TODO: Pull float button and build new component using NextUI Dropdown.
const FloatButtonElement = ({ label, icon, onClick }) => {
  return (
    <Tooltip label={label} placement="auto">
      <FloatButton icon={icon} onClick={onClick} />
    </Tooltip>
  );
};

export default FloatButtonElement;

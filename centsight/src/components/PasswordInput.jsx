import React from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoMdLock } from 'react-icons/io';
const PasswordInput = ({ updatePassword }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  return (
    <InputGroup size="md">
      <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
        <IoMdLock />
      </InputLeftElement>
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
        onChange={updatePassword}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleShow}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;

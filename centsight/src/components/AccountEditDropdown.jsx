import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Input,
} from '@nextui-org/react';
const AccountEditDropdown = () => {
  return (
    <Dropdown closeOnSelect={false}>
      <DropdownTrigger>
        <Button variant="bordered">Edit</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="text-text">
        <DropdownItem key="new">Edit account</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete account
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AccountEditDropdown;

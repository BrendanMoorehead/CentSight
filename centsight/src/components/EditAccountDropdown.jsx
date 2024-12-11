import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../store/account-actions';

//TODO: Add functionality to the account editing dropdown.
const EditAccountDropdown = ({ account }) => {
  const dispatch = useDispatch();
  const handleDeleteAccount = () => {
    dispatch(deleteAccount(account));
  };
  return (
    <Dropdown closeOnSelect={false}>
      <DropdownTrigger>
        <Button variant="bordered">Edit</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="text-text">
        <DropdownItem key="new">Edit account</DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onPress={handleDeleteAccount}
        >
          Delete account
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default EditAccountDropdown;

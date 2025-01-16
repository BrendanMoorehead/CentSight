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
const EditAccountDropdown = ({ account, editPress }) => {
  const dispatch = useDispatch();
  const handleDeleteAccount = () => {
    dispatch(deleteAccount(account));
  };
  const handleEditAccount = () => {
    console.log(account);
    editPress();
  };
  return (
    <Dropdown closeOnSelect={false}>
      <DropdownTrigger>
        <Button variant="bordered">Edit</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="text-text">
        <DropdownItem key="new" onPress={handleEditAccount}>Edit account</DropdownItem>
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

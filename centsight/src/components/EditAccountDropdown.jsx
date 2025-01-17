import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../store/account-actions';

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
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Edit</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="text-text">
        <DropdownItem key="new" onPress={handleEditAccount}>
          Edit account
        </DropdownItem>
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

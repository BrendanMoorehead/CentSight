import { Flex, Spacer, Button, Heading } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth-actions';
const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Flex alignItems="center" gap="2" p="4" bg="#e0e0e0">
      <Heading>Centsight</Heading>
      <Spacer />
      <Button onClick={handleLogout}>Logout</Button>
    </Flex>
  );
};

export default Header;

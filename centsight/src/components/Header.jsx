import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth-actions';
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@heroui/react";

const headerLinks = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
  },
  // {
  //   key: 'budget',
  //   label: 'Budget',
  //   path: '/budget',
  // },
  {
    key: 'transactions',
    label: 'Transactions',
    path: '/transactions',
  },
  {
    key: 'accounts',
    label: 'Accounts',
    path: '/accounts',
  },
  {
    key: 'categories',
    label: 'Categories',
    path: '/categories',
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleNav = (key) => {
    console.log('nav', key);
    const item = findMenuItemByKey(headerLinks, key);
    if (item && item.path) {
      navigate(item.path);
    }
  };

  const findMenuItemByKey = (menuItems, key) => {
    for (let item of menuItems) {
      if (item.key === key) return item;
      if (item.children) {
        const found = findMenuItemByKey(item.children, key);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <Navbar
      maxWidth="full"
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">Centsight</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        {headerLinks.map((link) => (
          <NavbarItem key={link.key}>
            <Link color="foreground" onPress={() => handleNav(link.key)}>
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={handleLogout}>Log out</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;

import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    key: 'budget',
    label: 'Budget',
  },
  {
    key: 'transactions',
    label: 'Transactions',
  },
  {
    key: 'accounts',
    label: 'Accounts',
    children: [
      {
        key: 'sub6',
        label: 'Accounts',
      },
      { key: 'sub7', label: 'Accounts' },
    ],
  },
  {
    key: 'categories',
    label: 'Categories',
    path: '/categories',
  },
];
const SideMenu = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const item = findMenuItemByKey(items, e.key);
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
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['dashboard']}
      mode="inline"
      items={items}
      onClick={handleClick}
    />
  );
};

export default SideMenu;

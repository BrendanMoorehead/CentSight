import React from 'react';
import { Menu } from 'antd';

const items = [
  {
    key: 'dashboard',
    label: 'Dashboard',
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
  },
];
const SideMenu = () => {
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
    />
  );
};

export default SideMenu;

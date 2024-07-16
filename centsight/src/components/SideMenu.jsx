import React from 'react';
import { Menu } from 'antd';

const items = [
  {
    key: 'sub1',
    label: 'Dashboard',
  },
  {
    key: 'sub2',
    label: 'Budget',
  },
  {
    key: 'sub3',
    label: 'Transactions',
  },
  {
    key: 'sub4',
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
    key: 'sub5',
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

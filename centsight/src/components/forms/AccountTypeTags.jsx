import React from 'react';
import { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/tabs';

const AccountTypeTags = ({ onChange }) => {
  const [selectedKey, setSelectedKey] = useState('chequing');
  const handleSelectionChange = (key) => {
    if (key !== selectedKey) {
      setSelectedKey(key);
      onChange(key);
    }
  };
  return (
    <div>
      <Tabs
        onSelectionChange={handleSelectionChange}
        fullWidth
        aria-label="Options"
        className="flex"
      >
        <Tab key="chequing" title="Chequing"></Tab>
        <Tab key="credit" title="Credit"></Tab>
        <Tab key="cash" title="Cash"></Tab>
      </Tabs>
    </div>
  );
};

export default AccountTypeTags;

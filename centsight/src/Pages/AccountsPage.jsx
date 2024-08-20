import React from 'react';
import { ScrollShadow, CheckboxGroup, Checkbox } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import AccountCard from '../components/accounts/AccountCard';
import SlimAccountCard from '../components/SlimAccountCard';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
const AccountsPage = () => {
  const accounts = useSelector((state) => state.account.accounts);
  const [typeSelected, setTypeSelected] = useState([
    'chequing',
    'cash',
    'credit',
  ]);
  const [activeAccount, setActiveAccount] = useState(null);

  const handleAccountClick = (account) => {
    console.log('click');
    setActiveAccount(account);
  };

  const filteredAccounts = accounts.filter((account) =>
    typeSelected.includes(account.type)
  );

  return (
    <div className="p-12 h-[1040px] grid grid-cols-4 gap-8">
      <div className="col-span-1">
        <div className="flex justify-between">
          <p className="text-headline text-2xl font-normal pb-6">Accounts</p>
          <Button color="primary" variant="ghost">
            Add
          </Button>
        </div>
        <div>
          <CheckboxGroup
            label="Type"
            defaultValue={['chequing', 'credit', 'cash']}
            orientation="horizontal"
            onChange={setTypeSelected}
          >
            <Checkbox value="chequing">Chequing</Checkbox>
            <Checkbox value="credit">Credit</Checkbox>
            <Checkbox value="cash">Cash</Checkbox>
          </CheckboxGroup>
        </div>
        <ScrollShadow hideScrollBar className="h-5/6">
          {filteredAccounts.map((account) => (
            <SlimAccountCard
              onClick={handleAccountClick}
              key={account.id}
              name={account.name}
              type={account.type}
              balance={account.balance}
            />
          ))}
        </ScrollShadow>
      </div>
      <div className="col-span-3 border-1"></div>
    </div>
  );
};

export default AccountsPage;

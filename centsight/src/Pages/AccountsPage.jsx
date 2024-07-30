import React from 'react';
import { ScrollShadow } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import AccountCard from '../components/accounts/AccountCard';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
const AccountsPage = () => {
  const accounts = useSelector((state) => state.account.accounts);

  const [activeAccount, setActiveAccount] = useState(null);

  const handleAccountClick = (account) => {
    console.log('click');
    setActiveAccount(account);
  };

  return (
    <div className="p-12 h-[1040px] grid grid-cols-4 gap-24">
      <div className="col-span-1">
        <div className="flex justify-between">
          <p className="text-headline text-2xl font-normal pb-6">Accounts</p>
          <Button color="primary" variant="ghost">
            Add
          </Button>
        </div>
        <ScrollShadow hideScrollBar className="h-5/6">
          {accounts.map((account) => (
            <AccountCard
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

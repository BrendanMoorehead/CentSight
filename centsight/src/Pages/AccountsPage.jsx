import React from 'react';
import { ScrollShadow } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import AccountCard from '../components/accounts/AccountCard';
const AccountsPage = () => {
  const accounts = useSelector((state) => state.account.accounts);

  return (
    <div className="p-12 h-full">
      <p className="text-headline text-2xl font-normal pb-6">Accounts</p>
      <ScrollShadow hideScrollBar className="w-[300px] h-3/4">
        {accounts.map((account) => (
          <AccountCard key={account.id} name={account.name} />
        ))}
      </ScrollShadow>
    </div>
  );
};

export default AccountsPage;

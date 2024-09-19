import React from 'react';
import { ScrollShadow, CheckboxGroup, Checkbox } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import AccountCard from '../components/accounts/AccountCard';
import SlimAccountCard from '../components/SlimAccountCard';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import AccountsDetails from '../components/AccountsDetails';
import PageMargins from '../components/PageMargins';
import PageHeaderText from '../components/PageHeaderText';
const AccountsPage = () => {
  const accounts = useSelector((state) => state.account.accounts);
  const transactions = useSelector((state) => state.transaction.transactions);
  const [typeSelected, setTypeSelected] = useState([
    'chequing',
    'cash',
    'credit',
  ]);
  const [activeAccountId, setActiveAccountId] = useState(null);
  const activeAccount = accounts?.find((acc) => acc.id === activeAccountId);
  const handleAccountClick = (account) => {
    console.log('click');
    setActiveAccountId(account.id);
  };

  const filteredAccounts = accounts.filter((account) =>
    typeSelected.includes(account.type)
  );

  return (
    <PageMargins>
      <PageHeaderText text="Accounts" />
      <div className="col-span-1">
        <div className="flex justify-between">
          <Button color="primary" variant="ghost">
            Add
          </Button>
        </div>
        <div className="pb-4">
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
              onPress={() => handleAccountClick(account)}
              key={account.id}
              name={account.name}
              type={account.type}
              balance={account.balance}
            />
          ))}
        </ScrollShadow>
      </div>
      <div className="col-span-3">
        {activeAccount ? (
          <AccountsDetails
            account={activeAccount}
            transactions={transactions}
          />
        ) : (
          <div className="py-24 text-headline text-xl font-normal flex justify-center">
            Select an account to see details.
          </div>
        )}
      </div>
    </PageMargins>
  );
};

export default AccountsPage;

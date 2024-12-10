import React from 'react';
import { ScrollShadow, CheckboxGroup, Checkbox } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import AccountCard from '../components/accounts/AccountCard';
import SlimAccountCard from '../components/SlimAccountCard';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import AccountsDetails from '../components/accounts/AccountsDetails';
import PageMargins from '../components/PageMargins';
import PageHeaderText from '../components/PageHeaderText';
import AccountModal from '../components/modals/AccountModal';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
const AccountsPage = () => {
  const accounts = useSelector((state) => state.account.accounts);
  const transactions = useSelector((state) => state.transaction.transactions);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [typeSelected, setTypeSelected] = useState([
    'chequing',
    'cash',
    'credit',
  ]);
  const [activeAccountId, setActiveAccountId] = useState(null);
  const activeAccount = accounts?.find((acc) => acc.id === activeAccountId);
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const accountId = location.state?.accountId;

  useEffect(() => {
    if (accountId) {
      setActiveAccountId(accountId);
    }
  }, [accountId]);

  const handleAccountClick = (account) => {
    console.log('click');
    setActiveAccountId(account.id);
  };

  const filteredAccounts = accounts.filter((account) =>
    typeSelected.includes(account.type)
  );

  return (
    <PageMargins>
      <AccountModal 
        isOpen={openAccountModal}
        closeModal={() => setOpenAccountModal(false)}
        userId={auth.user.user.id}
      />
      <div className="col-span-1">
        <div className="flex justify-between">
        <PageHeaderText text="Accounts" />
          <Button color="primary" onClick={() => setOpenAccountModal(true)}>
            Add
          </Button>
        </div>
        <div className='grid grid-cols-4 gap-16'>
          <div>
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
        <ScrollShadow hideScrollBar className="h-2/3">
          {filteredAccounts.map((account) => (
            <SlimAccountCard
              onPress={() => handleAccountClick(account)}
              key={account.id}
              name={account.name}
              type={account.type}
              balance={account.balance}
              selected={activeAccountId === account.id}
            />
          ))}
        </ScrollShadow>
        </div>
      
      <div className="col-span-3 pt-16">
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
      </div>
      </div>
    </PageMargins>
  );
};

export default AccountsPage;

/* eslint-disable react/prop-types */
import { Card, CardBody } from '@nextui-org/react';
import { useState, useMemo } from 'react';
import { Tabs, Tab } from '@nextui-org/tabs';
import AccountTransactionsTable from '../AccountTransactionTable';
import EditAccountDropdown from '../EditAccountDropdown';
import AccountModal from '../modals/AccountModal';
let tabs = [
  {
    id: 'past7days',
    label: 'Past 7 Days',
  },
  {
    id: 'thismonth',
    label: 'This Month',
  },
  {
    id: 'thisyear',
    label: 'This Year',
  },
  {
    id: 'alltime',
    label: 'All Time',
  },
];
const AccountsDetails = ({ account, transactions }) => {
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('past7days');
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.account_from_id === account.id ||
      transaction.account_to_id === account.id
  );
  const handleSubmit = (data) => {
    console.log(data);
  };
  //TODO: Pull time period filter capabilites to outside function to be used by a filter component.
  const handleTimePeriodChange = (id) => {
    setSelectedTimePeriod(id);
  };
  const currentDate = new Date();
  const filteredArray = useMemo(() => {
    return filteredTransactions.filter((item) => {
      const itemDate = new Date(item.date);
      if (isNaN(itemDate.getTime())) return false;
      if (selectedTimePeriod === 'past7days') {
        const past7Days = new Date();
        past7Days.setDate(currentDate.getDate() - 7);
        return itemDate >= past7Days && itemDate <= currentDate;
      }

      if (selectedTimePeriod === 'thismonth') {
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        return itemDate >= startOfMonth && itemDate <= currentDate;
      }

      if (selectedTimePeriod === 'thisyear') {
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        return itemDate >= startOfYear && itemDate <= currentDate;
      }

      return true; // Default case - show all items
    });
  }, [filteredTransactions, selectedTimePeriod, currentDate]);

  let spendingSum = 0;
  spendingSum =
    filteredArray.reduce((acc, transaction) => {
      // Ensure transaction.amount is a valid number
      if (transaction.type === 'expense' && !isNaN(transaction.amount)) {
        return acc - parseFloat(transaction.amount); // Use parseFloat to ensure correct conversion
      }
      return acc;
    }, 0) || 0;

  let incomeSum = 0;
  incomeSum =
    filteredArray.reduce((acc, transaction) => {
      // Ensure transaction.amount is a valid number
      if (transaction.type === 'income' && !isNaN(transaction.amount)) {
        return acc + parseFloat(transaction.amount); // Use parseFloat to ensure correct conversion
      }
      return acc;
    }, 0) || 0;

  const numTransactions = filteredArray.length;

  const formattedBalance = account?.balance.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedIncome = incomeSum?.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedSpending = spendingSum?.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <>
    <div className="flex flex-col gap-8 flex-grow h-full">
      {/* ACCOUNT HEADER */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-headline text-2xl font-normal">{account.name}</p>
          <p className="text-gray-300 text-lg font-headline font-extralight">
            {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
          </p>
        </div>
        <EditAccountDropdown account={account} editPress={() => setOpenAccountModal(true)}/>
      </div>
      {/* MAIN ACCOUNT DETAILS */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-2 flex">
          <CardBody className="p-6 flex justify-end">
            <p className="text-gray-300 text-6xl pb-2 font-headline font-light">
              {formattedBalance}
            </p>
            <p className="text-gray-400 text-lg font-headline font-extralight">
              Balance
            </p>
          </CardBody>
        </Card>
        <div className="col-span-3 flex-grow flex flex-col gap-4">
          <Tabs
            fullWidth
            aria-label="Dynamic tabs"
            items={tabs}
            onSelectionChange={handleTimePeriodChange}
          >
            {(item) => <Tab key={item.id} title={item.label}></Tab>}
          </Tabs>
          <div className="grid grid-cols-3 gap-4">
            <Card className="flex-grow">
              <CardBody className="p-6">
                <p className="text-gray-300 text-2xl font-headline">
                  {numTransactions}
                </p>
                <p className="text-gray-400 text-lg font-headline font-extralight">
                  Transactions
                </p>
              </CardBody>
            </Card>
            <Card className="flex-grow">
              <CardBody className="p-6">
                <p className="text-gray-300 text-2xl font-headline ">
                  {formattedSpending}
                </p>
                <p className="text-gray-400 text-lg font-headline font-extralight">
                  Spending
                </p>
              </CardBody>
            </Card>
            <Card className="flex-grow">
              <CardBody className="p-6">
                <p className="text-gray-300 text-2xl font-headline ">
                  {formattedIncome}
                </p>
                <p className="text-gray-400 text-lg font-headline font-extralight">
                  Income
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex h-full">
        <AccountTransactionsTable
          transactions={filteredArray}
          filter={selectedTimePeriod}
        />
      </div>
    </div>
    <AccountModal
      isOpen={openAccountModal}
      closeModal={() => setOpenAccountModal(false)}
      title="Edit Account"
      buttonText="Update"
      accountData={account}
      onSubmit={handleSubmit}
    />
    </>
  );
};

export default AccountsDetails;

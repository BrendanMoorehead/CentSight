import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import { Tabs, Tab } from '@nextui-org/tabs';
import TransactionsTable from './TransactionsTable';
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
const AccountsDetails = ({ account }) => {
  const formattedBalance =
    account.balance < 0
      ? `-$${Math.abs(account.balance).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : `$${account.balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
  return (
    <div className="flex flex-col gap-8">
      {/* ACCOUNT HEADER */}
      <div className="flex flex-col">
        <p className="text-headline text-2xl font-normal">{account.name}</p>
        <p className="text-gray-300 text-lg font-headline font-extralight">
          {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
        </p>
      </div>
      {/* MAIN ACCOUNT DETAILS */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="col-span-2">
          <CardBody className="p-6">
            <p className="text-gray-300 text-4xl font-headline pb-2">
              {formattedBalance}
            </p>
            <p className="text-gray-400 text-lg font-headline font-extralight">
              Balance
            </p>
          </CardBody>
        </Card>
        <div className="col-span-3 flex-grow flex flex-col gap-4">
          <Tabs fullWidth aria-label="Dynamic tabs" items={tabs}>
            {(item) => <Tab key={item.id} title={item.label}></Tab>}
          </Tabs>
          <div className="grid grid-cols-3 gap-4">
            <Card className="flex-grow">
              <CardBody className="p-6">
                <p className="text-gray-300 text-2xl font-headline">2</p>
                <p className="text-gray-400 text-lg font-headline font-extralight">
                  Transactions
                </p>
              </CardBody>
            </Card>
            <Card className="flex-grow">
              <CardBody className="p-6">
                <p className="text-gray-300 text-2xl font-headline ">
                  {formattedBalance}
                </p>
                <p className="text-gray-400 text-lg font-headline font-extralight">
                  Spending
                </p>
              </CardBody>
            </Card>
            <Card className="flex-grow">
              <CardBody className="p-6">
                <p className="text-gray-300 text-2xl font-headline ">
                  {formattedBalance}
                </p>
                <p className="text-gray-400 text-lg font-headline font-extralight">
                  Income
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <TransactionsTable />
    </div>
  );
};

export default AccountsDetails;

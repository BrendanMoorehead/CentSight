import FloatButtonGroup from '../components/floatbutton/FloatButtonGroup';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Card, Select, SelectItem, ScrollShadow } from '@nextui-org/react';
import MonthSpendingChart from '../components/MonthSpendingChart';
import SlimAccountCard from '../components/SlimAccountCard';
import TransactionsTable from '../components/TransactionsTable';
import NetworthCard from '../components/NetworthCard';
import AverageSpendingCard from '../components/AverageSpendingCard';
import ComparisonCard from '../components/reusable/ComparisonCard';
import PageHeaderText from '../components/PageHeaderText';
import PageMargins from '../components/PageMargins';
import SpendingSection from '../components/dashboard/SpendingSection';
import { useNavigate } from 'react-router-dom';
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const yearNames = [...Array(5).keys()].map((i) =>
  (new Date().getFullYear() - i).toString()
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(0);
  const accounts = useSelector((state) => state.account.accounts);
  const transactions = useSelector((state) => state.transaction.transactions);

  const handleYearChange = (value) => {
    setSelectedYear(Number(value.anchorKey));
  };

  const handleMonthChange = (value) => {
    console.log(value.anchorKey);
    setSelectedMonth(Number(value.anchorKey));
  };
  const handleAccountsClick = (accountId) => {
    navigate('/accounts', {
      state: 
        {accountId},
    });
  };

  return (
    <>
      <FloatButtonGroup />
      <PageMargins>
        <PageHeaderText text="Dashboard" />
        <SpendingSection />
        <div className="flex justify-between justify-center pb-4">
          <p className="text-headline text-xl font-normal content-center">
            Spending
          </p>
          <div className="flex gap-2 w-80">
            <Select
              label="Month"
              onSelectionChange={handleMonthChange}
              defaultSelectedKeys={[String(selectedMonth)]}
            >
              {monthNames.map((month, index) => (
                <SelectItem
                  className="text-text"
                  key={index}
                  value={String(index)}
                >
                  {month}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Year"
              onSelectionChange={handleYearChange}
              defaultSelectedKeys={[String(selectedYear)]}
            >
              {yearNames.map((year, index) => (
                <SelectItem
                  className="text-text"
                  key={index}
                  value={year} // Use actual year here
                >
                  {year}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-6">
          <Card className="p-8 col-span-4">
            <MonthSpendingChart
              month={selectedMonth}
              year={Number(yearNames[selectedYear])}
            />
          </Card>
          <div className="flex flex-col gap-4">
            <NetworthCard accounts={accounts} />
            <AverageSpendingCard
              transactions={transactions}
              title="Average Spending"
              type="expense"
            />
            <AverageSpendingCard
              transactions={transactions}
              title="Average Income"
              type="income"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-12 pt-12">
          <div>
            <p className="text-headline text-xl font-normal content-center pb-4">
              Accounts
            </p>
            <ScrollShadow hideScrollBar className="h-[300px]" size={100}>
              {accounts && accounts.length > 0 ? (
                accounts.map((account) => (
                  <SlimAccountCard
                    key={account.id}
                    name={account.name}
                    type={account.type}
                    balance={account.balance}
                    clickable={true}
                    onPress={() => handleAccountsClick(account.id)}
                  />
                ))
              ) : (
                <p>No accounts available</p>
              )}
            </ScrollShadow>
          </div>
          <div className="col-span-3">
            <p className="text-headline text-xl font-normal content-center pb-6">
              Recently Added Transactions
            </p>
            {transactions && transactions.length > 0 ? (
              <TransactionsTable transactions={transactions} />
            ) : (
              <p>No transactions available</p>
            )}
          </div>
        </div>
        {/* <ComparisonCard text="spending" currentValue={1} period="this week" /> */}
      </PageMargins>
    </>
  );
};

export default DashboardPage;

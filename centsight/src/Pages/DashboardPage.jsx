import FloatButtonGroup from '../components/floatbutton/FloatButtonGroup';
import { AreaChart } from '@tremor/react';
import { useSelector } from 'react-redux';
import { chartTransactions } from '../../utils/chartTransactions';
import { useEffect, useState } from 'react';
import { Card, Select, SelectItem, ScrollShadow } from '@nextui-org/react';
import MonthSpendingChart from '../components/MonthSpendingChart';
import AccountCard from '../components/accounts/AccountCard';
import TransactionsTable from '../components/TransactionsTable';
import SlimAccountCard from '../components/SlimAccountCard';
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

const yearNames = [...Array(5).keys()].map((i) => new Date().getFullYear() - i);

const DashboardPage = () => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const accounts = useSelector((state) => state.account.accounts);
  const handleYearChange = (value) => {
    console.log(value);
    setSelectedYear(Number(value));
  };

  const handleMonthChange = (value) => {
    console.log(value);
    setSelectedMonth(Number(value));
  };

  return (
    <>
      <FloatButtonGroup />
      <div className="flex-col flex gap-6 p-12">
        <p className="text-headline text-2xl font-semibold">Dashboard</p>
        <div className="flex justify-between justify-center ">
          <p className="text-headline text-xl font-normal content-center">
            Spending
          </p>
          <div className="flex gap-2 w-80">
            <Select
              label="Month"
              onSelectionChange={(value) => handleMonthChange(value.anchorKey)}
              value={String(selectedMonth)}
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
              onSelectionChange={(value) => handleYearChange(value.anchorKey)}
              defaultSelectedKeys={[String(selectedYear)]}
            >
              {yearNames.map((year) => (
                <SelectItem
                  className="text-text"
                  key={year}
                  value={String(year)}
                >
                  {year}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <Card className="p-8">
          <MonthSpendingChart month={selectedMonth} year={selectedYear} />
        </Card>
        <div className="grid grid-cols-4 gap-12 pt-12">
          <div>
            <p className="text-headline text-xl font-normal content-center pb-4 ">
              Accounts
            </p>
            <ScrollShadow hideScrollBar className="h-5/6">
              {accounts.map((account) => (
                <SlimAccountCard
                  key={account.id}
                  name={account.name}
                  type={account.type}
                  balance={account.balance}
                />
              ))}
            </ScrollShadow>
          </div>
          <div className="col-span-3">
            <p className="text-headline text-xl font-normal content-center pb-4">
              Recently Added Transactions
            </p>

            <TransactionsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

import FloatButtonGroup from '../components/floatbutton/FloatButtonGroup';
import { Chip } from '@nextui-org/chip';
import { AreaChart } from '@tremor/react';
import { useSelector } from 'react-redux';
import { chartTransactions } from '../../utils/chartTransactions';
import { useEffect, useState } from 'react';
const chartdata = [
  {
    date: 'Jan 01',
    spending: 10,
  },
  {
    date: 'Jan 02',
    spending: 30,
  },
  {
    date: 'Jan 03',
    spending: 30,
  },
  {
    date: 'Jan 04',
    spending: 30,
  },
  {
    date: 'Jan 05',
    spending: 120,
  },
  {
    date: 'Jan 06',
    spending: 150,
  },
  {
    date: 'Jan 07',
    spending: 220,
  },
  {
    date: 'Jan 08',
    spending: 220,
  },
  {
    date: 'Jan 09',
    spending: 220,
  },
  {
    date: 'Jan 10',
    spending: 600,
  },
  {
    date: 'Jan 11',
    spending: 610,
  },
  {
    date: 'Jan 12',
    spending: 800,
  },
  {
    date: 'Jan 13',
    spending: 900,
  },
  {
    date: 'Jan 14',
    spending: 1100,
  },
  {
    date: 'Jan 15',
    spending: 1102,
  },
  {
    date: 'Jan 16',
    spending: 1200,
  },
  {
    date: 'Jan 17',
    spending: 1200,
  },
  {
    date: 'Jan 18',
    spending: 1200,
  },
  {
    date: 'Jan 19',
    spending: 1200,
  },
  {
    date: 'Jan 20',
    spending: 1350,
  },
  {
    date: 'Jan 21',
    spending: 1356,
  },
  {
    date: 'Jan 22',
    spending: 2000,
  },
  {
    date: 'Jan 23',
    spending: 2010,
  },
  {
    date: 'Jan 24',
    spending: 2010,
  },
  {
    date: 'Jan 25',
    spending: 2010,
  },
  {
    date: 'Jan 26',
    spending: 2050,
  },
  {
    date: 'Jan 27',
    spending: 2100,
  },
  {
    date: 'Jan 28',
    spending: 2200,
  },
  {
    date: 'Jan 29',
    spending: 2300,
  },
  {
    date: 'Jan 30',
    spending: 2400,
  },
  {
    date: 'Jan 31',
    spending: 2500,
  },
];

const dataFormatter = (number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;
const DashboardPage = () => {
  const transactions = useSelector((state) => state.transaction.transactions);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Only call chartTransactions when transactions change
    const data = chartTransactions(7, 2024, transactions);
    console.log(data);
    setChartData(data);
  }, [transactions]);

  return (
    <>
      <p className="text-3xl font-headline">Dashboard</p>
      <FloatButtonGroup />
      <AreaChart
        showGridLines={false}
        className="h-80"
        data={chartData}
        index="date"
        categories={['total']}
        colors={['rose']}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
        curveType="monotoneX"
      />
    </>
  );
};

export default DashboardPage;

import FloatButtonGroup from '../components/floatbutton/FloatButtonGroup';
import { AreaChart } from '@tremor/react';
import { useSelector } from 'react-redux';
import { chartTransactions } from '../../utils/chartTransactions';
import { useEffect, useState } from 'react';

const dataFormatter = (number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;
const DashboardPage = () => {
  const transactions = useSelector((state) => state.transaction.transactions);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Only call chartTransactions when transactions change
    const data = chartTransactions(8, 2024, transactions);
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
        categories={['expenses', 'income']}
        colors={['customBlue', 'customOrange']}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
        curveType="monotoneX"
        showAnimation={true}
      />
    </>
  );
};

export default DashboardPage;

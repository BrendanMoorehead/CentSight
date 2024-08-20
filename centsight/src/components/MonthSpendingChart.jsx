import { chartTransactions } from '../../utils/chartTransactions';
import { AreaChart } from '@tremor/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const dataFormatter = (number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

const MonthSpendingChart = ({ month, year }) => {
  const transactions = useSelector((state) => state.transaction.transactions);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const data = chartTransactions(month, year, transactions);
    setChartData(data);
  }, [month, year, transactions]);
  return (
    <AreaChart
      showGridLines={false}
      className="h-80"
      data={chartData}
      index="date"
      showAnimation={true}
      colors={['rose', 'emerald']}
      categories={['expenses', 'income']}
      valueFormatter={dataFormatter}
      onValueChange={(v) => console.log(v)}
      curveType="monotoneX"
    />
  );
};

export default MonthSpendingChart;

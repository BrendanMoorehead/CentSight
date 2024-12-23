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
    console.log("Rendering with month:", month, "year:", year); // Debugging
    //TODO: memoize chartTransactions
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
      yAxisWidth={56}  // Add explicit width for Y axis
      showYAxis={true}
      showXAxis={true}
      showLegend={true}
      autoMinValue={true}
      allowDecimals={false}
    />
  );
};

export default MonthSpendingChart;

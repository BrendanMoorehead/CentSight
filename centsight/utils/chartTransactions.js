import { addDays, startOfMonth, endOfMonth, format } from 'date-fns';
export const chartTransactions = (month, year, transactions) => {
  if (!Array.isArray(transactions)) {
    console.error('Transactions should be an array');
    return [];
  }
  console.log('CHART CALLED');
  console.log(month, transactions);
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);

  const daysArray = [];
  let currentDate = start;
  while (currentDate <= end) {
    const formattedDate = format(currentDate, 'yyyy-MM-dd');

    const transactionsForDay = transactions?.filter((transaction) => {
      const transactionDate = format(new Date(transaction.date), 'yyyy-MM-dd');
      return (
        transactionDate === formattedDate && transaction.type === 'expense'
      );
    });
    const totalForDay = transactionsForDay.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    daysArray.push({
      date: formattedDate,
      total: totalForDay,
    });
    currentDate = addDays(currentDate, 1);
  }

  for (let i = 0; i < daysArray.length; i++) {
    daysArray[i].total += daysArray[i].total;
  }

  return daysArray;
  //   const dailyData = filteredTransactions.map(())
};

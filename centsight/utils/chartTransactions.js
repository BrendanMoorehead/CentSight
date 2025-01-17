import { addDays, startOfMonth, endOfMonth, format, parseISO } from 'date-fns';
export const chartTransactions = (month, year, transactions, type) => {
  if (!Array.isArray(transactions)) {
    transactions = [];
  }
  console.log(month, transactions);
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(start);

  const daysArray = [];
  let currentDate = start;
  while (currentDate <= end) {
    const formattedDate = format(currentDate, 'yyyy-MM-dd');

    const expenseTransactionsForDay = transactions?.filter((transaction) => {
      const transactionDate = format(parseISO(transaction.date), 'yyyy-MM-dd');
      return (
        transactionDate === formattedDate && transaction.type === 'expense'
      );
    });
    const incomeTransactionsForDay = transactions?.filter((transaction) => {
      const transactionDate = format(parseISO(transaction.date), 'yyyy-MM-dd');
      return transactionDate === formattedDate && transaction.type === 'income';
    });
    const totalExpensesForDay = expenseTransactionsForDay.reduce(
      (sum, transaction) => sum + Number(transaction.amount),
      0
    );
    const totalIncomeForDay = incomeTransactionsForDay.reduce(
      (sum, transaction) => sum + Number(transaction.amount),
      0
    );
    daysArray.push({
      date: format(new Date(currentDate), 'MMMM d'),
      expenses: totalExpensesForDay,
      income: totalIncomeForDay,
    });
    currentDate = addDays(currentDate, 1);
  }

  for (let i = 0; i < daysArray.length; i++) {
    if (i > 0) daysArray[i].expenses += daysArray[i - 1].expenses;
    if (i > 0) daysArray[i].income += daysArray[i - 1].income;
  }

  return daysArray;
};

import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody } from "@heroui/react";
import { parseISO, format } from 'date-fns';
const AverageSpendingCard = ({ transactions, type, title }) => {
  let monthlySpend = {};

  const calculateMonthlySpend = (transactions) => {
    // Group transactions by month and sum the spend for each month
    transactions && transactions.forEach((transaction) => {
      const transactionDate = parseISO(transaction.date);
      const monthKey = format(transactionDate, 'yyyy-MM'); // Group by Year-Month

      if (!monthlySpend[monthKey]) {
        monthlySpend[monthKey] = 0;
      }
      if (transaction.type === type) {
        monthlySpend[monthKey] += Math.abs(Number(transaction.amount)); // Add absolute value to handle negative amounts
      }
    });

    // Get the total spend and the number of months with transactions
    const totalSpend = Object.values(monthlySpend).reduce(
      (acc, spend) => acc + spend,
      0
    );
    const numberOfMonths = Object.keys(monthlySpend).length;

    // Calculate the average monthly spend
    return numberOfMonths > 0 ? totalSpend / numberOfMonths : 0;
  };

  monthlySpend = calculateMonthlySpend(transactions);
  const formattedSpending = monthlySpend?.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <Card className="flex-grow">
      <CardBody className="p-6 flex justify-end">
        <p className="text-gray-300 text-2xl font-headline ">
          {formattedSpending}
        </p>
        <p className="text-gray-400 text-lg font-headline font-extralight">
          {title}
        </p>
      </CardBody>
    </Card>
  );
};

export default AverageSpendingCard;

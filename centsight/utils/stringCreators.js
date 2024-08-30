/**
 * Gets a string to be displayed on a transaction table when there are no available transactions for that time period.
 *
 * @param {*} timePeriod The filter for which transactions to display on the table.
 * @returns a string specific to the time period to be displayed on the transaction table.
 */
export const accountsGetEmptyTransactionTableString = (timePeriod) => {
  switch (timePeriod) {
    case 'past7days':
      return 'No transactions in the past 7 days';
    case 'thismonth':
      return 'No transactions this month';
    case 'thisyear':
      return 'No transactions this year';
    default:
      return 'No transactions found';
  }
};

export const filterTransactions = (
  transactions,
  { type, categories, accounts, range, value }
) => {
  return transactions.filter((transaction) => {
    const typeMatch = type.length === 0 || type.includes(transaction.type);
    const categoryMatch =
      categories.length === 0 || categories.includes(transaction.category_id);
    const accountMatch =
      accounts.length === 0 ||
      accounts.includes(transaction.account_from_id) ||
      accounts.includes(transaction.account_from_id);
    const rangeMatch =
      !range.startDate ||
      !range.endDate ||
      (new Date(transaction.date) >= new Date(range.startDate) &&
        new Date(transaction.date) <= new Date(range.endDate));
    const searchMatch =
      !value || transaction.note.toLowerCase().includes(value.toLowerCase());
    return (
      typeMatch && categoryMatch && accountMatch && rangeMatch && searchMatch
    );
  });
};

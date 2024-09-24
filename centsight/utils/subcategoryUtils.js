/**
 * Takes a list of subcategories and transactions and creates a list of new subcategory objects with a transaction count, spending total, and income total.
 *
 * @param {*} subcategories List of subcategory objects.
 * @param {*} transactions  List of trasaction objects.
 * @returns List of new subcategory objects with transaction count, spending total, and income total.
 */
export const getSubcategoryFinancialDetails = (subcategories, transactions) => {
  //Accumulate and assign the transaction count, income, and spending to each subcategory.
  return subcategories.map((subcategory) => {
    const transactionCount = transactions.reduce(
      (acc, transaction) =>
        transaction.subcategory_id === subcategory.id && acc + 1,
      0
    );
    const subcategorySpending = transactions.reduce((acc, transaction) => {
      if (
        transaction.subcategory_id === subcategory.id &&
        transaction.type === 'expense'
      ) {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    const subcategoryIncome = transactions.reduce((acc, transaction) => {
      if (
        transaction.subcategory_id === subcategory.id &&
        transaction.type === 'income'
      ) {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    return {
      id: subcategory.id,
      name: subcategory.name,
      transactionCt: transactionCount || 0,
      spending: subcategorySpending || 0,
      income: subcategoryIncome || 0,
    };
  });
};

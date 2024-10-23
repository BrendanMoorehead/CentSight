import { createSelector } from 'reselect';

const getTransactions = (state) => state.transaction.transactions;
const getAccounts = (state) => state.account.accounts;
const getCategories = (state) => state.category.categories;

export const getProcessedTransactions = createSelector(
  [getTransactions, getAccounts, getCategories],
  (transactions, accounts, categories) => {
    return Object.values(transactions).map((transaction) => ({
      ...transaction,
      sendingAccount: accounts[transaction.account_from_id] || {},
      receivingAccount: accounts[transaction.account_to_id] || {},
      category: categories[transaction.category_id] || {},
      subcategory:
        (categories[transaction.category_id]?.subcategories || {})[
          transaction.subcategory_id
        ] || {},
    }));
  }
);

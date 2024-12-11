//CalculateAccountBalancesWithDeletedTransactions() Test Data
export const incomeAccounts1 = [
  { id: 1234, balance: 35.66, name: 'Income Account 1', type: 'chequing' },
];
export const incomeTransactions1 = [
  {
    id: 1234,
    type: 'income',
    amount: 30.66,
    account_from_id: 1234,
    account_to_id: 1234,
  },
];
export const expectedIncomeAccounts1 = [
  { id: 1234, balance: 5.0, name: 'Income Account 1', type: 'chequing' },
];

export const expenseAccounts1 = [
  { id: 1234, balance: 102.99, name: 'Expense Account 1', type: 'chequing' },
];
export const expenseTransactions1 = [
  {
    id: 1234,
    type: 'expense',
    amount: 30.46,
    account_from_id: 1234,
    account_to_id: 1234,
  },
];
export const expectedExpenseAccounts1 = [
  { id: 1234, balance: 133.45, name: 'Expense Account 1', type: 'chequing' },
];
export const transferAccounts1 = [
  { id: 1, balance: 109.42, name: 'Transfer Account 1', type: 'chequing' },
  { id: 2, balance: 3456.77, name: 'Transfer Account 2', type: 'chequing' },
];
export const transferTransactions1 = [
  {
    id: 1,
    type: 'transfer',
    amount: 109.42,
    account_from_id: 1,
    account_to_id: 2,
  },
];
export const expectedTransferAccounts1 = [
  { id: 1, balance: 218.84, name: 'Transfer Account 1', type: 'chequing' },
  { id: 2, balance: 3347.35, name: 'Transfer Account 2', type: 'chequing' },
];

export const multiTypeAccounts1 = [
  { id: 1, balance: 109.42, name: 'Multi Type Account 1', type: 'chequing' },
  { id: 2, balance: 3456.77, name: 'Multi Type Account 2', type: 'cash' },
  { id: 3, balance: 300, name: 'Multi Type Account 3', type: 'credit' },
  { id: 4, balance: 709.23, name: 'Multi Type Account 4', type: 'chequing' },
];
export const multiTypeTransactions1 = [
  {
    id: 1,
    type: 'income',
    amount: 12.29,
    account_from_id: 1,
    account_to_id: 1,
  },
  {
    id: 2,
    type: 'expense',
    amount: 44,
    account_from_id: 1,
    account_to_id: 1,
  },
  {
    id: 3,
    type: 'transfer',
    amount: 100,
    account_from_id: 1,
    account_to_id: 2,
  },
  {
    id: 4,
    type: 'transfer',
    amount: 620.23,
    account_from_id: 2,
    account_to_id: 4,
  },
  {
    id: 5,
    type: 'income',
    amount: 99.99,
    account_from_id: 4,
    account_to_id: 4,
  },
  {
    id: 6,
    type: 'expense',
    amount: 23,
    account_from_id: 3,
    account_to_id: 3,
  },
];
export const expectedMultiTypeAccounts1 = [
  { id: 1, balance: 241.13, name: 'Multi Type Account 1', type: 'chequing' },
  { id: 2, balance: 3977, name: 'Multi Type Account 2', type: 'cash' },
  { id: 3, balance: 323, name: 'Multi Type Account 3', type: 'credit' },
  { id: 4, balance: -10.99, name: 'Multi Type Account 4', type: 'chequing' },
];

export const invalidAccounts1 = 'not an array';
export const invalidTransactions1 = 'not an array';

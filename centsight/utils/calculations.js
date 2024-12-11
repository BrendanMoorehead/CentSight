/**
 * Calculates the updated account balances for two accounts after transferring a specified amount.
 *
 * This function takes the current balances of two accounts and an amount to transfer.
 * It validates the inputs to ensure they are numbers and that the transfer amount is greater than 0.
 * If any validation fails, an error is thrown.
 *
 * @param {number} accountFrom - The current balance of the account from which the amount will be deducted.
 * @param {number} accountTo - The current balance of the account to which the amount will be added.
 * @param {number} amount - The amount to transfer from accountFrom to accountTo.
 * @returns {{updatedAccountFrom: number, updatedAccountTo: number}} - An object containing the updated account balances.
 * @throws {Error} Throws an error if:
 * - the amount, accountFrom, or accountTo are not finite numbers.
 * - The amount is not greater than 0.
 *
 * @example
 * const result = calculateTransfer(100, -30, 50);
 * result => { updatedAccountFrom: 50, updatedAccountTo: 20 }
 */
export const calculateTransfer = (accountFrom, accountTo, amount) => {
  if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount))
    throw new Error('Invalid amount type: Amount must be a number.');
  if (
    typeof accountFrom !== 'number' ||
    isNaN(accountFrom) ||
    !isFinite(accountFrom)
  )
    throw new Error('Invalid accountFrom type: accountFrom must be a number.');
  if (typeof accountTo !== 'number' || isNaN(accountTo) || !isFinite(accountTo))
    throw new Error('Invalid accountTo type: accountTo must be a number.');
  else if (amount <= 0)
    throw new Error('Invalid transfer amount: Amount must be greater than 0.');

  const updatedAccountFrom = accountFrom - amount;
  const updatedAccountTo = accountTo + amount;
  return { updatedAccountFrom, updatedAccountTo };
};

/**
 * Calculates the new account balance after a transaction.
 *
 * This function takes a transaction type, an account balance, and amount to adjust the balance by.
 * It validates the inputs to ensure they are numbers and that the amount is greater than 0.
 * If any validation fails, an error is thrown.
 *
 * @param {string} type - The type of transaction being made on the balance.
 * @param {number} currentBalance - The current balance of the account before adjustment.
 * @param {number} amount - The amount to adjust the balance by.
 * @returns {number} - The new balance after the transaction.
 *  * @throws {Error} Throws an error if:
 * - The type is not 'expense' or 'income'.
 * - the amount or currentBalance are not finite numbers.
 * - The amount is not greater than 0.
 *
 * @example
 * const result = calculateNewBalance('expense', 100, 50);
 * result => 50
 * @example
 * //Throws an error for invalid type
 * const result = calculateNewBalance('transfer', 100, 50);
 */
export const calculateNewBalance = (type, currentBalance, amount) => {
  if (type !== 'expense' && type !== 'income') {
    if (type === 'transfer')
      throw new Error(
        'Invalid type: transfer. calculateTransfer() should be used instead.'
      );
    else {
      throw new Error('Invalid type: type must be either expense or income.');
    }
  }
  if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount))
    throw new Error('Invalid amount type: Amount must be a number.');
  if (
    typeof currentBalance !== 'number' ||
    isNaN(currentBalance) ||
    !isFinite(currentBalance)
  )
    throw new Error(
      'Invalid currentBalance type: currentBalance must be a number.'
    );
  else if (amount <= 0)
    throw new Error('Invalid amount: Amount must be greater than 0.');

  if (type === 'expense') return currentBalance - amount;
  return currentBalance + amount;
};

/**
 * Calculates the balances of accounts should the list of transactions be reversed.
 *
 * This function takes a list of accounts (expected to be all acocunts in the database) and a list of transactions that are to be reversed (most likely deletion). It then calculates the new balances of the accounts should the transactions be reversed and returns the account list with the new balances.
 *
 * @param {Array} accounts - The list of accounts to be updated.
 * @param {Array} transactions - The list of transactions to be reversed.
 * @returns {Array} - The list of accounts with the new balances.
 *  * @throws {Error} Throws an error if:
 *  Accounts or transactions are not arrays.
 */
export const calculateAccountBalancesWithDeletedTransactions = (
  accounts,
  transactions
) => {
  if (!Array.isArray(accounts))
    throw new Error('Invalid input: accounts must be an array.');
  else if (!Array.isArray(transactions))
    throw new Error('Invalid input: transactions must be an array.');

  // Create a new array of accounts to avoid mutation
  const newAccounts = accounts.map((account) => {
    // Start with a copy of the current account
    let updatedAccount = { ...account };

    // Find related transactions for the current account
    const relatedTransactions = transactions.filter(
      (transaction) =>
        transaction.account_from_id === updatedAccount.id ||
        transaction.account_to_id === updatedAccount.id
    );

    // Update the balance based on related transactions
    relatedTransactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        updatedAccount.balance = updatedAccount.balance - transaction.amount;
      } else if (transaction.type === 'expense') {
        updatedAccount.balance = updatedAccount.balance + transaction.amount;
      } else {
        if (transaction.account_from_id === updatedAccount.id) {
          updatedAccount.balance = updatedAccount.balance + transaction.amount;
        } else if (transaction.account_to_id === updatedAccount.id) {
          updatedAccount.balance = updatedAccount.balance - transaction.amount;
        }
      }
    });

    // Round the balance to 2 decimal places
    updatedAccount.balance = Math.round(updatedAccount.balance * 100) / 100;

    return updatedAccount; // Return the updated account
  });

  return newAccounts; // Return the new array of accounts
};

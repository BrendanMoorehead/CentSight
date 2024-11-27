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

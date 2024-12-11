import { describe, it, expect } from 'vitest';
import {
  calculateTransfer,
  calculateNewBalance,
  calculateAccountBalancesWithDeletedTransactions,
} from '../calculations';
import {
  incomeAccounts1,
  incomeTransactions1,
  expectedIncomeAccounts1,
  expenseAccounts1,
  expenseTransactions1,
  expectedExpenseAccounts1,
  transferAccounts1,
  transferTransactions1,
  expectedTransferAccounts1,
  multiTypeAccounts1,
  multiTypeTransactions1,
  expectedMultiTypeAccounts1,
  invalidAccounts1,
  invalidTransactions1,
} from './testData';

describe('Transfer Calculations', () => {
  describe('calculateTransfer()', () => {
    describe('Data Validation', () => {
      it('should return updated balances with two positive balances', () => {
        const accountFrom = 100.1;
        const accountTo = 67;
        const amount = 10;
        const result = calculateTransfer(accountFrom, accountTo, amount);
        expect(result).toEqual({
          updatedAccountFrom: 90.1,
          updatedAccountTo: 77,
        });
      });
      it('should return updated balances with a negative accountFrom balance', () => {
        const accountFrom = -870.1;
        const accountTo = 104.89;
        const amount = 10.97;
        const result = calculateTransfer(accountFrom, accountTo, amount);
        expect(result).toEqual({
          updatedAccountFrom: -881.07,
          updatedAccountTo: 115.86,
        });
      });
      it('should return updated balances with a negative accountTo balance', () => {
        const accountFrom = 999.99;
        const accountTo = -40062.43;
        const amount = 101.55;
        const result = calculateTransfer(accountFrom, accountTo, amount);
        expect(result).toEqual({
          updatedAccountFrom: 898.44,
          updatedAccountTo: -39960.88,
        });
      });
    });
    describe('Error Handling', () => {
      it('should throw an error if amount is negative', () => {
        const accountFrom = 999.99;
        const accountTo = -40062.43;
        const amount = -101.55;
        expect(() => calculateTransfer(accountFrom, accountTo, amount)).toThrow(
          'Invalid transfer amount: Amount must be greater than 0.'
        );
      });
      it('should throw an error if amount is not a number', () => {
        const accountFrom = 999.99;
        const accountTo = -40062.43;
        const amount = '101.55';
        expect(() => calculateTransfer(accountFrom, accountTo, amount)).toThrow(
          'Invalid amount type: Amount must be a number.'
        );
      });
      it('should throw an error if accountFrom is not a number', () => {
        const accountFrom = '999.99';
        const accountTo = -40062.43;
        const amount = 101.55;
        expect(() => calculateTransfer(accountFrom, accountTo, amount)).toThrow(
          'Invalid accountFrom type: accountFrom must be a number.'
        );
      });
      it('should throw an error if accountTo is not a number', () => {
        const accountFrom = 999.99;
        const accountTo = '-40062.43';
        const amount = 101.55;
        expect(() => calculateTransfer(accountFrom, accountTo, amount)).toThrow(
          'Invalid accountTo type: accountTo must be a number.'
        );
      });
    });
  });
  describe('calculateNewBalance()', () => {
    describe('Data Validation', () => {
      it('should return the new balance after a transaction', () => {
        const result = calculateNewBalance('expense', 100, 50);
        expect(result).toEqual(50);
      });
    });
  });
  describe('calculateAccountBalancesWithDeletedTransactions()', () => {
    describe('Data Validation', () => {
      it('should update the balance of an income transaction', () => {
        const result = calculateAccountBalancesWithDeletedTransactions(
          incomeAccounts1,
          incomeTransactions1
        );
        expect(result).toEqual(expectedIncomeAccounts1);
      });
      it('should update the balance of an expense transaction', () => {
        const result = calculateAccountBalancesWithDeletedTransactions(
          expenseAccounts1,
          expenseTransactions1
        );
        expect(result).toEqual(expectedExpenseAccounts1);
      });
      it('should update the balance of 2 accounts with a transfer transaction', () => {
        const result = calculateAccountBalancesWithDeletedTransactions(
          transferAccounts1,
          transferTransactions1
        );
        expect(result).toEqual(expectedTransferAccounts1);
      });
      it('should update the balance of accounts with multiple types of transactions', () => {
        const result = calculateAccountBalancesWithDeletedTransactions(
          multiTypeAccounts1,
          multiTypeTransactions1
        );
        expect(result).toEqual(expectedMultiTypeAccounts1);
      });
    });
    describe('Error Handling', () => {
      it('should throw an error if accounts is not an array', () => {
        expect(() =>
          calculateAccountBalancesWithDeletedTransactions(
            invalidAccounts1,
            multiTypeTransactions1
          )
        ).toThrow('Invalid input: accounts must be an array.');
      });
      it('should throw an error if transactions is not an array', () => {
        expect(() =>
          calculateAccountBalancesWithDeletedTransactions(
            multiTypeAccounts1,
            invalidTransactions1
          )
        ).toThrow('Invalid input: transactions must be an array.');
      });
    });
  });
});

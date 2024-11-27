import { describe, it, expect } from 'vitest';
import { calculateTransfer, calculateNewBalance } from '../calculations';
describe('Transfer Calculations', () => {
  describe('calculateTransfer()', () => {
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
    describe('calculateNewBalance()', () => {
      it('should return the new balance after a transaction', () => {
        const result = calculateNewBalance('expense', 100, 50);
        expect(result).toEqual(50);
      });
    });
  });
});

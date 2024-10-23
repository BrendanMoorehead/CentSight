import { ProcessTransactions } from '../dataManipulaton';
import { describe, it, expect } from 'vitest';
describe('ProcessTransactions', () => {
  const mockAccounts = [
    {
      id: 'acc1',
      name: 'Account 1',
      user_id: '001',
      balance: 100.25,
      type: 'checking',
    },
    {
      id: 'acc2',
      name: 'Account 2',
      user_id: '001',
      balance: 100.25,
      type: 'checking',
    },
    // Account with null id
    {
      id: null,
      name: 'Null ID Account',
      user_id: '001',
      balance: 0.0,
      type: 'checking',
    },
  ];

  const mockCategories = [
    {
      id: 'cat1',
      user_id: '001',
      name: 'Category 1',
      is_base: true,
      subcategories: [
        { id: '1_subcat1', name: 'Subcategory 1' },
        { id: '1_subcat2', name: 'Subcategory 2' },
      ],
    },
    {
      id: 'cat2',
      user_id: '001',
      name: 'Category 2',
      is_base: false,
      subcategories: [
        { id: '2_subcat1', name: 'Subcategory 1' },
        { id: '2_subcat2', name: 'Subcategory 2' },
      ],
    },
  ];

  it('should process an expense transaction correctly', () => {
    const transactions = [
      {
        id: 'trans1',
        type: 'expense',
        account_from_id: 'acc1',
        category_id: 'cat1',
        subcategory_id: '1_subcat1',
        amount: 50,
      },
    ];

    const result = ProcessTransactions(
      transactions,
      mockAccounts,
      mockCategories
    );

    expect(result[0]).toEqual(
      expect.objectContaining({
        id: 'trans1',
        type: 'expense',
        sendingAccountName: 'Account 1',
        sendingAccountId: 'acc1',
        category: 'Category 1',
        category_id: 'cat1',
        subcategory: 'Subcategory 1',
        amount: 50,
      })
    );
  });
  it('Should handle null transaction ids', () => {
    const transactions = [
      {
        id: null,
        type: 'expense',
        account_from_id: 'acc1',
        category_id: 'cat1',
        subcategory_id: '1_subcat1',
        amount: 50,
      },
      {
        id: 'trans1',
        type: 'expense',
        account_from_id: 'acc1',
        category_id: 'cat1',
        subcategory_id: '1_subcat1',
        amount: 50,
      },
    ];

    const result = ProcessTransactions(
      transactions,
      mockAccounts,
      mockCategories
    );

    expect(result[0]).toEqual(
      expect.objectContaining({
        id: 'trans1',
        type: 'expense',
        sendingAccountName: 'Account 1',
        sendingAccountId: 'acc1',
        category: 'Category 1',
        category_id: 'cat1',
        subcategory: 'Subcategory 1',
        amount: 50,
      })
    );
  });
});

import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Pagination,
} from '@nextui-org/react';
import { useCallback } from 'react';
import BalanceUpdateChip from '../BalanceUpdateChip';

const columns = [
  {
    name: 'SUBCATEGORY',
    uid: 'name',
  },
  {
    name: 'TRANSACTIONS',
    uid: 'transactionCt',
  },
  {
    name: 'SPENDING',
    uid: 'spending',
  },
  {
    name: 'INCOME',
    uid: 'income',
  },
  {
    name: 'EDIT',
    uid: 'edit',
  },
];

const SubcategoriesTable = ({ subcategories, transactions }) => {
  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'spending':
        return <BalanceUpdateChip amount={cellValue} case="expense" />;
      case 'income':
        return <BalanceUpdateChip amount={cellValue} case="income" />;
      default:
        return cellValue;
    }
  }, []);

  const updatedSubcategories = subcategories.map((subcategory) => {
    const count = transactions.reduce(
      (acc, transaction) =>
        transaction.subcategory_id === subcategory.id && acc + 1,
      0
    );
    const spending = transactions.reduce((acc, transaction) => {
      if (
        transaction.subcategory_id === subcategory.id &&
        transaction.type === 'expense'
      ) {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    const income = transactions.reduce((acc, transaction) => {
      if (
        transaction.subcategory_id === subcategory.id &&
        transaction.type === 'income'
      ) {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    return {
      ...subcategory,
      transactionCt: count || 0,
      spending: spending || 0,
      income: income || 0,
    };
  });

  return (
    <div>
      <Table aria-label="Subcategory Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={'No subcategories found'}
          items={updatedSubcategories}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubcategoriesTable;

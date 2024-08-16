import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from '@nextui-org/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import BalanceUpdateChip from '../BalanceUpdateChip';
import { deleteSubcategory } from '../../store/category-actions';

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
  const dispatch = useDispatch();

  const handleDelete = (data) => {
    dispatch(deleteSubcategory({ id: data }));
  };

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case cellValue == 0 && 'spending':
        return (
          <div className="relative flex justify-end items-center">
            <BalanceUpdateChip
              textAlign="right"
              amount={cellValue}
              case="zero"
            />
          </div>
        );
      case cellValue == 0 && 'income':
        return (
          <div className="relative flex justify-end items-center">
            <BalanceUpdateChip
              textAlign="right"
              amount={cellValue}
              case="zero"
            />
          </div>
        );
      case 'spending':
        return (
          <div className="relative flex justify-end items-center">
            <BalanceUpdateChip
              textAlign="right"
              amount={cellValue}
              case="expense"
            />
          </div>
        );
      case 'income':
        return (
          <div className="relative flex justify-end items-center">
            <BalanceUpdateChip
              textAlign="right"
              amount={cellValue}
              case="income"
            />
          </div>
        );
      case 'name':
        return <p className="font-bold">{cellValue}</p>;

      case 'transactionCt':
        return (
          <div className="flex justify-center">
            <p>{cellValue}</p>
          </div>
        );
      case 'edit':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown
              className=" border-1 border-default-200"
              placement="bottom-end"
            >
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <BsThreeDotsVertical className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem className="text-white">Edit</DropdownItem>
                <DropdownItem
                  className="text-danger"
                  color="danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
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

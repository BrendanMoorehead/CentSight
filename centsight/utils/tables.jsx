import BalanceUpdateChip from '../src/components/BalanceUpdateChip';
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { deleteTransaction } from '../src/store/transaction-actions';
/**
 * Gets the jsx for each cell in a transaction table.
 *
 * @param {*} transaction A transaction in a table (row).
 * @param {*} columnKey The column key identifying the column.
 * @returns JSX representation of how the cell should look based on the column.
 */
export const getTransactionCellContent = (transaction, columnKey, dispatch) => {
  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  };
  const cellValue = transaction[columnKey];
  switch (columnKey) {
    case 'amount': {
      return (
        <BalanceUpdateChip
          textAlign="right"
          case={transaction.type}
          amount={transaction.amount}
        />
      );
    }
    case 'type':
      return (
        <p>
          {transaction.type[0].toUpperCase() +
            transaction.type.slice(1, transaction.type.length)}
        </p>
      );
    case 'date':
      return <p>{transaction.date}</p>;
    case 'account_to_id':
      return <p>{transaction.receivingAccountName}</p>;
    case 'account_from_id':
      return <p>{transaction.sendingAccountName}</p>;
    case 'actions':
      return (
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <BsThreeDotsVertical className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu className="text-text">
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem className="text-danger" onClick={handleDelete}>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return cellValue;
  }
};

export const convertTransactionToTableRow = (
  transactionList,
  accountList,
  categoryList
) => {
  let transactionRows = [];
  transactionRows = transactionList.map((transaction) => {
    let matchingSendingAccount = '';
    let matchingReceivingAccount = '';
    let matchingCategory = '';
    let matchingSubcategory = '';

    if (transaction.type === 'expense' || transaction.type === 'transfer') {
      matchingSendingAccount = accountList.find(
        (account) => account.id === transaction.account_from_id
      );
    }
    if (transaction.type === 'income' || transaction.type === 'transfer') {
      matchingReceivingAccount = accountList.find(
        (account) => account.id === transaction.account_to_id
      );
    }

    if (transaction.category_id) {
      matchingCategory = categoryList.find(
        (cat) => cat.id === transaction.category_id
      );
      matchingSubcategory = matchingCategory.subcategories.find(
        (cat) => cat.id === transaction.subcategory_id
      );
    } else if (transaction.user_category_id) {
      matchingCategory = categoryList.find(
        (cat) => cat.id === transaction.user_category_id
      );
      matchingSubcategory = matchingCategory.subcategories.find(
        (cat) => cat.id === transaction.user_subcategory_id
      );
    }

    const date = new Date(transaction.date);
    const localeDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      ...transaction,
      sendingAccountName: matchingSendingAccount?.name,
      receivingAccountName: matchingReceivingAccount?.name,
      category: matchingCategory?.name,
      subcategory: matchingSubcategory?.name,
      date: localeDate,
    };
  });
  return transactionRows;
};

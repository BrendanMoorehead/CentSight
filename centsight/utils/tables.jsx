import BalanceUpdateChip from '../src/components/BalanceUpdateChip';
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { batchDeleteTransactions } from '../src/store/transaction-actions';
/**
 * Gets the jsx for each cell in a transaction table.
 *
 * @param {*} transaction A transaction in a table (row).
 * @param {*} columnKey The column key identifying the column.
 * @returns JSX representation of how the cell should look based on the column.
 */
export const getTransactionCellContent = (
  transaction,
  columnKey,
  dispatch,
  setOpenTransactionModal,
  setTransactionData
) => {
  const handleDelete = () => {
    dispatch(batchDeleteTransactions([transaction]));
  };

  const handleEdit = () => {
    console.log(transaction);
    setTransactionData(transaction);
    setOpenTransactionModal(true);
  };

  const cellValue = transaction[columnKey];
  switch (columnKey) {
    case 'amount': {
      return (
        <BalanceUpdateChip
          textAlign="right"
          case={transaction.type}
          amount={Number(transaction.amount).toFixed(2)}
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
      const transactionDate = new Date(transaction.date);
      const date = transactionDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return <p>{date}</p>;
    case 'account_to_id':
      return <p>{transaction.receivingAccount}</p>;
    case 'account_from_id':
      return <p>{transaction.sendingAccount}</p>;
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
              <DropdownItem onClick={handleEdit}>Edit</DropdownItem>
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

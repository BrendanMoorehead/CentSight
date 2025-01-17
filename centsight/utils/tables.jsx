import BalanceUpdateChip from '../src/components/BalanceUpdateChip';
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  CardBody,
} from "@heroui/react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { batchDeleteTransactions } from '../src/store/transaction-actions';
import { Card } from "@heroui/react";

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
  setTransactionData,
  handleAccountsClick,
  accounts
) => {
  const handleDelete = () => {
    dispatch(batchDeleteTransactions([transaction]));
  };

  const handleEdit = () => {
    console.log(transaction);
    setTransactionData(transaction);
    setOpenTransactionModal(true);
  };

  const receivingAccount = accounts?.find(
    (account) => account.id === transaction.account_to_id
  );

  // Find the sending account based on account_from_id
  const sendingAccount = accounts?.find(
    (account) => account.id === transaction.account_from_id
  );

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
        timeZone: 'UTC',
      });
      return <p>{date}</p>;
    case 'account_to_id': {
      if (
        transaction.receivingAccount !== '' &&
        transaction.receivingAccount !== null
      ) {
        return (
          <Card
            isPressable
            className="bg-primary"
            onPress={() => handleAccountsClick(receivingAccount.id)}
          >
            <CardBody>{receivingAccount.name}</CardBody>
          </Card>
        );
      }
      break;
    }
    case 'account_from_id': {
      if (
        transaction.sendingAccount !== '' &&
        transaction.sendingAccount !== null
      ) {
        return (
          <Card
            isPressable
            className="bg-primary"
            onPress={() => handleAccountsClick(sendingAccount.id)}
          >
            <CardBody>{sendingAccount.name}</CardBody>
          </Card>
        );
      }
      break;
    }
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

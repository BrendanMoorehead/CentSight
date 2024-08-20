import { useSelector } from 'react-redux';
import { dashboardTransactionTableColumns } from '../../utils/data';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Input,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from '@nextui-org/react';
import BalanceUpdateChip from '../components/BalanceUpdateChip';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useCallback } from 'react';
const TransactionsTable = () => {
  const { transactions = [], loading: transactionsLoading } = useSelector(
    (state) => state.transaction
  );
  const { accounts = [], loading: accountsLoading } = useSelector(
    (state) => state.account
  );
  const { categories = [], loading: categoriesLoading } = useSelector(
    (state) => state.category
  );

  const allLoading =
    transactionsLoading || accountsLoading || categoriesLoading;

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'amount':
        return (
          <BalanceUpdateChip
            textAlign="right"
            case={user.type}
            amount={user.amount}
          />
        );
      case 'type':
        return (
          <p>
            {user.type[0].toUpperCase() + user.type.slice(1, user.type.length)}
          </p>
        );
      case 'date':
        return <p>{user.date}</p>;
      case 'account_to_id':
        return <p>{user.receivingAccountName}</p>;
      case 'account_from_id':
        return <p>{user.sendingAccountName}</p>;
      default:
        return cellValue;
    }
  }, []);

  const filteredTransactions = Array.isArray(transactions)
    ? [...transactions]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)
    : [];
  let transactionsList = [];

  if (!allLoading) {
    transactionsList = filteredTransactions.map((transaction) => {
      let matchingSendingAccount = '';
      let matchingReceivingAccount = '';
      let matchingCategory = '';
      let matchingSubcategory = '';

      if (transaction.type === 'expense' || transaction.type === 'transfer') {
        matchingSendingAccount = accounts.find(
          (account) => account.id === transaction.account_from_id
        );
      }
      if (transaction.type === 'income' || transaction.type === 'transfer') {
        matchingReceivingAccount = accounts.find(
          (account) => account.id === transaction.account_to_id
        );
      }

      if (transaction.category_id) {
        matchingCategory = categories.find(
          (cat) => cat.id === transaction.category_id
        );
        console.log('Cat Match', matchingCategory);
        matchingSubcategory = matchingCategory.subcategories.find(
          (cat) => cat.id === transaction.subcategory_id
        );
      } else if (transaction.user_category_id) {
        matchingCategory = categories.find(
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
  }
  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
    >
      <TableHeader columns={dashboardTransactionTableColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'amount' ? 'end' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={'No transactions found'}
        items={transactionsList}
        isLoading={allLoading}
        loadingContent={<Spinner label="Loading..." />}
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
  );
};

export default TransactionsTable;

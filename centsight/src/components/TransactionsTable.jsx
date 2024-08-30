import { useDispatch, useSelector } from 'react-redux';
import { dashboardTransactionTableColumns } from '../../utils/data';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { getTransactionCellContent } from '../../utils/tables';
import { useCallback } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { parseISO, format } from 'date-fns';
import { deleteTransaction } from '../store/transaction-actions';
const TransactionsTable = () => {
  const dispatch = useDispatch();
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

  const renderCell = useCallback((transaction, columnKey) => {
    return getTransactionCellContent(transaction, columnKey);
  }, []);

  // Filter and sort transactions
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
        if (matchingCategory) {
          matchingSubcategory = matchingCategory.subcategories.find(
            (cat) => cat.id === transaction.subcategory_id
          );
        }
      } else if (transaction.user_category_id) {
        matchingCategory = categories.find(
          (cat) => cat.id === transaction.user_category_id
        );
        if (matchingCategory) {
          matchingSubcategory = matchingCategory.subcategories.find(
            (cat) => cat.id === transaction.user_subcategory_id
          );
        }
      }

      const transactionDate = parseISO(transaction.date);
      const formattedDate = format(transactionDate, 'MMMM d, yyyy');

      return {
        ...transaction,
        sendingAccountName: matchingSendingAccount?.name || 'N/A',
        receivingAccountName: matchingReceivingAccount?.name || 'N/A',
        category: matchingCategory?.name || 'N/A',
        subcategory: matchingSubcategory?.name || 'N/A',
        date: formattedDate,
      };
    });
  }
  const handleDelete = (transaction) => {
    dispatch(deleteTransaction(transaction.id));
  };

  return (
    <Table
      aria-label="Transaction Table with custom cells, pagination, and sorting"
      isHeaderSticky
    >
      <TableHeader columns={dashboardTransactionTableColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.align}
            maxWidth={column.width}
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
              <TableCell
                className={'whitespace-nowrap overflow-hidden text-ellipsis'}
              >
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          cd</TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;

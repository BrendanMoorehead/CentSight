import { useSelector } from 'react-redux';
import { accountsTransactionTableColumns } from '../../utils/data';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@heroui/react";
import BalanceUpdateChip from '../components/BalanceUpdateChip';
import { useCallback, useState, useMemo } from 'react';
import { accountsGetEmptyTransactionTableString } from '../../utils/stringCreators';
import { getTransactionCellContent } from '../../utils/tables';

//
const AccountTransactionsTable = ({ transactions, filter, pagination }) => {
  const { accounts = [], loading: accountsLoading } = useSelector(
    (state) => state.account
  );
  const { categories = [], loading: categoriesLoading } = useSelector(
    (state) => state.category
  );

  const allLoading = accountsLoading || categoriesLoading;

  const tableString = accountsGetEmptyTransactionTableString(filter);

  const renderCell = useCallback((user, columnKey) => {
    return getTransactionCellContent(user, columnKey);
  }, []);

  let transactionsList = [];
  if (!allLoading) {
    transactionsList = transactions.map((transaction) => {
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

  const [page, setPage] = useState(1);
  const rowsPerPage = 11;

  const pages = Math.ceil(transactionsList.length / rowsPerPage);

  const transactionsRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return transactionsList.slice(start, end);
  }, [page, transactionsList]);

  transactionsRows.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={accountsTransactionTableColumns}>
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
        emptyContent={tableString}
        items={transactionsRows}
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

export default AccountTransactionsTable;

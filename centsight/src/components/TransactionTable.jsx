import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from '@nextui-org/react';
import {
  convertTransactionToTableRow,
  getTransactionCellContent,
} from '../../utils/tables';
import { useCallback } from 'react';

const TransactionTable = ({
  transactionList,
  accountList,
  categoryList,
  headerSet,
  isLoading,
}) => {
  const renderCell = useCallback((transaction, columnKey) => {
    return getTransactionCellContent(transaction, columnKey);
  }, []);

  const transactionRows = convertTransactionToTableRow(
    transactionList,
    accountList,
    categoryList
  );

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
    >
      <TableHeader columns={headerSet}>
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
        items={transactionRows}
        isLoading={false}
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

export default TransactionTable;

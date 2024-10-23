import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from '@nextui-org/react';
import { transactionTableColumns } from '../../../utils/data';
import { useState, useCallback } from 'react';
import { getTransactionCellContent } from '../../../utils/tables';
const FullTransactionTable = (items, isLoading) => {
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'date',
    direction: 'descending',
  });

  const tableItems = Array.isArray(items) ? items : [];

  const renderCell = useCallback((user, columnKey) => {
    return getTransactionCellContent(user, columnKey);
  }, []);

  return (
    <Table sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
      <TableHeader columns={transactionTableColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'amount' ? 'end' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={'No transactions found'}
        items={tableItems}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(transaction) => (
          <TableRow key={transaction.id}>
            {(columnKey) => (
              <TableCell>{renderCell(transaction, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default FullTransactionTable;

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
} from '@nextui-org/react';
import { transactionTableColumns } from '../../../utils/data';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { getTransactionCellContent } from '../../../utils/tables';
const FullTransactionTable = ({ items, isLoading }) => {
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'date',
    direction: 'descending',
  });

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const calculateRowsPerPage = () => {
      const tableHeight = window.innerHeight * 0.6; // Adjust this factor as needed
      const approximateRowHeight = 50; // Adjust based on your actual row height
      return Math.floor(tableHeight / approximateRowHeight);
    };

    const handleResize = () => {
      setRowsPerPage(calculateRowsPerPage());
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderCell = useCallback((user, columnKey) => {
    return getTransactionCellContent(user, columnKey);
  }, []);

  const tableItems = Array.isArray(items) ? items : [];
  const sortedItems = useMemo(() => {
    return [...tableItems].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [tableItems, sortDescriptor]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedItems.slice(start, end);
  }, [sortedItems, page, rowsPerPage]);

  const onPageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return (
    <>
      <Table
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={Math.ceil(tableItems.length / rowsPerPage)}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
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
          items={paginatedItems}
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
    </>
  );
};

export default FullTransactionTable;

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
import { useDispatch } from 'react-redux';
import { getTransactionCellContent } from '../../../utils/tables';
import TransactionModal from '../modals/TransactionModal';
import { useNavigate } from 'react-router-dom';
const FullTransactionTable = ({
  items,
  isLoading,
  tablePage,
  setTablePage,
}) => {
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'date',
    direction: 'descending',
  });

  const [page, setPage] = useState(tablePage);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setPage(tablePage);
  }, [tablePage]);

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
  const handleAccountsClick = (accountId) => {
    navigate('/accounts', {
      state: { accountId },
    });
  };

  const renderCell = useCallback(
    (user, columnKey, dispatch) => {
      return getTransactionCellContent(
        user,
        columnKey,
        dispatch,
        setOpenTransactionModal,
        setTransactionData,
        handleAccountsClick
      );
    },
    [dispatch, handleAccountsClick]
  );

  const handleSubmit = (data) => {
    console.log(data);
  };
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

  const onPageChange = useCallback(
    (newPage) => {
      setPage(newPage);
      setTablePage(newPage);
    },
    [setTablePage]
  );

  return (
    <>
      <Table
        aria-label="Transaction Table"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={Math.ceil(tableItems.length / rowsPerPage)}
              onChange={onPageChange}
              aria-label="Pagination for transaction table"
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
                <TableCell>
                  {renderCell(transaction, columnKey, dispatch)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TransactionModal
        isOpen={openTransactionModal}
        closeModal={() => setOpenTransactionModal(false)}
        title="Edit Transaction"
        buttonText="Update"
        transactionData={transactionData} // Pass the transaction data to the modal
        onSubmit={handleSubmit} // Pass the submit handler
      />
    </>
  );
};

export default FullTransactionTable;

import React from 'react';
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
} from '@nextui-org/react';
import { SearchIcon } from '@chakra-ui/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TransactionModal from '../components/modals/TransactionModal';
import { ChevronDownIcon } from '@chakra-ui/icons';
// import { SearchIcon } from './SearchIcon';
import { useAsyncList } from '@react-stately/data';
import { useSelector } from 'react-redux';
import { useState, useMemo, useCallback } from 'react';
import BalanceUpdateChip from '../components/BalanceUpdateChip';
import TransactionSortDropdown from '../components/TransactionSortDropdown';

const columns = [
  {
    name: 'DATE',
    uid: 'date',
    sortable: 'true',
  },
  {
    name: 'AMOUNT',
    uid: 'amount',
    sortable: 'true',
  },
  {
    name: 'TYPE',
    uid: 'type',
  },
  {
    name: 'SENDING',
    uid: 'account_from_id',
  },
  {
    name: 'RECEIVING',
    uid: 'account_to_id',
  },
  {
    name: 'CATEGORY',
    uid: 'category',
  },
  {
    name: 'SUBCATEGORY',
    uid: 'subcategory',
  },
  {
    name: 'NOTE',
    uid: 'note',
  },
  {
    name: 'ACTIONS',
    uid: 'actions',
  },
];

const TransactionsPage = () => {
  const [filterValue, setFilterValue] = useState('');
  const [page, setPage] = useState(1);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'age',
    direction: 'ascending',
  });

  const transactions = useSelector((state) => state.transaction.transactions);
  const accounts = useSelector((state) => state.account.accounts);
  const categories = useSelector((state) => state.category.categories);
  const auth = useSelector((state) => state.auth);

  const rowsPerPage = 10;
  const hasSearchFilter = Boolean(filterValue);

  const pages = Math.ceil(transactions.length / rowsPerPage);

  console.log('Trans ACCOUNTS:', accounts);

  const transactionsList = transactions.map((transaction) => {
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
      sendingAccountName: matchingSendingAccount.name,
      receivingAccountName: matchingReceivingAccount.name,
      category: matchingCategory.name,
      subcategory: matchingSubcategory.name,
    };
  });

  const sortedItems = React.useMemo(() => {
    return [...transactionsList].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, transactionsList]);

  console.log('list', transactionsList);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return transactions.slice(start, end);
  }, [page, transactions]);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);
  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

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
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <BsThreeDotsVertical className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...transactionsList];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.note.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    // if (
    //   statusFilter !== 'all' &&
    //   Array.from(statusFilter).length !== statusOptions.length
    // ) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(statusFilter).includes(user.status)
    //   );
    // }

    return filteredUsers;
  }, [transactionsList, filterValue]);

  return (
    <div className="p-12">
      <TransactionModal
        isOpen={openTransactionModal}
        userId={auth.user.user.id}
        closeModal={() => setOpenTransactionModal(false)}
      />
      <p className="text-headline text-2xl font-normal pb-6">Transactions</p>
      {/* SEARCH BY NOTE */}
      <div className="flex justify-between">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by note..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <Button
          color="primary"
          variant="solid"
          onClick={() => setOpenTransactionModal(true)}
        >
          Add
        </Button>
      </div>
      {/* Table Filters */}
      <div className="flex gap-2 py-4">
        <TransactionSortDropdown title="Sending Account" data={accounts} />
        <TransactionSortDropdown title="Recieving Account" data={accounts} />
        <TransactionSortDropdown title="Category" data={categories} />
      </div>

      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
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
        <TableBody emptyContent={'No transactions found'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsPage;

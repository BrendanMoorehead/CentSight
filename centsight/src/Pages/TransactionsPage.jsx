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
  Spinner,
  DropdownItem,
  Skeleton,
} from '@nextui-org/react';
import PageHeaderText from '../components/PageHeaderText';
import { SearchIcon } from '@chakra-ui/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TransactionModal from '../components/modals/TransactionModal';
import { useSelector } from 'react-redux';
import { useState, useMemo, useCallback, useEffect } from 'react';

import { getTransactionCellContent } from '../../utils/tables';
import { DateRangePicker } from '@nextui-org/react';
import TransactionFilterDropdown from '../components/TransactionFilterDropdown';
import PageMargins from '../components/PageMargins';
import { getProcessedTransactions } from '../../utils/selectors';
import FullTransactionTable from '../components/transactions/FullTransactionTable';
import { filter } from '@chakra-ui/react';
const TransactionsPage = () => {
  // const { transactions = [], loading: transactionsLoading } = useSelector(
  //   (state) => state.transaction
  // );
  const { accounts = [], loading: accountsLoading } = useSelector(
    (state) => state.account
  );
  const { categories = [], loading: categoriesLoading } = useSelector(
    (state) => state.category
  );
  const transactions = useSelector(getProcessedTransactions);
  const auth = useSelector((state) => state.auth);

  const [isListProcessed, setIsListProcessed] = useState(false);
  const isLoading = accountsLoading || categoriesLoading || !isListProcessed;

  const [filterValue, setFilterValue] = useState('');
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [filteredType, setFilteredType] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSendingAccounts, setFilteredSendingAccounts] = useState([]);
  const [filteredReceivingAccounts, setFilteredReceivingAccounts] = useState(
    []
  );
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    setFilteredType(['income', 'expense', 'transfer']); // Default to include all transaction types

    if (categories.length) {
      setFilteredCategories(categories.map((category) => category.id)); // Default all categories
    }

    if (accounts.length) {
      setFilteredSendingAccounts(accounts.map((account) => account.id)); // Default all sending accounts
      setFilteredReceivingAccounts(accounts.map((account) => account.id)); // Default all receiving accounts
    }
  }, [categories, accounts]);

  useEffect(() => {
    console.log('Updated filteredType:', filteredType);
  }, [filteredType]);

  useEffect(() => {
    console.log('Updated filteredCategory:', filteredCategories);
  }, [filteredCategories]);
  useEffect(() => {
    console.log('Updated filteredSending:', filteredSendingAccounts);
  }, [filteredSendingAccounts]);
  useEffect(() => {
    console.log('Updated filteredReceiving:', filteredReceivingAccounts);
  }, [filteredReceivingAccounts]);

  const hasSearchFilter = Boolean(filterValue);

  const handleTypeFilter = (keys) => setFilteredType(keys);

  const handleCategoryFilter = (keys) => setFilteredCategories(keys);

  const handleSendingAccountSelect = (keys) => setFilteredSendingAccounts(keys);

  const handleDateRangeChange = (value) => {
    setSelectedRange({
      startDate: value.start.toString(),
      endDate: value.end.toString(),
    });
  };
  const transactionList = useMemo(() => {
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

      if (transaction.category_id && Array.isArray(categories)) {
        matchingCategory = categories.find(
          (cat) => cat.id === transaction.category_id
        );
        matchingSubcategory = matchingCategory.subcategories.find(
          (cat) => cat.id === transaction.subcategory_id
        );
      } else if (transaction.user_category_id && Array.isArray(categories)) {
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
        sendingAccountId: matchingSendingAccount.id,
        receivingAccountId: matchingReceivingAccount.id,
        category: matchingCategory.name,
        category_id: matchingCategory.id,
        subcategory: matchingSubcategory.name,
      };
    });
    return transactionsList;
  }, [transactions, accounts, categories]);

  const filterTransactions = useMemo(() => {
    transactionList.filter((transaction) => {
      const typeMatches = Array.isArray(filteredType)
        ? filteredType?.some((type) => type === transaction.type)
        : false;
      const categoryMatches = Array.isArray(filteredCategories)
        ? filteredCategories?.some(
            (category) => category === transaction.category_id
          )
        : false;
      const sendingMatches = Array.isArray(filteredSendingAccounts)
        ? filteredSendingAccounts?.some(
            (account) =>
              account === transaction.sendingAccountId ||
              account === transaction.receivingAccountId
          )
        : false;

      const dateMatches =
        selectedRange.startDate && selectedRange.endDate
          ? new Date(transaction.date) >= new Date(selectedRange.startDate) &&
            new Date(transaction.date) <= new Date(selectedRange.endDate)
          : true;
      const searchMatches = filterValue
        ? transaction.note.toLowerCase().includes(filterValue.toLowerCase())
        : true;

      return (
        typeMatches &&
        categoryMatches &&
        sendingMatches &&
        dateMatches &&
        searchMatches
      );
    });
    setIsListProcessed(true);
    return transactionList;
  }, [
    transactionList,
    filteredType,
    filteredCategories,
    filteredSendingAccounts,
    selectedRange,
    filterValue,
  ]);

  const onClear = useCallback(() => {
    setFilterValue('');
  }, []);
  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue('');
    }
  }, []);

  const searchFilteredItems = useMemo(() => {
    let filteredUsers = [...filterTransactions];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.note.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [filterTransactions, filterValue]);

  return (
    <PageMargins>
      <TransactionModal
        isOpen={openTransactionModal}
        userId={auth.user.user.id}
        closeModal={() => setOpenTransactionModal(false)}
      />
      <PageHeaderText text="Transactions" />
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
        <TransactionFilterDropdown
          title="Account"
          options={accounts}
          selectionChange={handleSendingAccountSelect}
        />
        <TransactionFilterDropdown
          title="Category"
          options={categories}
          selectionChange={handleCategoryFilter}
        />
        <TransactionFilterDropdown
          title="Type"
          options={[
            { name: 'Expense', id: 'expense' },
            { name: 'Income', id: 'income' },
            { name: 'Transfer', id: 'transfer' },
          ]}
          selectionChange={handleTypeFilter}
        />
        <DateRangePicker
          label="Date range"
          className="max-w-xs"
          onChange={handleDateRangeChange}
        />
      </div>

      <FullTransactionTable items={filterTransactions} isLoading={isLoading} />
    </PageMargins>
  );
};

export default TransactionsPage;

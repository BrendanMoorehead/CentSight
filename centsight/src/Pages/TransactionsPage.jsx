import { Input, Button } from '@nextui-org/react';
import PageHeaderText from '../components/PageHeaderText';
import { SearchIcon } from '@chakra-ui/icons';
import TransactionModal from '../components/modals/TransactionModal';
import { useSelector } from 'react-redux';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { DateRangePicker } from '@nextui-org/react';
import TransactionFilterDropdown from '../components/TransactionFilterDropdown';
import PageMargins from '../components/PageMargins';
import FullTransactionTable from '../components/transactions/FullTransactionTable';

const TransactionsPage = () => {
  const { transactions = [], loading: transactionsLoading } = useSelector(
    (state) => state.transaction
  );
  const { accounts = [], loading: accountsLoading } = useSelector(
    (state) => state.account
  );
  const { categories = [], loading: categoriesLoading } = useSelector(
    (state) => state.category
  );
  const auth = useSelector((state) => state.auth);

  const isLoading = transactionsLoading;

  const [filterValue, setFilterValue] = useState('');
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [filteredType, setFilteredType] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSendingAccounts, setFilteredSendingAccounts] = useState([]);
  const [tablePage, setTablePage] = useState(1);
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    setTablePage(1);
  }, [
    filteredType,
    filteredCategories,
    filteredSendingAccounts,
    selectedRange,
    filterValue,
  ]);

  useEffect(() => {
    setFilteredType(['income', 'expense', 'transfer']);

    if (categories.length) {
      setFilteredCategories(categories.map((category) => category.id));
    }

    if (accounts.length) {
      setFilteredSendingAccounts(accounts.map((account) => account.id)); // Default all sending accounts
    }
  }, [categories, accounts]);

  const handleTypeFilter = (keys) => {
    setFilteredType(keys);
  };

  const handleCategoryFilter = (keys) => {
    setFilteredCategories(keys);
  };

  const handleSendingAccountSelect = (keys) => {
    setFilteredSendingAccounts(keys);
  };

  const handleDateRangeChange = (value) => {
    setSelectedRange({
      startDate: value.start.toString(),
      endDate: value.end.toString(),
    });
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const typeMatches =
        filteredType.length === 0 || filteredType.includes(transaction.type);

      const categoryMatches =
        filteredCategories.length === 0 ||
        filteredCategories.includes(transaction.category_id);

      const accountMatches =
        filteredSendingAccounts.length === 0 ||
        filteredSendingAccounts.includes(transaction.account_from_id) ||
        filteredSendingAccounts.includes(transaction.account_to_id);

      const dateMatches =
        !selectedRange.startDate ||
        !selectedRange.endDate ||
        (new Date(transaction.date) >= new Date(selectedRange.startDate) &&
          new Date(transaction.date) <= new Date(selectedRange.endDate));

      const searchMatches =
        !filterValue ||
        transaction.note.toLowerCase().includes(filterValue.toLowerCase());

      return (
        typeMatches &&
        categoryMatches &&
        accountMatches &&
        dateMatches &&
        searchMatches
      );
    });
  }, [
    transactions,
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

  return (
    <PageMargins>
      <TransactionModal
        isOpen={openTransactionModal}
        userId={auth.user.user.id}
        closeModal={() => setOpenTransactionModal(false)}
      />

      {/* SEARCH BY NOTE */}
      <div className="flex justify-between">
        <PageHeaderText text="Transactions" />
        <Button
          color="primary"
          variant="solid"
          onClick={() => setOpenTransactionModal(true)}
        >
          Add
        </Button>
      </div>
      {/* Table Filters */}
      <div className="flex items-end gap-2 pb-4 pt-2">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by note..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <DateRangePicker
          className="max-w-xs"
          labelPlacement="outside"
          onChange={handleDateRangeChange}
        />
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
      </div>
      {/* TODO: Reset page on state change */}
      <FullTransactionTable
        items={filteredTransactions}
        isLoading={false}
        tablePage={tablePage}
        setTablePage={setTablePage}
      />
    </PageMargins>
  );
};

export default TransactionsPage;

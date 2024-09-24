/* eslint-disable react/prop-types */
import { Button } from '@nextui-org/react';
import SubcategoriesTable from './SubcategoriesTable';
import TransactionCountCard from './TransactionCountCard';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import CategoryModal from '../modals/CategoryModal';
import { useState } from 'react';
import CategoryNameModal from '../modals/CategoryNameModal';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCategory } from '../../store/category-actions';

/**
 * CategoryInfoSection Component
 *
 * Section for displaying details of a single selected category.
 * Displays on the category page.
 *
 * Props:
 *  - category (object): Object containing the selected category's information.
 */
const CategoryInfoSection = ({ category }) => {
  // State to track whether the category name editing modal is open or closed.
  const [openCategoryNameModal, setOpenCategoryNameModal] = useState(false);
  // State to track whether the new subcategory modal is open or closed.
  const [openNewSubcategoryModal, setOpenNewSubcategoryModal] = useState(false);

  const dispatch = useDispatch();

  // Select the user from Redux.
  const auth = useSelector((state) => state.auth);
  // Select all transactions from Redux.
  // TODO: Transactions should be selected by a filter or passed as props. Currently, all transactions are selected which will potentially impact performace.
  const transactions = useSelector((state) => state.transaction.transactions);

  // Default text if no category is selected.
  // TODO: Make into a component for styling an reusability purposes.
  if (!category) return <p>Select a category to start.</p>;

  // Filter transactions for transactions that match the selected category.
  // TODO: Make changes based on what is decided on the above TODO.
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.category_id && transaction.category_id === category.id
  );

  // Calculate the net income for transactions under the selected category.
  // TODO: Allow for filtering by time frame.
  let netIncome = 0;
  netIncome = filteredTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') return acc + transaction.amount;
    else if (transaction.type === 'expense') return acc - transaction.amount;
  }, 0);

  const handleDelete = () => dispatch(deleteCategory(category));

  // TODO: Add a time frame filter that applies to all subcomponents (week, month, year, alltime).
  // TODO: Organize component structure.
  return (
    <div className="flex-col py-4 pt-16">
      <CategoryNameModal
        isOpen={openCategoryNameModal}
        closeModal={() => setOpenCategoryNameModal(false)}
        data={category}
      />
      <CategoryModal
        isOpen={openNewSubcategoryModal}
        userId={auth.user.user.id}
        closeModal={() => setOpenNewSubcategoryModal(false)}
        categoryId={category.id}
        title="Add subcategory"
      />
      <div className="flex justify-between py-4">
        <p className="text-headline text-4xl font-semibold">{category.name}</p>
        <div className="flex justify-between">
          <Dropdown placement="top-end">
            <DropdownTrigger>
              <Button variant="bordered">Edit Category</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {category.is_base === false && (
                <DropdownItem
                  className="text-white"
                  key="edit_name"
                  onClick={() => setOpenCategoryNameModal(true)}
                >
                  Edit name
                </DropdownItem>
              )}
              <DropdownItem
                className="text-white"
                key="add_subcategory"
                onClick={() => {
                  setOpenNewSubcategoryModal(true);
                  console.log('Clicked');
                }}
              >
                Add subcategory
              </DropdownItem>
              {category.is_base === false && (
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => handleDelete()}
                >
                  Delete category
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-12">
        <div className="flex flex-col flex-1 gap-4">
          <TransactionCountCard
            title="Transactions"
            number={filteredTransactions.length || 0}
          />
          <TransactionCountCard
            title="Net Income"
            number={netIncome.toFixed(2)}
          />
        </div>
        <div className="flex-1 col-span-2">
          <SubcategoriesTable
            subcategories={category.subcategories}
            transactions={filteredTransactions}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryInfoSection;

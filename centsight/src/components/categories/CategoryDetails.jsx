import { Button } from '@nextui-org/react';
import SubcategoriesTable from './SubcategoriesTable';
import TransactionCountCard from './TransactionCountCard';
import CategoryTabs from './CategoryTabs';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';
import CategoryModal from '../modals/CategoryModal';
import { useState } from 'react';
import CategoryNameModal from '../modals/CategoryNameModal';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCategory } from '../../store/category-actions';
const CategoryDetails = ({ category }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openSubcatModal, setOpenSubcatModal] = useState(false);
  const transactions = useSelector((state) => state.transaction.transactions);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  console.log(transactions);
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.category_id && transaction.category_id === category.id
  );
  let sum = 0;
  sum = filteredTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') return acc + transaction.amount;
    else if (transaction.type === 'expense') return acc - transaction.amount;
  }, 0);

  if (!category) return <p>Select a category to start.</p>;

  const handleDelete = () => {
    dispatch(deleteCategory(category));
  };

  return (
    <div className="flex-col py-4 pt-16">
      <CategoryNameModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        data={category}
      />
      <CategoryModal
        isOpen={openSubcatModal}
        userId={auth.user.user.id}
        closeModal={() => setOpenSubcatModal(false)}
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
                  onClick={() => setOpenModal(true)}
                >
                  Edit name
                </DropdownItem>
              )}
              <DropdownItem
                className="text-white"
                key="add_subcategory"
                onClick={() => {
                  setOpenSubcatModal(true);
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
          {/* <CategoryTabs /> */}
          <TransactionCountCard
            title="Transactions"
            number={filteredTransactions.length || 0}
          />
          <TransactionCountCard title="Net Income" number={sum.toFixed(2)} />
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

export default CategoryDetails;

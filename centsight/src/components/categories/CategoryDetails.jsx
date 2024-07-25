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
const CategoryDetails = ({ name }) => {
  return (
    <div className="flex-col py-4 pt-16">
      <p className="text-headline text-4xl font-semibold">Housing</p>
      <div className="flex justify-between">
        <p>{name}</p>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button variant="bordered">Edit Category</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">Edit name</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete category
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="grid grid-cols-3 gap-12">
        <div className="flex flex-col flex-1 gap-4">
          <CategoryTabs />
          <TransactionCountCard title="Transactions" number={18} />
          <TransactionCountCard title="Spending" number={'$600.00'} />
        </div>
        <div className="flex-1 col-span-2">
          <SubcategoriesTable />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;

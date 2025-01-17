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
} from "@heroui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
const TransactionSortDropdown = ({ title, data }) => {
  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button
          endContent={<ChevronDownIcon className="text-small" />}
          variant="flat"
        >
          {title}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        closeOnSelect={false}
        selectionMode="multiple"
      >
        {data.map((account) => (
          <DropdownItem key={account.id}>{account.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TransactionSortDropdown;

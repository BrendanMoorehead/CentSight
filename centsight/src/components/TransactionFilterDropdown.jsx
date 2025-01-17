import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const TransactionFilterDropdown = ({ title, options, selectionChange }) => {
  const verifiedOptions = Array.isArray(options) ? options : [];
  const [selectedKeys, setSelectedKeys] = useState(
    new Set(verifiedOptions.map((opt) => opt.id))
  );

  const handleSelectionChange = (keys) => {
    const keysArray = Array.from(keys); // Convert to an array
    setSelectedKeys(new Set(keysArray));
    selectionChange(keysArray);
  };

  const handleSelectAll = () => {
    const allKeys = new Set(verifiedOptions.map((option) => option.id));
    setSelectedKeys(allKeys);
    selectionChange(Array.from(allKeys));
  };

  const handleDeselectAll = () => {
    setSelectedKeys(new Set());
    selectionChange([]);
  };

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
        aria-label="Filter"
        closeOnSelect={false}
        selectionMode="multiple"
        onSelectionChange={handleSelectionChange}
        selectedKeys={selectedKeys}
      >
        <DropdownSection aria-label="Help & Feedback" showDivider>
          {verifiedOptions.map((option) => (
            <DropdownItem key={option.id} className="text-text">
              {option.name}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem
            key={'selectAll'}
            onClick={handleSelectAll}
            className="text-text"
          >
            Select All
          </DropdownItem>
          <DropdownItem
            key={'deselectAll'}
            onClick={handleDeselectAll}
            className="text-text"
          >
            Deselect All
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default TransactionFilterDropdown;

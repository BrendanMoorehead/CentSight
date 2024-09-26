import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useCallback } from 'react';
import BalanceUpdateChip from '../src/components/BalanceUpdateChip';

export const useRenderSubcategoryCell = (handleDeleteSubcategory) =>
  useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case cellValue == 0 && 'spending':
          return (
            <div className="relative flex justify-end items-center">
              <BalanceUpdateChip
                textAlign="right"
                amount={cellValue}
                case="zero"
              />
            </div>
          );
        case cellValue == 0 && 'income':
          return (
            <div className="relative flex justify-end items-center">
              <BalanceUpdateChip
                textAlign="right"
                amount={cellValue}
                case="zero"
              />
            </div>
          );
        case 'spending':
          return (
            <div className="relative flex justify-end items-center">
              <BalanceUpdateChip
                textAlign="right"
                amount={cellValue}
                case="expense"
              />
            </div>
          );
        case 'income':
          return (
            <div className="relative flex justify-end items-center">
              <BalanceUpdateChip
                textAlign="right"
                amount={cellValue}
                case="income"
              />
            </div>
          );
        case 'name':
          return <p className="font-bold">{cellValue}</p>;

        case 'transactionCt':
          return (
            <div className="flex justify-center">
              <p>{cellValue}</p>
            </div>
          );
        case 'edit':
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown
                className=" border-1 border-default-200"
                placement="bottom-end"
              >
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <BsThreeDotsVertical className="text-default-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem className="text-white">Edit</DropdownItem>
                  <DropdownItem
                    className="text-danger"
                    color="danger"
                    onClick={() => handleDeleteSubcategory(user.id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleDeleteSubcategory]
  );

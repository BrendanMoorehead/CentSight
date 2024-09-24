/* eslint-disable react/prop-types */
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { deleteSubcategory } from '../../store/category-actions';
import { getSubcategoryFinancialDetails } from '../../../utils/subcategoryUtils';
import { useRenderSubcategoryCell } from '../../../utils/tableCellUtils';
import { subcategoryTableHeaders } from '../../../utils/data';

/**
 * SubcategoriesTable Component
 *
 * Table displaying subcategories for a given category and their associated details.
 *
 * Props:
 *  - subcategories (object): List of subcategory objects for the selected category.
 *  - transactions (object): List of transactions for the selected category.
 */
const SubcategoriesTable = ({ subcategories, transactions }) => {
  const dispatch = useDispatch();

  //Dispatch the action to delete a subcategory.
  const handleDeleteSubcategory = (subcategoryId) =>
    dispatch(deleteSubcategory({ id: subcategoryId }));

  //Accumulate and assign the transaction count, income, and spending to each subcategory.
  const subcategoryDetails = getSubcategoryFinancialDetails(
    subcategories,
    transactions
  );

  //Assing the cell rendering function.
  const renderTableCell = useRenderSubcategoryCell(handleDeleteSubcategory);

  return (
    <div>
      <Table aria-label="Subcategory Table">
        <TableHeader columns={subcategoryTableHeaders}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={'No subcategories found'}
          items={subcategoryDetails}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderTableCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubcategoriesTable;

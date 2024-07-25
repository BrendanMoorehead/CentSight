import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Pagination,
} from '@nextui-org/react';
const SubcategoriesTable = () => {
  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>TRANSACTIONS</TableColumn>
          <TableColumn>SPENDING</TableColumn>
          <TableColumn>INCOME</TableColumn>
          <TableColumn>EDIT</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Rent</TableCell>
            <TableCell>1</TableCell>
            <TableCell>$600.00</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>
              <Button />
            </TableCell>
          </TableRow>{' '}
          <TableRow key="2">
            <TableCell>Rent</TableCell>
            <TableCell>1</TableCell>
            <TableCell>$600.00</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>
              <Button />
            </TableCell>
          </TableRow>{' '}
          <TableRow key="3">
            <TableCell>Rent</TableCell>
            <TableCell>1</TableCell>
            <TableCell>$600.00</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>
              <Button />
            </TableCell>
          </TableRow>{' '}
          <TableRow key="4">
            <TableCell>Rent</TableCell>
            <TableCell>1</TableCell>
            <TableCell>$600.00</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>
              <Button />
            </TableCell>
          </TableRow>{' '}
          <TableRow key="5">
            <TableCell>Rent</TableCell>
            <TableCell>1</TableCell>
            <TableCell>$600.00</TableCell>
            <TableCell>$0.00</TableCell>
            <TableCell>
              <Button />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SubcategoriesTable;

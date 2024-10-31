/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { Tabs, Tab } from '@nextui-org/tabs';
import { DatePicker, select } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { Button, Input } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';
import { getLocalTimeZone, today } from '@internationalized/date';
import { useState } from 'react';
const validate = (values) => {
  const errors = {};
  if (values.amount === null) {
    errors.amount = 'Required';
  }
  if (values.category === '') {
    errors.category = 'Required';
  }
  if (values.subcategory === '') {
    errors.subcategory = 'Required';
  }
  if (
    values.sendingAccount === '' &&
    (values.type === 'expense' || values.type === 'transfer')
  ) {
    errors.sendingAccount = 'Required';
  }

  if (
    values.recievingAccount === '' &&
    (values.type === 'income' || values.type === 'transfer')
  ) {
    errors.recievingAccount = 'Required';
  }
  if (values.date === '') {
    errors.date = 'Required';
  }
  return errors;
};

const TransactionForm = ({ handleSubmit }) => {
  const accounts = useSelector((state) => state.account.accounts);
  const categories = useSelector((state) => state.category.categories);
  let defaultDate = today(getLocalTimeZone());
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log('Transaction Categories: ', categories);

  const formik = useFormik({
    initialValues: {
      type: 'expense',
      category: '',
      category_id: '',
      subcategory: '',
      subcategory_id: '',
      note: '',
      sendingAccount: '',
      sendingAccount_id: '',
      receivingAccount: '',
      receivingAccount_id: '',
      amount: null,
      date: defaultDate,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      const date = new Date(
        values.date.year,
        values.date.month - 1,
        values.date.day
      );
      const formattedDate = `${date.getFullYear()}, ${
        date.getMonth() + 1
      }, ${date.getDate()}`;
      values.date = formattedDate;
      handleSubmit(values);
    },
  });
  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <Input
        size="lg"
        type="number"
        placeholder="0.00"
        labelPlacement="outside"
        isInvalid={formik.errors.amount && formik.touched.amount}
        errorMessage="Required"
        className="text-text"
        value={formik.values.amount}
        onChange={(e) => {
          formik.setFieldValue('amount', e.target.value);
        }}
        name="amount"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
      />
      <Tabs
        fullWidth
        aria-label="Options"
        className="flex"
        selectedKey={formik.values.type}
        onSelectionChange={(value) => formik.setFieldValue('type', value)}
      >
        <Tab key="expense" title="Expense"></Tab>
        <Tab key="income" title="Income"></Tab>
        <Tab key="transfer" title="Transfer"></Tab>
      </Tabs>
      <DatePicker
        label="Transaction date"
        onChange={(value) => formik.setFieldValue('date', value)}
        value={formik.values.date}
      />
      <div className="flex gap-4">
        <Select
          label="Category"
          onSelectionChange={(key) => {
            const category = categories.find((cat) => cat.id === key.anchorKey);
            formik.setFieldValue('category', category.name);
            formik.setFieldValue('category_id', category.id);
            formik.setFieldValue('subcategory', '');
            formik.setFieldValue('subcategory_id', '');
            setSelectedCategory(category);
          }}
          value={formik.values.category_id}
        >
          {categories.map((cat) => (
            <SelectItem className="text-text" key={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Subcategory"
          onSelectionChange={(key) => {
            const subcategory = selectedCategory.subcategories.find(
              (subcat) => (subcat.id === key.anchorKey)
            );
            formik.setFieldValue('subcategory', subcategory.name);
            formik.setFieldValue('subcategory_id', subcategory.id);
          }}
          value={formik.values.subcategory_id}
          disabled={!selectedCategory}
        >
          {selectedCategory &&
            selectedCategory.subcategories.map((subcat) => (
              <SelectItem
                className="text-text"
                key={subcat.id}
                value={subcat.id}
              >
                {subcat.name}
              </SelectItem>
            ))}
        </Select>
      </div>

      {(formik.values.type === 'expense' ||
        formik.values.type === 'transfer') && (
        <Select
          label="Sending account"
          onSelectionChange={(value) =>{
            const sendingAccount = accounts.find((acct) => value.anchorKey === acct.id);
            formik.setFieldValue('sendingAccount', sendingAccount.name);
            formik.setFieldValue('sendingAccount_id', sendingAccount.id);
          }}
        >
          {accounts.map((cat) => (
            <SelectItem className="text-text" key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </Select>
      )}
      {(formik.values.type === 'income' ||
        formik.values.type === 'transfer') && (
        <Select
          label="Receiving account"
          onSelectionChange={(value) =>{
            const receivingAccount = accounts.find((acct) => value.anchorKey === acct.id);
            formik.setFieldValue('receivingAccount', receivingAccount.name);
            formik.setFieldValue('receivingAccount_id', receivingAccount.id);
          }}
        >
          {accounts.map((cat) => (
            <SelectItem className="text-text" key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </Select>
      )}
      <Input
        type="text"
        label="Note"
        value={formik.values.note}
        onChange={(e) => formik.setFieldValue('note', e.target.value)}
        name="note"
      />
      <Button color="primary" className="my-2" type="submit">
        Add
      </Button>
    </form>
  );
};

export default TransactionForm;

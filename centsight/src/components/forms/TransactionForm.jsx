/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { Tabs, Tab } from "@heroui/tabs";
import { DatePicker, select } from "@heroui/react";
import { useSelector } from 'react-redux';
import { Button, Input } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import {
  getLocalTimeZone,
  today,
  parseDate,
  CalendarDate,
} from '@internationalized/date';
import { useState, useEffect } from 'react';
import { validateTransactionInput } from '../../../utils/formValidation';

const TransactionForm = ({
  handleSubmit,
  transactionData = null,
  buttonText,
}) => {
  const accounts = useSelector((state) => state.account.accounts);
  const categories = useSelector((state) => state.category.categories);
  let defaultDate = today(getLocalTimeZone());
  const [selectedCategory, setSelectedCategory] = useState(null);

  let initialValues = {
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
    amount: '',
    date: defaultDate,
  };

  function convertDateStringToCalendarDateTime(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new CalendarDate(year, month, day);
  }

  if (transactionData) {
    const formattedDate = convertDateStringToCalendarDateTime(
      transactionData.date
    );
    initialValues = {
      type: transactionData.type,
      category: transactionData.category,
      category_id: transactionData.category_id,
      subcategory: transactionData.subcategory,
      subcategory_id: transactionData.subcategory_id,
      note: transactionData.note,
      sendingAccount: transactionData.sendingAccount,
      sendingAccount_id: transactionData.account_from_id,
      receivingAccount: transactionData.receivingAccount,
      receivingAccount_id: transactionData.account_to_id,
      amount: transactionData.amount,
      date: formattedDate,
    };
  }

  useEffect(() => {
    if (transactionData) {
      const category = categories.find(
        (cat) => cat.id === transactionData.category_id
      );
      setSelectedCategory(category);
    }
  }, [transactionData, categories]);

  const handleTypeChange = (value) => {
    formik.setFieldValue('type', value);
    formik.setFieldValue('sendingAccount', '');
    formik.setFieldValue('sendingAccount_id', '');
    formik.setFieldValue('receivingAccount', '');
    formik.setFieldValue('receivingAccount_id', '');
  };
  const formik = useFormik({
    initialValues: initialValues,
    validate: validateTransactionInput,
    onSubmit: (values) => {
      console.log('Submitted values:', values);
      console.log('Formik errors:', formik.errors);
      console.log(values);
      const date = new Date(
        values.date.year,
        values.date.month - 1,
        values.date.day
      );
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      values.date = formattedDate;
      handleSubmit(values);
    },
    validateOnChange: true, // Ensure validation on change
    validateOnBlur: true,
  });
  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <Input
        size="lg"
        type="number"
        placeholder="0.00"
        labelPlacement="outside"
        isInvalid={formik.errors.amount && formik.touched.amount}
        errorMessage={
          formik.errors.amount && formik.touched.amount
            ? formik.errors.amount
            : ''
        }
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
        onSelectionChange={handleTypeChange}
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
          isInvalid={formik.errors.category && formik.touched.category}
          errorMessage={
            formik.errors.category && formik.touched.category
              ? formik.errors.category
              : ''
          }
          defaultSelectedKeys={[formik.values.category_id]}
          onSelectionChange={(key) => {
            const category = categories.find((cat) => cat.id === key.anchorKey);
            formik.setFieldValue('category', category.name);
            formik.setFieldValue('category_id', category.id);
            formik.setFieldValue('subcategory', '');
            formik.setFieldValue('subcategory_id', '');
            setSelectedCategory(category);
          }}
          value={formik.values.category_id}
          onBlur={() => formik.setFieldTouched('category_id', true, true)} // Ensure field is marked as touched
        >
          {categories.map((cat) => (
            <SelectItem className="text-text" key={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          isInvalid={formik.errors.subcategory && formik.touched.subcategory}
          errorMessage={
            formik.errors.subcategory && formik.touched.subcategory
              ? formik.errors.subcategory
              : ''
          }
          label="Subcategory"
          defaultSelectedKeys={[formik.values.subcategory_id]}
          onSelectionChange={(key) => {
            const subcategory = selectedCategory.subcategories.find(
              (subcat) => subcat.id === key.anchorKey
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
          isInvalid={
            formik.errors.sendingAccount && formik.touched.sendingAccount
          }
          errorMessage={
            formik.errors.sendingAccount && formik.touched.sendingAccount
              ? formik.errors.sendingAccount
              : ''
          }
          defaultSelectedKeys={[formik.values.sendingAccount_id]}
          label="Sending account"
          onSelectionChange={(value) => {
            const sendingAccount = accounts.find(
              (acct) => value.anchorKey === acct.id
            );
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
          isInvalid={
            formik.errors.receivingAccount && formik.touched.receivingAccount
          }
          errorMessage={
            formik.errors.receivingAccount && formik.touched.receivingAccount
              ? formik.errors.receivingAccount
              : ''
          }
          defaultSelectedKeys={[formik.values.receivingAccount_id]}
          label="Receiving account"
          onSelectionChange={(value) => {
            const receivingAccount = accounts.find(
              (acct) => value.anchorKey === acct.id
            );
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
        {buttonText}
      </Button>
    </form>
  );
};

export default TransactionForm;

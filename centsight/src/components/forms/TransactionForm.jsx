import { useFormik } from 'formik';
import { Tabs, Tab } from '@nextui-org/tabs';
import { DatePicker } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { Button, Input } from '@nextui-org/react';
import { Select, SelectSection, SelectItem } from '@nextui-org/react';
import {
  startOfWeek,
  startOfMonth,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
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
  const formik = useFormik({
    initialValues: {
      type: 'expense',
      category: '',
      subcategory: '',
      note: '',
      sendingAccount: '',
      recievingAccount: '',
      amount: null,
      date: defaultDate,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
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
        onSelectionChange={(value) => formik.setFieldValue('date', value)}
        value={formik.values.date}
      />
      <div className="flex gap-4">
        <Select label="Category">
          {categories.map((cat) => (
            <SelectItem className="text-text" key={cat.key}>
              {cat.name}
            </SelectItem>
          ))}
        </Select>
        <Select label="Subcategory">
          {categories.map((cat) => (
            <SelectItem className="text-text" key={cat.key}>
              {cat.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      {(formik.values.type === 'expense' ||
        formik.values.type === 'transfer') && (
        <Select label="Sending account">
          {accounts.map((cat) => (
            <SelectItem className="text-text" key={cat.key}>
              {cat.name}
            </SelectItem>
          ))}
        </Select>
      )}
      {(formik.values.type === 'income' ||
        formik.values.type === 'transfer') && (
        <Select label="Recieving account">
          {accounts.map((cat) => (
            <SelectItem className="text-text" key={cat.key}>
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

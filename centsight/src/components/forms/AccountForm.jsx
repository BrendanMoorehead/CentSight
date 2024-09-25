/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { Button, Input } from '@nextui-org/react';
import AccountTypeTags from './AccountTypeTags';

const validate = (values) => {
  const errors = {};
  if (values.name === '') {
    errors.name = 'Required';
  }
  if (values.balance === '') {
    errors.balance = 'Required';
  }
  return errors;
};

const AccountForm = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      type: 'chequing',
      name: '',
      balance: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });
  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <AccountTypeTags
        onChange={(value) => formik.setFieldValue('type', value)}
        name="type"
      />
      <Input
        type="text"
        placeholder="Account name"
        label="Name"
        labelPlacement="outside"
        errorMessage="Required"
        isInvalid={formik.errors.name && formik.touched.name}
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue('name', e.target.value)}
        name="name"
      />
      <Input
        type="number"
        label="Balance"
        placeholder="0.00"
        labelPlacement="outside"
        isInvalid={formik.errors.balance && formik.touched.balance}
        errorMessage="Required"
        value={formik.values.balance}
        onChange={(e) => {
          formik.setFieldValue('balance', e.target.value);
        }}
        name="balance"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
      />
      <Button color="primary" className="my-2" type="submit">
        Add
      </Button>
    </form>
  );
};

export default AccountForm;

/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { Button, Input } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/react';
import { useMemo } from 'react';

const validate = (values) => {
  const errors = {};
  if (values.name === null) {
    errors.name = 'Required';
  }
  if (values.balance === null) {
    errors.balance = 'Required';
  }
  return errors;
};

const AccountForm = ({ handleSubmit, accountData = null, buttonText = "Add"}) => {
  const initialValues = useMemo(() => ({
    type: accountData?.type || 'chequing',
    name: accountData?.name || '',
    balance: accountData?.balance || '',
    id: accountData?.id || null,
  }), [accountData]);
console.log(initialValues);
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <Tabs
        selectedKey={formik.values.type}
        onSelectionChange={(key) => {
          formik.setValues({ ...formik.values, type: key });
        }}
        fullWidth
        aria-label="Options"
        className="flex"
      >
        <Tab key="chequing" title="Chequing" />
        <Tab key="credit" title="Credit" />
        <Tab key="cash" title="Cash" />
      </Tabs>
      <Input
        type="text"
        placeholder="Account name"
        label="Name"
        labelPlacement="outside"
        errorMessage={formik.touched.name && formik.errors.name}
        isInvalid={formik.touched.name && formik.errors.name}
        {...formik.getFieldProps('name')}
      />
      <Input
        type="number"
        label="Balance"
        placeholder="0.00"
        labelPlacement="outside"
        name="balance"
        errorMessage={formik.touched.balance && formik.errors.balance}
        isInvalid={formik.touched.balance && formik.errors.balance}
        {...formik.getFieldProps('balance')}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
      />
      <Button 
        color="primary" 
        className="my-2" 
        type="submit"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default AccountForm;

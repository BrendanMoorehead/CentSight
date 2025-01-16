/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { Button, Input } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/react';

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

const AccountForm = ({
  handleSubmit,
  accountData = null,
  buttonText = 'Add',
}) => {
  let initialValues = {
    type: 'chequing',
    name: '',
    balance: '0.00',
    id: null,
  };
  if (accountData) {
    initialValues = {
      type: accountData?.type,
      name: accountData?.name,
      balance: accountData?.balance,
      id: accountData?.id,
    };
  }
  console.log(initialValues);
  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
    validateOnChange: true,
    enableReinitialize: true,
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <Tabs
        selectedKey={formik.values.type}
        onSelectionChange={(value) => {
          formik.setFieldValue('type', value);
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
        errorMessage={
          formik.touched.name && formik.errors.name ? formik.errors.name : ''
        }
        isInvalid={formik.touched.name && formik.errors.name}
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue('name', e.target.value)}
      />
      <Input
        type="number"
        label="Balance"
        placeholder="0.00"
        labelPlacement="outside"
        name="balance"
        errorMessage={
          formik.touched.balance && formik.errors.balance
            ? formik.errors.balance
            : ''
        }
        isInvalid={formik.touched.balance && formik.errors.balance}
        value={formik.values.balance}
        onChange={(e) => formik.setFieldValue('balance', e.target.value)}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
      />
      <Button color="primary" className="my-2" type="submit">
        {buttonText}
      </Button>
    </form>
  );
};

// const AccountForm = ({
//   handleSubmit,
//   accountData = null,
//   buttonText = 'Add',
// }) => {
//   let initialValues = {
//     type: 'chequing',
//     name: '',
//     balance: '0.00',
//     id: null,
//   };
//   if (accountData) {
//     initialValues = {
//       type: accountData?.type,
//       name: accountData?.name,
//       balance: accountData?.balance,
//       id: accountData?.id,
//     };
//   }
//   const handleTypeChange = (value) => {
//     formik.setFieldValue('type', value);
//   };
//   const formik = useFormik({
//     initialValues: initialValues,
//     validate,
//     onSubmit: (values) => {
//       console.log(values);
//       handleSubmit(values);
//     },
//     validateOnChange: true,
//     validateOnBlur: true,
//   });
//   return (
//     <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
//       <Tabs
//         fullWidth
//         aria-label="Options"
//         className="flex"
//         selectedKey={formik.values.type}
//         onSelectionChange={handleTypeChange}
//       >
//         <Tab key="expense" title="Expense"></Tab>
//         <Tab key="income" title="Income"></Tab>
//         <Tab key="transfer" title="Transfer"></Tab>
//       </Tabs>
//     </form>
//   );
// };

export default AccountForm;

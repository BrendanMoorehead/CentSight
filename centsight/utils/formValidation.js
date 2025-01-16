export const validateTransactionInput = (values) => {
  const errors = {};

  // Check for required fields
  if (!values.amount) {
    errors.amount = 'Required';
  }
  if (!values.category) {
    errors.category = 'Required';
  }
  if (!values.subcategory) {
    errors.subcategory = 'Required';
  }
  if (!values.date) {
    errors.date = 'Required';
  }

  // Conditional checks based on transaction type
  if (
    (values.type === 'expense' || values.type === 'transfer') &&
    !values.sendingAccount
  ) {
    errors.sendingAccount = 'Required';
  }

  if (
    (values.type === 'income' || values.type === 'transfer') &&
    !values.receivingAccount
  ) {
    errors.receivingAccount = 'Required';
  }

  return errors;
};

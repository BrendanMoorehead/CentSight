export const validateTransactionInput = (values) => {
  const errors = {};
  for (const key in values) {
    if (values.hasOwnProperty(key) && !values[key]) {
      errors[key] = 'Required';
    }
  }
  if (values.amount === '') {
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

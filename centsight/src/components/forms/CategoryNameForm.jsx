/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { Button, Input } from '@nextui-org/react';
const validate = (values) => {
  const errors = {};
  if (values.name === '') {
    errors.name = 'Required';
  }
  return errors;
};

const CategoryNameForm = ({ data, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ...data,
      name: data.name,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        label="Name"
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue('name', e.target.value)}
        name="name"
      />
      <Button color="primary" className="my-2" type="submit">
        Update
      </Button>
    </form>
  );
};

export default CategoryNameForm;

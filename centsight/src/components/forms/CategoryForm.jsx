/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectItem,
  Button,
  Input,
  Tabs,
  Tab,
} from "@heroui/react";
import { useEffect } from 'react';
const validate = (values) => {
  const errors = {};
  if (values.name === '') {
    errors.name = 'Required';
  }
  if (values.category_id === null && values.category_type === 'Subcategory') {
    errors.category_id = 'Required';
  }
  return errors;
};

const CategoryForm = ({ handleSubmit, categoryId = null }) => {
  const categories = useSelector((state) => state.category.categories);
  const formik = useFormik({
    initialValues: {
      name: '',
      category_type: categoryId ? 'subcategory' : 'category',
      category_id: categoryId,
      user_category_id: categoryId,
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    categoryId && formik.setFieldValue('category_id', categoryId);
  }, [categoryId, formik]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      {!categoryId && (
        <Tabs
          fullWidth
          aria-label="Options"
          className="flex"
          selectedKey={formik.values.category_type}
          onSelectionChange={(value) =>
            formik.setFieldValue('category_type', value)
          }
        >
          <Tab key="category" title="Category"></Tab>
          <Tab key="subcategory" title="Subcategory"></Tab>
        </Tabs>
      )}
      {formik.values.category_type === 'subcategory' && !categoryId && (
        <Select
          label="Category"
          isDisabled={categoryId !== null}
          onSelectionChange={(value) => {
            formik.setFieldValue('category_id', value.anchorKey);
            formik.setFieldValue('user_category_id', value.anchorKey);
            formik.setFieldValue('subcategory', '');
          }}
          value={formik.values.category_id || ''}
        >
          {categories.map((cat) => (
            <SelectItem className="text-text" key={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </Select>
      )}
      <Input
        type="text"
        label="Name"
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue('name', e.target.value)}
        name="name"
      />
      <Button color="primary" className="my-2" type="submit">
        Add
      </Button>
    </form>
  );
};

export default CategoryForm;

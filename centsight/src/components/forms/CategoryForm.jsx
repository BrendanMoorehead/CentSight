import { useFormik } from 'formik';
import { Segmented, Select } from 'antd';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

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

const CategoryForm = ({handleSubmit}) => {
  const categories = useSelector((state) => state.category.categories);
  const formik = useFormik({
    initialValues: { name: '', category_type: 'Category', category_id: null },
    validate,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Segmented
        block
        size="large"
        options={['Category', 'Subcategory']}
        onChange={(value) => formik.setFieldValue('category_type', value)}
        name="category_type"
        value={formik.values.category_type}
      />
      <FormControl isInvalid={formik.errors.name}>
        <Input
          onChange={formik.handleChange}
          value={formik.values.name}
          name="name"
          placeholder="Name"
        />
        <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
      </FormControl>

      {formik.values.category_type === 'Subcategory' && (
        <FormControl isInvalid={formik.errors.category_id}>
          <FormLabel>Parent Category</FormLabel>
          <Select
            showSearch
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            size="large"
            style={{
              width: '100%',
            }}
            onChange={(value) => formik.setFieldValue('category_id', value)}
            name="category_id"
            value={formik.values.category_id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />

          <FormErrorMessage>{formik.errors.category_id}</FormErrorMessage>
        </FormControl>
      )}
      <Button colorScheme="blue" type="submit">
        Save
      </Button>
    </form>
  );
};

export default CategoryForm;

import React from 'react';
import { Segmented, Select } from 'antd';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const CategoryForm = () => {
  const categories = useSelector((state) => state.category.categories);
  //TODO: Move setting data to parent
  const [formData, setFormData] = useState({ type: 'Category' });
  const typeString =
    formData.type.charAt(0).toUpperCase() + formData.type.slice(1) + ' name';
  const handleChange = () => {};
  return (
    <Flex direction="column" gap="6" p="4">
      <Segmented
        block
        size="large"
        options={['Category', 'Subcategory']}
        onChange={(value) => {
          setFormData({ type: value });
        }}
      />
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input placeholder={typeString}></Input>
      </FormControl>
      {formData.type === 'Subcategory' && (
        <FormControl>
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
            onChange={handleChange}
            options={categories.map((category) => ({
              label: category.name,
              value: category.name,
            }))}
          />
          <FormHelperText>
            The category your subcategory will be under
          </FormHelperText>
        </FormControl>
      )}
    </Flex>
  );
};

export default CategoryForm;

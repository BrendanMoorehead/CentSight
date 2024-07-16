import React from 'react';
import { Segmented, Select } from 'antd';

import { useState } from 'react';
const CategoryForm = () => {
  //TODO: Move setting data to parent
  const [formData, setFormData] = useState({ type: 'category' });
  const handleChange = () => {};
  return (
    <>
      <Segmented
        options={['category', 'subcategory']}
        onChange={(value) => {
          setFormData({ type: value });
        }}
      />
      {formData.type === 'subcategory' && (
        <Select
          defaultValue="lucy"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
            {
              value: 'Yiminghe',
              label: 'yiminghe',
            },
            {
              value: 'disabled',
              label: 'Disabled',
              disabled: true,
            },
          ]}
        />
      )}
    </>
  );
};

export default CategoryForm;

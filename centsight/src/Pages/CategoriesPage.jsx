import React from 'react';
import { useSelector } from 'react-redux';
const CategoriesPage = () => {
  const categories = useSelector((state) => state.category.categories);
  return (
    <div>
      {categories.map((cat) => (
        <>
          <p>{cat.name}</p>
          {cat.subcategories.map((subcat) => (
            <p>{subcat.name}</p>
          ))}
        </>
      ))}
    </div>
  );
};

export default CategoriesPage;

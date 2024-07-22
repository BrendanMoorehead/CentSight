import React from 'react';
import { useSelector } from 'react-redux';
import SubcategoryChip from '../components/categories/SubcategoryChip';
const CategoriesPage = () => {
  const categories = useSelector((state) => state.category.categories);
  return (
    <div>
      {categories.map((cat) => (
        <>
          <p>{cat.name}</p>
          {cat.subcategories.map((subcat) => (
            <SubcategoryChip key={subcat.id} name={subcat.name} />
          ))}
        </>
      ))}
    </div>
  );
};

export default CategoriesPage;

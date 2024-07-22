import React from 'react';
import { useSelector } from 'react-redux';
const CategoriesPage = () => {
  const categories = useSelector((state) => state.category.categories);
  return <div>CategoriesPage</div>;
};

export default CategoriesPage;

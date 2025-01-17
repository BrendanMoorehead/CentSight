import { useSelector } from 'react-redux';
import { Container } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import CategoryCard from '../components/categories/CategoryCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SubcategoriesTable from '../components/categories/SubcategoriesTable';
import CategoryInfoSection from '../components/categories/CategoryInfoSection';
import { useState } from 'react';
import { Button } from "@heroui/react";
import CategoryModal from '../components/modals/CategoryModal';
import PageMargins from '../components/PageMargins';
import PageHeaderText from '../components/PageHeaderText';

const CategoriesPage = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const auth = useSelector((state) => state.auth);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const categories = useSelector((state) => state.category.categories);

  const handleCategorySelect = (cat) => {
    setActiveCategoryId(cat.id);
  };

  const activeCategory = categories?.find((cat) => cat.id === activeCategoryId);

  return (
    <PageMargins>
      <CategoryModal
        isOpen={openCategoryModal}
        userId={auth.user.user.id}
        closeModal={() => setOpenCategoryModal(false)}
        title="Add Category"
      />
      <div className="flex justify-between pb-4">
        <PageHeaderText text="Categories" />
        <Button onClick={() => setOpenCategoryModal(true)}>Add</Button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {categories &&
          categories.map((category) => (
            <CategoryCard
              onPress={() => handleCategorySelect(category)}
              key={category.id}
              name={category.name}
              subcategoryCount={category?.subcategories?.length || 0}
              isSelected={activeCategory === category.id}
            />
          ))}
      </div>
      {activeCategory ? (
        <CategoryInfoSection category={activeCategory} />
      ) : (
        <div className="py-24 text-headline text-xl font-normal flex justify-center">
          Select a category to see details.
        </div>
      )}
    </PageMargins>
  );
};

export default CategoriesPage;

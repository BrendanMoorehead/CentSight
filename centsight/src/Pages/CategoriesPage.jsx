import { useSelector } from 'react-redux';
import { Container } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import CategoryCard from '../components/categories/CategoryCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SubcategoriesTable from '../components/categories/SubcategoriesTable';
import CategoryInfoSection from '../components/categories/CategoryInfoSection';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import CategoryModal from '../components/modals/CategoryModal';
import PageMargins from '../components/PageMargins';
import PageHeaderText from '../components/PageHeaderText';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const categoryCard = (category) => {
  const subcategoryCount = category.subcategories.length ?? 0;

  return (
    <div className="rounded-lg bg-neutral-800 p-6 flex justify-between align-center w-80">
      <div>
        <p className="font-headline font-semibold text-neutral-100">
          {category.name}
        </p>
        <p className="font-headline font-extralight text-neutral-200 text-sm">
          {subcategoryCount + ' subcategories'}
        </p>
      </div>
      {/* <IconButton aria-label="Search database" icon={<DeleteIcon />} /> */}
    </div>
  );
};

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
      <PageHeaderText text="Categories" />
      <CategoryModal
        isOpen={openCategoryModal}
        userId={auth.user.user.id}
        closeModal={() => setOpenCategoryModal(false)}
        title="Add Category"
      />
      <div className="flex justify-between">
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

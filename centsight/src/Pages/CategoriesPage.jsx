import React from 'react';
import { useSelector } from 'react-redux';
import SubcategoryChip from '../components/categories/SubcategoryChip';
import { Container } from '@chakra-ui/react';
import CategorySection from '../components/categories/CategorySection';
import { Flex } from '@chakra-ui/react';
import CategoryCard from '../components/categories/CategoryCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SubcategoriesTable from '../components/categories/SubcategoriesTable';
import CategoryDetails from '../components/categories/CategoryDetails';
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
  const categories = useSelector((state) => state.category.categories);
  return (
    <div className="p-12">
      <p className="text-headline text-2xl font-normal pb-6">Categories</p>
      <div className="grid grid-cols-5 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            subcategoryCount={category.subcategories.length}
          />
        ))}
      </div>
      <CategoryDetails />
    </div>
  );
};

export default CategoriesPage;

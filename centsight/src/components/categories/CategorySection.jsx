import { Button, Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../store/category-actions';
import SubcategoryChip from './SubcategoryChip';
import { Carousel } from 'primereact/carousel';
const CategorySection = ({ name, id, subcategories }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteCategory({ id, name }));
  };
  return (
    <div className="flex-col bg-neutral-900 p-6 rounded-3xl flex gap-6 w-96">
      <div className="flex justify-between">
        <p className="text-neutral-200 text-2xl">{name}</p>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
      <div className="flex-col flex gap-4">
        {subcategories.map((cat) => (
          <SubcategoryChip name={cat.name} id={cat.id} parent_id={id} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

import { Button, Flex } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { deleteSubcategory } from '../../store/category-actions';
import { useDispatch } from 'react-redux';
const SubcategoryChip = ({ name, id, parent_id }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteSubcategory({ name, id, category_id: parent_id }));
  };

  return (
    <Flex
      justify="space-between"
      alignItems="center"
      bg="#2e2e2e"
      gap="24px"
      p="12px"
      borderRadius={12}
    >
      <h2 style={{ color: 'white', fontWeight: 'bold' }}>{name}</h2>
      <Flex gap="12px">
        <Button p={2}>
          <EditIcon />
        </Button>
        <Button p={2} onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default SubcategoryChip;

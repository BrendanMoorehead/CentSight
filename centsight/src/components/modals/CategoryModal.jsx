import { useDispatch } from 'react-redux';
import { addCategory, addSubcategory } from '../../store/category-actions';
import ModalWrapper from '../ModalWrapper';
import CategoryForm from '../forms/CategoryForm';

const CategoryModal = ({ isOpen, closeModal, userId, categoryId, title }) => {
  const dispatch = useDispatch();

  const handleOk = (data) => {
    console.log(userId);
    //TODO: Add notification if user isn't authenticated
    if (data.category_type === 'category') {
      dispatch(addCategory({ ...data, user_id: userId }));
    } else {
      dispatch(addSubcategory({ ...data, user_id: userId }));
    }
    closeModal();
  };

  if (!userId) return <p>Loading...</p>;

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title={title}>
      <CategoryForm handleSubmit={handleOk} categoryId={categoryId} />
    </ModalWrapper>
  );
};

export default CategoryModal;

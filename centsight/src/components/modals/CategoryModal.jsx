/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addCategory, addSubcategory } from '../../store/category-actions';
import ModalWrapper from '../ModalWrapper';
import CategoryForm from '../forms/CategoryForm';

/**
 * CategoryModal Component
 *
 * Modal component that provides the new category/subcategory form to the user.
 *
 * Props:
 *  - isOpen (boolean): Whether the modal is open or closed.
 *  - closeModal (function): Function to close the modal.
 *  - userId (string): ID of the active user.
 *  - categoryId (string): ID of the selected category.
 *  - Title (string): Title displayed at the top of the modal.
 */
const CategoryModal = ({ isOpen, closeModal, userId, categoryId, title }) => {
  const dispatch = useDispatch();

  //Add a category or subcategory and close the modal.
  const handleOk = (data) => {
    if (data.category_type === 'category') {
      dispatch(addCategory({ ...data, user_id: userId }));
    } else {
      dispatch(addSubcategory({ ...data, user_id: userId }));
    }
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title={title}>
      <CategoryForm handleSubmit={handleOk} categoryId={categoryId} />
    </ModalWrapper>
  );
};

export default CategoryModal;

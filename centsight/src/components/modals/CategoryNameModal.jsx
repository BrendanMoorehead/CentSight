/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import CategoryNameForm from '../forms/CategoryNameForm';
import { updateCategoryName } from '../../store/category-actions';
/**
 * CategoryNameModal Component
 *
 * Modal component that provides the update category form to the user.
 *
 * Props:
 *  - isOpen (boolean): Whether the modal is open or closed.
 *  - closeModal (function): Function to close the modal.
 *  - data (object): Data of the category being updated.
 */
const CategoryNameModal = ({ isOpen, closeModal, data }) => {
  const dispatch = useDispatch();

  //Update the name and close the modal.
  const handleOk = (data) => {
    dispatch(updateCategoryName(data));
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title="Update Category">
      <CategoryNameForm handleSubmit={handleOk} data={data} />
    </ModalWrapper>
  );
};

export default CategoryNameModal;

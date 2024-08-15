import { useDispatch } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import CategoryNameForm from '../forms/CategoryNameForm';
import { updateCategoryName } from '../../store/category-actions';
const CategoryNameModal = ({ isOpen, closeModal, data }) => {
  const dispatch = useDispatch();

  const handleOk = (data) => dispatch(updateCategoryName(data));

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title="Update Category">
      <CategoryNameForm handleSubmit={handleOk} data={data} />
    </ModalWrapper>
  );
};

export default CategoryNameModal;

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, addSubcategory } from '../../store/category-actions';
import ModalWrapper from '../ModalWrapper';
import CategoryForm from '../forms/CategoryForm';
const CategoryModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const auth_id = useSelector((state) => state.auth.user.user.id);

  const handleOk = (data) => {
    if (data.category_type === 'Category') {
      dispatch(addCategory({ ...data, user_id: auth_id }));
    } else {
      dispatch(addSubcategory({ ...data, user_id: auth_id }));
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title="New Category">
      <CategoryForm handleSubmit={handleOk} />
    </ModalWrapper>
  );
};

export default CategoryModal;

import { useDispatch } from 'react-redux';
import { addCategory, addSubcategory } from '../../store/category-actions';
import ModalWrapper from '../ModalWrapper';
import TransactionForm from '../forms/TransactionForm';
import { addTransaction } from '../../store/transaction-actions';
const TransactionModal = ({ isOpen, closeModal, userId }) => {
  const dispatch = useDispatch();

  const handleOk = (data) => {
    dispatch(addTransaction({ ...data, user_id: userId }));
    closeModal();
  };

  if (!userId) return <p>Loading...</p>;

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title="New Transaction">
      <TransactionForm handleSubmit={handleOk} />
    </ModalWrapper>
  );
};

export default TransactionModal;

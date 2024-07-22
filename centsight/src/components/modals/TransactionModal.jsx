import { useDispatch } from 'react-redux';
import { addCategory, addSubcategory } from '../../store/category-actions';
import ModalWrapper from '../ModalWrapper';
import TransactionForm from '../forms/TransactionForm';
const TransactionModal = ({ isOpen, closeModal, userId }) => {
  const dispatch = useDispatch();

  const handleOk = (data) => {
    //TODO: Dispatch add events
  };

  if (!userId) return <p>Loading...</p>;

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title="New Transaction">
      <TransactionForm handleSubmit={handleOk} />
    </ModalWrapper>
  );
};

export default TransactionModal;

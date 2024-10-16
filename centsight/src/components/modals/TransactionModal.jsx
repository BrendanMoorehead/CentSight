/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import TransactionForm from '../forms/TransactionForm';
import { addTransaction } from '../../store/transaction-actions';

/**
 * TransactionModal Component
 *
 * Modal component that provides the new transaction form to the user.gue
 *
 * Props:
 *  - isOpen (boolean): Whether the modal is open or closed.
 *  - closeModal (function): Function to close the modal.
 *  - userId (string): ID of the active user.
 */
const TransactionModal = ({ isOpen, closeModal, userId }) => {
  const dispatch = useDispatch();

  const handleOk = (data) => {
    dispatch(addTransaction({ ...data, user_id: userId }));
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title="New Transaction">
      <TransactionForm handleSubmit={handleOk} />
    </ModalWrapper>
  );
};

export default TransactionModal;

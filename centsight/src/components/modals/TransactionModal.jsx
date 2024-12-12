/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import TransactionForm from '../forms/TransactionForm';
import {
  addTransaction,
  updateTransaction,
} from '../../store/transaction-actions';

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
const TransactionModal = ({
  isOpen,
  closeModal,
  userId,
  title = 'New Transaction',
  buttonText = 'Add',
  transactionData = null,
  handleSubmit,
}) => {
  const dispatch = useDispatch();

  const handleOk = (data) => {
    if (transactionData) {
      dispatch(
        updateTransaction({ ...data, user_id: userId, id: transactionData.id })
      );
    } else {
      console.log('ADD TRANSACTION', data);
      dispatch(addTransaction({ ...data, user_id: userId }));
    }
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title={title}>
      <TransactionForm
        handleSubmit={handleOk}
        transactionData={transactionData}
        buttonText={buttonText}
      />
    </ModalWrapper>
  );
};

export default TransactionModal;

/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import AccountForm from '../forms/AccountForm';
import { addAccount } from '../../store/account-actions';

/**
 * AccountModal Component
 *
 * Modal component that provides the new account form to the user.
 *
 * Props:
 *  - isOpen (boolean): Whether the modal is open or closed.
 *  - closeModal (function): Function to close the modal.
 *  - userId (string): ID of the active user.
 */
const AccountModal = ({ isOpen, closeModal, userId,title ="New Account", accountData, onSubmit, buttonText }) => {
  const dispatch = useDispatch();

  //Add an account and close the modal.
  const handleOk = (data) => {
    dispatch(addAccount({ ...data, user_id: userId }));
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title={title}>
      <AccountForm handleSubmit={handleOk} accountData={accountData} buttonText={buttonText}/>
    </ModalWrapper>
  );
};

export default AccountModal;

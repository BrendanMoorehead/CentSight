/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import AccountForm from '../forms/AccountForm';
import { addAccount, editAccount } from '../../store/account-actions';
import { useMemo } from 'react';

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
const AccountModal = ({
  isOpen,
  closeModal,
  userId,
  title = 'New Account',
  accountData,
  buttonText,
}) => {
  const dispatch = useDispatch();
  const stableAccountData = useMemo(() => accountData, [accountData]);
  console.log('Rendering AccountModal', { isOpen, accountData });

  const handleOk = (data) => {
    if (accountData) {
      dispatch(editAccount({ ...data, user_id: userId, id: accountData.id }));
    } else {
      dispatch(addAccount({ ...data, user_id: userId }));
    }
    closeModal();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title={title}>
      <AccountForm
        handleSubmit={handleOk}
        accountData={stableAccountData}
        buttonText={buttonText}
      />
    </ModalWrapper>
  );
};

export default AccountModal;

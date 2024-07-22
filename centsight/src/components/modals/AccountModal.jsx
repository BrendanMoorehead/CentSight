import { useDispatch } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import AccountForm from '../forms/AccountForm';
const AccountModal = ({ isOpen, closeModal, userId }) => {
  const dispatch = useDispatch();

  const handleOk = () => {};

  if (!userId) return <p>Loading...</p>;
  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title="New Account">
      <AccountForm handleSubmit={handleOk} />
    </ModalWrapper>
  );
};

export default AccountModal;

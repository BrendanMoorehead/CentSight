import { useDispatch } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import AccountForm from '../forms/AccountForm';
const AccountModal = ({ isOpen, closeModal, userId }) => {
  const dispatch = useDispatch();

  const handleOk = (data) => {
    console.log(data);
    //TODO: Add notification if user isn't authenticated
    // dispatch(addCategory({ ...data, user_id: userId }));

    // dispatch(addSubcategory({ ...data, user_id: userId }));
  };

  if (!userId) return <p>Loading...</p>;
  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal} title="New Account">
      <AccountForm handleSubmit={handleOk} />
    </ModalWrapper>
  );
};

export default AccountModal;

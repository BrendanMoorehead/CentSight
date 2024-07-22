import { FloatButton } from 'antd';
import { TiPlus } from 'react-icons/ti';
import { MdAccountBalance } from 'react-icons/md';
import { FaWallet } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import FloatButtonElement from './FloatButtonElement';
import AccountForm from '../forms/AccountForm';
import TransactionForm from '../forms/TransactionForm';
import CategoryModal from '../modals/CategoryModal';
import { useEffect, useState } from 'react';
import supabase from '../../../utils/supabase';
import TransactionModal from '../modals/TransactionModal';
import AccountModal from '../modals/AccountModal';
const FloatButtonGroup = ({ onOpenModal }) => {
  const [userId, setUserId] = useState(null);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);

  useEffect(() => {
    const getId = async () => {
      const id = await supabase.auth.getUser().id;
      return id;
    };
    const user_id = getId();
    setUserId(user_id);
  }, []);
  return (
    <>
      <CategoryModal
        isOpen={openCategoryModal}
        userId={userId}
        closeModal={() => setOpenCategoryModal(false)}
      />
      <TransactionModal
        isOpen={openTransactionModal}
        userId={userId}
        closeModal={() => setOpenTransactionModal(false)}
      />
      <AccountModal
        isOpen={openAccountModal}
        userId={userId}
        closeModal={() => setOpenAccountModal(false)}
      />
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 24 }}
        icon={<TiPlus />}
      >
        <FloatButtonElement
          label="New category"
          icon={<MdCategory />}
          onClick={() => setOpenCategoryModal(true)}
        />
        <FloatButtonElement
          label="New account"
          icon={<MdAccountBalance />}
          onClick={() => setOpenAccountModal(true)}
        />
        <FloatButtonElement
          label="New transaction"
          icon={<FaWallet />}
          onClick={() => setOpenTransactionModal(true)}
        />
      </FloatButton.Group>
    </>
  );
};

export default FloatButtonGroup;

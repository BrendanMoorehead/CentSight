import { FloatButton } from 'antd';
import { TiPlus } from 'react-icons/ti';
import { MdAccountBalance } from 'react-icons/md';
import { FaWallet } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import FloatButtonElement from './FloatButtonElement';
import CategoryModal from '../modals/CategoryModal';
import { useState } from 'react';
import TransactionModal from '../modals/TransactionModal';
import AccountModal from '../modals/AccountModal';
import { useSelector } from 'react-redux';

const FloatButtonGroup = () => {
  const auth = useSelector((state) => state.auth);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);

  if (!auth.user) return null;

  return (
    <>
      <CategoryModal
        isOpen={openCategoryModal}
        userId={auth.user.user.id}
        closeModal={() => setOpenCategoryModal(false)}
        title="Add Category"
      />
      <TransactionModal
        isOpen={openTransactionModal}
        userId={auth.user.user.id}
        closeModal={() => setOpenTransactionModal(false)}
      />
      <AccountModal
        isOpen={openAccountModal}
        userId={auth.user.user.id}
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

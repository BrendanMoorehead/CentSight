import { FloatButton } from 'antd';
import { TiPlus } from 'react-icons/ti';
import { MdAccountBalance } from 'react-icons/md';
import { FaWallet } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import FloatButtonElement from './FloatButtonElement';
import CategoryForm from '../forms/CategoryForm';
import AccountForm from '../forms/AccountForm';
import TransactionForm from '../forms/TransactionForm';
import { useDispatch } from 'react-redux';
import { addCategory, addSubcategory } from '../../store/category-actions';
import { useSelector } from 'react-redux';
import CategoryModal from '../modals/CategoryModal';
import { useState } from 'react';

const FloatButtonGroup = ({ onOpenModal }) => {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const auth_id = useSelector((state) => state.auth.user.user.id);
  const dispatch = useDispatch();

  return (
    <>
      <CategoryModal
        isOpen={openCategoryModal}
        closeModal={() => setOpenCategoryModal(false)}
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
          onClick={() =>
            onOpenModal({
              component: <AccountForm />,
            })
          }
        />
        <FloatButtonElement
          label="New transaction"
          icon={<FaWallet />}
          onClick={() =>
            onOpenModal({
              component: <TransactionForm />,
            })
          }
        />
      </FloatButton.Group>
    </>
  );
};

export default FloatButtonGroup;

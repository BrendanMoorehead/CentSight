import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../store/transaction-actions';

export const useTransactionActions = () => {
  const dispatch = useDispatch();

  const handleDelete = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
  };

  return { handleDelete };
};

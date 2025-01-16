import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../store/auth-actions';
import { fetchCategoryData } from '../store/category-actions';
import { fetchTransactionsData } from '../store/transaction-actions';
import { fetchAccountData } from '../store/account-actions';

const MainLayout = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.category.categories);
  const transactions = useSelector((state) => state.transaction.transactions);
  const accounts = useSelector((state) => state.account.accounts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.user) {
      navigate('/auth');
    } else {
      // Fetch user data if it doesn't exist and is not currently loading
      if (!auth.isLoading && !auth.user) {
        dispatch(getUser());
      }
    }
  }, [navigate, auth.user, auth.isLoading, dispatch]);

  useEffect(() => {
    // Only fetch categories if they don't already exist in the store
    if (auth.user && (!categories || categories.length === 0)) {
      dispatch(fetchCategoryData());
    }
  }, [auth.user, categories, dispatch]);

  useEffect(() => {
    // Only fetch transactions if they don't already exist in the store
    if (auth.user && (!transactions || transactions.length === 0)) {
      dispatch(fetchTransactionsData());
    }
  }, [auth.user, transactions, dispatch]);

  useEffect(() => {
    // Only fetch accounts if they don't already exist in the store
    if (auth.user && (!accounts || accounts.length === 0)) {
      dispatch(fetchAccountData());
    }
  }, [auth.user, accounts, dispatch]);

  if (!auth.user) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

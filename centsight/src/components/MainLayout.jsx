import { Outlet } from 'react-router-dom';
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.user) navigate('/auth');
  }, [navigate, auth.user]);

  useEffect(() => {
    console.log('fetching');
    dispatch(getUser());
    dispatch(fetchCategoryData());
    dispatch(fetchTransactionsData());
    dispatch(fetchAccountData());
  }, [dispatch]);

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

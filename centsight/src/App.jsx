import { useEffect } from 'react';
import { fetchCategoryData } from './store/category-actions';
import { useDispatch } from 'react-redux';

//Routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getUser } from './store/auth-actions';
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage.jsx';
import supabase from '../utils/supabase.js';
import CategoriesPage from './pages/CategoriesPage.jsx';
import MainLayout from './components/MainLayout.jsx';
const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/auth', element: <AuthPage /> },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      { path: 'categories', element: <CategoriesPage /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error(error.message);
      console.log(data);
    };

    dispatch(getUser());
    dispatch(fetchCategoryData());
    getData();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;

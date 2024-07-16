import { useEffect } from 'react';
import { fetchCategoryData } from './store/category-actions';
import { useDispatch } from 'react-redux';
//Routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getUser } from './store/auth-actions';
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage.jsx';
const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/auth', element: <AuthPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchCategoryData());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;

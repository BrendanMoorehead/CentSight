import { useEffect, useState } from 'react';
import { fetchCategoryData } from './store/category-actions';
import { useSelector, useDispatch } from 'react-redux';
//Routing
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import { getUser, logoutUser } from './store/auth-actions';

createBrowserRouter([{ path: '' }, { path: '' }]);

function App() {
  const [isInitial, setIsInitial] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const auth = useSelector((state) => state.auth);
  console.log(categories[0]);
  console.log(auth);
  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchCategoryData());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  if (auth.loading) {
    return <p>Loading...</p>;
  }

  if (auth.error) {
    return <p>Error: {auth.error}</p>;
  }

  return (
    <>
      {categories.map((cat) => (
        <>
          <p key={cat.id}>{cat.name}</p>
          {cat.subcategories.map((subcat) => (
            <p key={subcat.id}>{subcat.name}</p>
          ))}
        </>
      ))}
      <LoginPage />
      <button onClick={handleLogout}>Logout</button>
      {auth.user && <p>{auth.user.user.email}</p>}
    </>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { fetchCategoryData } from './store/category-actions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
function App() {
  const [isInitial, setIsInitial] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  console.log(categories[0]);
  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  return <p>helo</p>;
}

export default App;

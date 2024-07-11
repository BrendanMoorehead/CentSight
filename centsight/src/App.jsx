import { useEffect, useState } from 'react';
import { fetchCategoryData } from './store/category-actions';
import { useSelector } from 'react-redux';
function App() {
  const [isInitial, setIsInitial] = useState(true);
  const categories = useSelector((state) => state.categories);
  console.log(categories);
  useEffect(() => {
    if (!isInitial) {
      setIsInitial(false);
      fetchCategoryData();
    }
  }, []);
  return <p>Hello World</p>;
}

export default App;

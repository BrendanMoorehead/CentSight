import { supabase } from './../utils/supabase';
import { categoryActions } from './category-slice';

export const fetchCategoryData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('categories').select();

      if (error) throw new Error('Failed to fetch category data');
      return data;
    };
    try {
      const data = await fetchData();
      dispatch(categoryActions.replaceCategories(data));
    } catch (error) {
      console.log('Failed to fetch category data');
    }
  };
};

import supabase from './../utils/supabase';
import { categoryActions } from './category-slice';

export const fetchCategoryData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const { data: categories, categoryError } = await supabase
        .from('categories')
        .select();

      const { data: subcategories, subcategoryError } = await supabase
        .from('subcategories')
        .select();

      if (categoryError) throw new Error('Failed to fetch category data');
      if (subcategoryError) throw new Error('Failed to fetch subcategory data');

      //Map subcategories to categories.
      
      return categories;
    };
    try {
      const data = await fetchData();
      dispatch(categoryActions.replaceCategories(data));
    } catch (error) {
      console.log('Failed to fetch category data');
    }
  };
};

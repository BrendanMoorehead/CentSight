import supabase from './../../utils/supabase';
import { categoryActions } from './category-slice';
import nestCategories from '../../utils/nestCategories';

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
      const nestedCategories = nestCategories(categories, subcategories);
      return nestedCategories;
    };
    try {
      const data = await fetchData();
      console.log(data);
      dispatch(categoryActions.replaceCategories(data));
    } catch (error) {
      console.log('Failed to fetch category data');
    }
  };
};

export const addCategory = (data) => {
  return async (dispatch) => {
    const addData = async (data) => {
      const { error } = await supabase
        .from('user_categories')
        .insert({ user_id: data.user_id, name: data.name });

      if (error) throw new Error(error.message);
    };
    try {
      console.log(data);
      await addData(data);
      dispatch(categoryActions.addCategory(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const addSubcategory = () => {};

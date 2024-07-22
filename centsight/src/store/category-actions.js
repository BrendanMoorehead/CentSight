import supabase from './../../utils/supabase';
import { categoryActions } from './category-slice';
import nestCategories from '../../utils/nestCategories';
import { useSelector } from 'react-redux';
export const fetchCategoryData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getUser();
      const { data: categories, categoryError } = await supabase
        .from('categories')
        .select();

      console.log('USERID:', data.user.id);
      const { data: userCategories, userCategoryError } = await supabase
        .from('user_categories')
        .select()
        .eq('user_id', data.user.id);
      console.log('USER CATEGORIES:', userCategories);

      const { data: subcategories, subcategoryError } = await supabase
        .from('subcategories')
        .select();

      if (categoryError) throw new Error(categoryError.message);
      if (userCategoryError)
        throw new Error('Failed to fetch user category data');
      if (subcategoryError) throw new Error('Failed to fetch subcategory data');

      const combinedCats = categories.concat(userCategories);
      //Map subcategories to categories.
      const nestedCategories = nestCategories(combinedCats, subcategories);
      return nestedCategories;
    };
    try {
      const data = await fetchData();
      dispatch(categoryActions.replaceCategories(data));
    } catch (error) {
      console.log('Failed to fetch category data');
    }
  };
};

export const addCategory = (data) => {
  return async (dispatch) => {
    const addData = async (data) => {
      const { data: catData, error } = await supabase
        .from('user_categories')
        .insert({ user_id: data.user_id, name: data.name });

      if (error) throw new Error(error.message);
      console.log('CATDATA: ', catData, data);
      return catData;
    };
    try {
      console.log(data);
      const catData = await addData(data);
      dispatch(categoryActions.addCategory(catData));
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const addSubcategory = () => {};

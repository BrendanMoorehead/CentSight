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

      const { data: userCategories, userCategoryError } = await supabase
        .from('user_categories')
        .select()
        .eq('user_id', data.user.id);

      const { data: subcategories, subcategoryError } = await supabase
        .from('subcategories')
        .select();

      const { data: userSubcategories, userSubcategoryError } = await supabase
        .from('user_subcategories')
        .select()
        .eq('user_id', data.user.id);

      console.log('USER SUBCATEGORIES', userSubcategories);

      if (categoryError) throw new Error(categoryError.message);
      if (userCategoryError)
        throw new Error('Failed to fetch user category data');
      if (subcategoryError) throw new Error('Failed to fetch subcategory data');
      if (userSubcategoryError) throw new Error(userSubcategoryError.message);

      const combinedCats = categories.concat(userCategories);
      const combinedSubcats = subcategories.concat(userSubcategories);
      //Map subcategories to categories.
      const nestedCategories = nestCategories(combinedCats, combinedSubcats);
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
export const addSubcategory = (data) => {
  return async (dispatch) => {
    const addData = async (catData) => {
      const { data, error } = await supabase.from('user_subcategories').insert({
        user_id: catData.user_id,
        name: catData.name,
        category_id: catData.category_id,
        user_category_id: catData.user_category_id,
      });
      if (error) throw new Error(error.message);
      console.log('Subcat data:', data);
      return catData;
    };
    try {
      const catData = await addData(data);
      console.log(catData);
      dispatch(categoryActions.addSubcategory(catData));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteSubcategory = (data) => {
  return async (dispatch) => {
    const deleteSubcategory = async (data) => {
      const response = await supabase
        .from('user_subcategories')
        .delete()
        .eq('id', data.id);
      console.log(response);
      if (response.error) throw new Error(response.error.message);
    };
    try {
      await deleteSubcategory(data);
      dispatch(categoryActions.deleteSubcategory(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

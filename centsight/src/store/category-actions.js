import supabase from './../../utils/supabase';
import { categoryActions } from './category-slice';
import nestCategories from '../../utils/nestCategories';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchCategoryData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getUser();
      const { data: categories, error: categoryError } = await supabase
        .from('categories')
        .select();

      const { data: userCategories, error: userCategoryError } = await supabase
        .from('user_categories')
        .select()
        .eq('user_id', data.user.id);

      const { data: subcategories, error: subcategoryError } = await supabase
        .from('subcategories')
        .select();

      const { data: userSubcategories, error: userSubcategoryError } =
        await supabase
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
      const result = dispatch(categoryActions.replaceCategories(data));
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Subcategory added successfully!');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log('Failed to fetch category data');
      toast.error('Failed to fetch category data.');
    }
  };
};

export const addCategory = (data) => {
  return async (dispatch) => {
    const addData = async (catData) => {
      const { data, error } = await supabase
        .from('user_categories')
        .insert({ user_id: catData.user_id, name: catData.name })
        .select('*');

      if (error) throw new Error(error.message);
      console.log('Async add:', data);
      return data[0];
    };
    try {
      const catData = await addData(data);
      console.log('CAT DATA: ' + catData);
      dispatch(categoryActions.addCategory(catData));
      toast.success('Category added successfully!');
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to add subcategory');
    }
  };
};
export const addSubcategory = (data) => {
  return async (dispatch) => {
    const addData = async (catData) => {
      const { data, error } = await supabase
        .from('user_subcategories')
        .insert({
          user_id: catData.user_id,
          name: catData.name,
          category_id: catData.category_id,
          user_category_id: catData.user_category_id,
        })
        .select('*');
      if (error) throw new Error(error.message);
      console.log('Subcat data:', data);
      return data[0];
    };
    try {
      const catData = await addData(data);
      console.log(catData);
      dispatch(categoryActions.addSubcategory(catData));
      toast.success('${catData.name} Added successfully!');
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to add subcategory');
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
      toast.success('Subcategory deleted successfully!');
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to delete subcategory');
    }
  };
};
export const deleteCategory = (data) => {
  return async (dispatch) => {
    const deleteCategory = async (data) => {
      const response = await supabase
        .from('user_categories')
        .delete()
        .eq('id', data.id);
      if (response.error) throw new Error(response.error.message);
    };
    try {
      await deleteCategory(data);
      dispatch(categoryActions.deleteCategory(data));
    } catch (error) {
      //TODO: Have some visual element for errors.
      console.log(error.message);
    }
  };
};

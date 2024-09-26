import supabase from './../../utils/supabase';
import { categoryActions } from './category-slice';
import nestCategories from '../../utils/nestCategories';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//FETCH FUNCTIONS
/**
 * Fetches the category and subcategory data from Supabase and adds to Redux
 */
export const fetchCategoryData = () => {
  return async (dispatch) => {
    dispatch(categoryActions.setLoading());
    const fetchData = async () => {
      //Get the active user
      const { data, error } = await supabase.auth.getUser();
      if (error) throw new Error(error.message);

      //Get the categories from Supabase
      const { data: categories, error: categoryError } = await supabase
        .from('categories')
        .select();
      if (categoryError) throw new Error('Failed to fetch base categories');

      const { data: userCategories, error: userCategoryError } = await supabase
        .from('user_categories')
        .select()
        .eq('user_id', data.user.id);
      if (userCategoryError) throw new Error('Failed to fetch user categories');

      //Get the subcategories from Supabase
      const { data: subcategories, error: subcategoryError } = await supabase
        .from('subcategories')
        .select();
      if (subcategoryError)
        throw new Error('Failed to fetch base subcategories');

      const { data: userSubcategories, error: userSubcategoryError } =
        await supabase
          .from('user_subcategories')
          .select()
          .eq('user_id', data.user.id);
      if (userSubcategoryError)
        throw new Error('Failed to fetch user subcategories');

      //Group the categories and subcategories
      const combinedCats = categories.concat(userCategories);
      const combinedSubcats = subcategories.concat(userSubcategories);
      //Map subcategories to categories
      const nestedCategories = nestCategories(combinedCats, combinedSubcats);
      return nestedCategories;
    };
    try {
      const data = await fetchData();
      dispatch(categoryActions.replaceCategories(data));
    } catch (error) {
      toast.error(error.message);
    }
  };
};

//ADD FUNCTIONS
/**
 * Add a new category to Supabase and Redux
 *
 * @param {*} categoryData
 * @returns
 */
export const addCategory = (categoryData) => {
  return async (dispatch) => {
    const addData = async (catData) => {
      //Add category to Supabase
      const { data, error } = await supabase
        .from('user_categories')
        .insert({ user_id: catData.user_id, name: catData.name })
        .select('*');
      if (error) throw new Error(error.message);
      return data[0];
    };
    try {
      const catData = await addData(categoryData);
      //Add category to Redux
      dispatch(categoryActions.addCategory(catData));
      toast.success(`${catData.name} added`);
    } catch (error) {
      toast.error('Failed to add category');
    }
  };
};
/**
 * Add a new subcategory to Supabase and Redux
 *
 * @param {*} subcategoryData
 */
export const addSubcategory = (subcategoryData) => {
  return async (dispatch) => {
    const addData = async (catData) => {
      //Add subcategory to Supabase
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
      return data[0];
    };
    try {
      const catData = await addData(subcategoryData);
      //Add subcategory to Redux
      dispatch(categoryActions.addSubcategory(catData));
      toast.success(`${catData.name} added`);
    } catch (error) {
      toast.error('Failed to add subcategory');
    }
  };
};

// DELETION FUNCTIONS
/**
 * Deletes a given category from Supabase and Redux
 *
 * @param {*} categoryData details of the category to be deleted
 */
export const deleteCategory = (categoryData) => {
  return async (dispatch) => {
    const deleteCategory = async (data) => {
      //Delete the category from Supabase
      const response = await supabase
        .from('user_categories')
        .delete()
        .eq('id', data.id);
      if (response.error) throw new Error(response.error.message);
    };
    try {
      await deleteCategory(categoryData);
      //Remove the category in redux
      dispatch(categoryActions.deleteCategory(categoryData));
      toast.success(`${categoryData.name} deleted`);
    } catch (error) {
      toast.error(`Failed to delete ${categoryData.name}`);
    }
  };
};
/**
 * Deletes a given subcategory from Supabase and Redux
 *
 * @param {*} subcategoryData details of the subcategory to be deleted
 */
export const deleteSubcategory = (subcategoryData) => {
  return async (dispatch) => {
    const deleteSubcategory = async (data) => {
      const response = await supabase
        .from('user_subcategories')
        .delete()
        .eq('id', data.id);
      if (response.error) throw new Error(response.error.message);
    };
    try {
      await deleteSubcategory(subcategoryData);
      dispatch(categoryActions.deleteSubcategory(subcategoryData));
      toast.success(`${subcategoryData.name} deleted`);
    } catch (error) {
      toast.error('Failed to delete subcategory');
    }
  };
};

// UPDATE FUNCTIONS
/**
 * Updates a given category's name in Supabase and Redux
 *
 * @param {*} categoryData details of the category to be updated
 */
export const updateCategoryName = (categoryData) => {
  return async (dispatch) => {
    //Updates the category name and return the category column
    const updateCategory = async (catData) => {
      const { data, error } = await supabase
        .from('user_categories')
        .update({ name: catData.name })
        .eq('id', catData.id)
        .select();
      if (error) throw new Error(error.message);
      return data[0];
    };
    try {
      const data = await updateCategory(categoryData);
      //Update category details in Redux
      dispatch(categoryActions.updateCategoryName(data));
      toast.success(`${data.name} updated`);
    } catch (error) {
      toast.error(`Failed to update category name`);
    }
  };
};
/**
 * Updates a subcategories name and parent category id in Supabase and Redux
 *
 * @param {*} subcategoryData details of the subcategory to be updated
 */
export const updateSubcategory = (subcategoryData) => {
  return async (dispatch) => {
    const updateSubcategory = async (subcatData) => {
      //Update subcategory details in Supabase
      const { data, error } = await supabase.from('user_subcategories').update({
        name: subcatData.name,
        category_id: subcatData.category_id,
        user_category_id: subcatData.user_category_id,
      });
      if (error) throw new Error(error.message);
      return data[0];
    };
    try {
      const data = await updateSubcategory(subcategoryData);
      //Update subcategory details in Redux
      dispatch(categoryActions.updateSubcategory(data));
      toast.success(`${subcategoryData.name} updated`);
    } catch (error) {
      toast.error('Failed to update subcategory');
    }
  };
};

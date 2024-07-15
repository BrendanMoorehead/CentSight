import supabase from '../../utils/supabase';
import { authActions } from './auth-slice';

export const registerUserWithPassword = (email, password) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw new Error('Failed to register user: ', +error.message);
      return data;
    };

    try {
      const data = await fetchData();
      console.log(data);
      dispatch(authActions.loginUser(data));
    } catch (error) {
      console.error('Failed to register user: ', error.message);
    }
  };
};

export const loginUserWithPassword = () => {};

export const logoutUser = () => {};

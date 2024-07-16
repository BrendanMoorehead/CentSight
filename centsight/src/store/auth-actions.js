import supabase from '../../utils/supabase';
import { authActions } from './auth-slice';

//TODO: Set state error in catch cases
export const registerUserWithPassword = (email, password) => {
  return async (dispatch) => {
    const registerUser = async () => {
      dispatch(authActions.setLoading());
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw new Error(error.message);
      return data;
    };

    try {
      const data = await registerUser();
      console.log(data);
      dispatch(authActions.loginUser(data));
    } catch (error) {
      console.error('Failed to register user: ', error.message);
    }
  };
};

export const loginUserWithPassword = (email, password) => {
  return async (dispatch) => {
    const loginUser = async () => {
      dispatch(authActions.setLoading());
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      return data;
    };
    try {
      const data = await loginUser(email, password);
      dispatch(authActions.loginUser(data));
      localStorage.setItem('token', data.session.access_token);
    } catch (error) {
      console.error('Failed to login user: ', error.message);
      throw new Error('Failed to login user: ', error.message);
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    const fetchUser = async () => {
      dispatch(authActions.setLoading(true));
      const { data: user, error } = await supabase.auth.getUser();
      console.log('Fetched user:', user);
      if (error) throw error;
      return user;
    };
    try {
      const data = await fetchUser();
      dispatch(authActions.loginUser(data));
    } catch (error) {
      dispatch(authActions.setLoading(false));
      console.error('Failed to get user: ', error.message);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    const logoutUser = async () => {
      dispatch(authActions.setLoading(true));
      const { error } = await supabase.auth.signOut();
      return error;
    };
    const error = await logoutUser();
    if (error) throw error;
    dispatch(authActions.logoutUser());
  };
};

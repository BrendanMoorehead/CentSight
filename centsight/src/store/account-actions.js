import supabase from './../../utils/supabase';
import { accountActions } from './account-slice';

export const fetchAccountData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw new Error(error.message);
      const { data: accounts, error: accountsError } = await supabase
        .from('user_accounts')
        .select()
        .eq('user_id', data.user.id);
      if (accountsError) throw new Error(accountsError.message);
      return accounts;
    };
    try {
      const data = await fetchData();
      dispatch(accountActions.replaceAccounts(data));
    } catch (error) {
      console.error(error.message);
    }
  };
};

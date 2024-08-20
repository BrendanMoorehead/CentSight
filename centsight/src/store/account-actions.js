import supabase from './../../utils/supabase';
import { accountActions } from './account-slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchAccountData = () => {
  return async (dispatch) => {
    dispatch(accountActions.setLoading());
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
      toast.success('Accounts loaded');
    } catch (error) {
      toast.error('Failed to load accounts');
    }
  };
};

export const addAccount = (data) => {
  return async (dispatch) => {
    const addData = async (accountData) => {
      console.log(accountData);
      const { data, error } = await supabase
        .from('user_accounts')
        .insert({
          user_id: accountData.user_id,
          balance: accountData.balance,
          type: accountData.type,
          name: accountData.name,
        })
        .select('*');
      if (error) throw new Error(error.message);
      console.log('DATA[0]', data[0]);
      const sanitizedData = {
        ...data[0],
      };

      return sanitizedData;
    };
    try {
      const accountData = await addData(data);
      dispatch(accountActions.addAccount(accountData));
      toast.success('Account added');
    } catch (error) {
      toast.error('Failed to add account');
      console.error(error.message);
    }
  };
};

export const updateBalance = (accountId, amount) => {
  return async (dispatch) => {
    const updateData = async (accountId, amount) => {
      const { data: currentData, error: fetchError } = await supabase
        .from('user_accounts')
        .select('balance')
        .eq('id', accountId)
        .single();
      if (fetchError) throw new Error(fetchError.message);
      const newBalance = currentData.balance + amount;
      const { data, error } = await supabase
        .from('user_accounts')
        .update({ balance: newBalance })
        .eq('id', accountId)
        .select('*');
      if (error) throw new Error(error.message);
      return data;
    };
    try {
      const accountData = await updateData(accountId, amount);
      //TODO: Dispatch update
      dispatch(accountActions.overwriteAccount(accountData));
    } catch (error) {
      console.error('failed to update account balance');
    }
  };
};

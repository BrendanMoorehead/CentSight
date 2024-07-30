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

export const addAccount = (data) => {
  return async (dispatch) => {
    const addData = async (accountData) => {
      console.log(accountData);
      const {data, error} = await supabase.from('user_accounts').insert({
        user_id: accountData.user_id,
        balance: accountData.balance,
        type: accountData.type, 
        name: accountData.name
      }).select('*');
      if (error) throw new Error(error.message);
      console.log("DATA[0]", data[0]);
      const sanitizedData = {
        ...data[0]
      };

      return sanitizedData;
    }
   try {
     const accountData = await addData(data);
     console.log('DATA RET: ', accountData); 
     dispatch(accountActions.addAccount(accountData));
   } catch (error) {
      console.error(error.message);
   }
  }
}
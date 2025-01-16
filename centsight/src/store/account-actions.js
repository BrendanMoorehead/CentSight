import supabase from './../../utils/supabase';
import { accountActions } from './account-slice';
import { fetchTransactionsData } from './transaction-actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cache = {
  accounts: null,
  lastFetched: null,
};

const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

export const fetchAccountData = () => {
  return async (dispatch) => {
    dispatch(accountActions.setLoading());
    const fetchData = async () => {
      if (cache.accounts && Date.now() - cache.lastFetched < CACHE_EXPIRATION) {
        return cache.accounts;
      }
      const { data, error } = await supabase.auth.getUser();
      if (error) throw new Error(error.message);
      const { data: accounts, error: accountsError } = await supabase
        .from('user_accounts')
        .select()
        .eq('user_id', data.user.id);
      if (accountsError) throw new Error(accountsError.message);

      //Set the cache with new data
      cache.accounts = accounts;
      cache.lastFetched = Date.now();

      return accounts;
    };
    try {
      const data = await fetchData();
      dispatch(accountActions.replaceAccounts(data));
    } catch (error) {}
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
      const sanitizedData = {
        ...data[0],
      };

      return sanitizedData;
    };
    try {
      const accountData = await addData(data);
      dispatch(accountActions.addAccount(accountData));
      if (cache.accounts) {
        cache.accounts.push(accountData);
      }
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
      console.log('CURRENT BALANCE', accountId, currentData.balance, amount);
      const newBalance = Number(currentData.balance) + Number(amount);
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
      dispatch(
        accountActions.overwriteAccount({
          id: accountId,
          ...accountData[0], // Assuming accountData is an array with the updated account data
        })
      );
      if (cache.accounts) {
        const index = cache.accounts.findIndex(
          (account) => account.id === accountId
        );
        if (index !== -1)
          cache.accounts[index] = {
            ...cache.accounts[index],
            ...accountData[0],
          };
      }
    } catch (error) {
      console.error('failed to update account balance:', error.message);
    }
  };
};

/**
 * Function Name: deleteAccount
 * Description: Delete an account from the database and remove all associated transactions.
 * Parameters:
 *   - account (object): The account to delete.
 * Notes:
 *  - As set in the database, associated transactions are deleted when an account is deleted.
 */
export const deleteAccount = (account) => {
  return async (dispatch) => {
    // Remove the account from the database.
    const deleteAccount = async (account) => {
      const { data, error } = await supabase
        .from('user_accounts')
        .delete()
        .eq('id', account.id);
      if (error) throw new Error(error.message);
      return data;
    };
    try {
      const data = await deleteAccount(account);
      //Remove the account from state.
      dispatch(accountActions.deleteAccount(account));
      //Refetch the transactions.
      dispatch(fetchTransactionsData());
      toast.success(`Account deleted successfully.`, {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(`Failed to delete account.`, {
        position: 'top-right',
      });
    }
  };
};

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

/**
 * Function Name: updateBalance
 * Description: Updates the balance of a given account in the database and state.
 * Parameters:
 *   - accountId (string): The id of the account to update.
 *   - amount (number): The amount to add to the account.
 *       - If wanting to subtract, pass a negative number.
 * Side Effects:
 *   - Toast notification of failure.
 * Notes:
 *   - No toast on success as this function is called when adding a transaction.
 */
export const updateBalance = (accountId, amount) => {
  return async (dispatch) => {
    const updateData = async (accountId, amount) => {
      //Fetch the current balance of the account.
      const { data: currentData, error: fetchError } = await supabase
        .from('user_accounts')
        .select('balance')
        .eq('id', accountId)
        .single();
      if (fetchError) throw new Error(fetchError.message);
      const newBalance = Number(currentData.balance) + Number(amount);
      //Update the balance and return the update account object.
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
          ...accountData[0],
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
      toast.error(`Failed to update account balance.`, {
        position: 'top-right',
      });
    }
  };
};

/**
 * Function Name: deleteAccount
 * Description: Delete an account from the database and remove all associated transactions.
 * Parameters:
 *   - account (object): The account to delete.
 * Side Effects:
 *   - Toast notification of success or failure.
 * Notes:
 *  - Our database is set up to delete associated transactions when an account is deleted.
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

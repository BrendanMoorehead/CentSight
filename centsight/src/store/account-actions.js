import supabase from './../../utils/supabase';
import { accountActions, accountSlice } from './account-slice';
import { fetchTransactionsData } from './transaction-actions';
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
    } catch (error) {}
  };
};

/**
 * Function Name: editAccount
 * Description: Updates account values in the database and state.
 * Parameters:
 *   - account (object): The new data to update the account with.
 * Side Effects:
 *   - Toast notification on success or failure.
 */
export const editAccount = (data) => {
  return async (dispatch) => {
    const updateData = async (accountData) => {
      const { data, error } = await supabase
        .from('user_accounts')
        .update({
          user_id: accountData.user_id,
          balance: accountData.balance,
          type: accountData.type,
          name: accountData.name,
        })
        .eq('id', accountData.id);
      if (error) throw new Error(error.message);
      return data;
    };
    try {
      const newAccount = updateData(data);
      dispatch(accountActions.overwriteAccount(newAccount));
    } catch (error) {
      console.log(error.message);
      toast.error(`Failed to update account.`, {
        position: 'top-right',
      });
    }
  };
};

/**
 * Function Name: addAccount
 * Description: Adds an account to the database and state.
 * Parameters:
 *   - data (object): The data of the account to be written to database and state.
 * Side Effects:
 *   - Toast notification on success or failure.
 */
export const addAccount = (data) => {
  return async (dispatch) => {
    const addData = async (accountData) => {
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
      //
      const createdAccountData = {
        ...data[0],
      };
      return createdAccountData;
    };
    try {
      const accountData = await addData(data);
      dispatch(accountActions.addAccount(accountData));
      toast.success(`Account created successfully.`, {
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
      toast.error(`Failed to add account.`, {
        position: 'top-right',
      });
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
    } catch (error) {
      console.log(error);
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

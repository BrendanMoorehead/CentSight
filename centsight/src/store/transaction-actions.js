import { transactionActions } from './transaction-slice';
import supabase from './../../utils/supabase';
import { updateBalance } from './account-actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { calculateAccountBalancesWithDeletedTransactions } from '../../utils/calculations';
import { accountActions } from './account-slice';
export const fetchTransactionsData = () => {
  return async (dispatch) => {
    dispatch(transactionActions.setLoading());
    const fetchData = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) throw new Error(userError.message);

      // Fetch transactions
      const { data: transactionData, error: transactionError } = await supabase
        .from('user_transactions')
        .select('*')
        .eq('user_id', userData.user.id);

      if (transactionError) throw new Error(transactionError.message);
      if (transactionData.length === 0) return null;
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('id, name');

      if (categoriesError) throw new Error(categoriesError.message);

      // Fetch subcategories
      const { data: subcategoriesData, error: subcategoriesError } =
        await supabase.from('subcategories').select('id, name, category_id');

      if (subcategoriesError) throw new Error(subcategoriesError.message);

      // Fetch user categories
      const { data: userCategoriesData, error: userCategoriesError } =
        await supabase
          .from('user_categories')
          .select('id, name')
          .eq('user_id', userData.user.id);

      if (userCategoriesError) throw new Error(userCategoriesError.message);

      // Fetch user subcategories
      const { data: userSubcategoriesData, error: userSubcategoriesError } =
        await supabase
          .from('user_subcategories')
          .select('id, name, user_category_id')
          .eq('user_id', userData.user.id);

      if (userSubcategoriesError)
        throw new Error(userSubcategoriesError.message);

      const { data: accountsData, error: accountsError } = await supabase
        .from('user_accounts')
        .select('id, name, type')
        .eq('user_id', userData.user.id);

      if (accountsError) throw new Error(accountsError.message);

      // Create lookup objects
      const categories = Object.fromEntries(
        categoriesData.map((c) => [c.id, c])
      );
      const subcategories = Object.fromEntries(
        subcategoriesData.map((s) => [s.id, s])
      );
      const userCategories = Object.fromEntries(
        userCategoriesData.map((c) => [c.id, c])
      );
      const userSubcategories = Object.fromEntries(
        userSubcategoriesData.map((s) => [s.id, s])
      );
      const accounts = Object.fromEntries(accountsData.map((a) => [a.id, a]));

      // Combine data
      return transactionData.map((transaction) => ({
        ...transaction,
        category:
          userCategories[transaction.user_category_id]?.name ||
          categories[transaction.category_id]?.name ||
          null,
        category_id:
          transaction.user_category_id || transaction.category_id || null,
        subcategory:
          userSubcategories[transaction.user_subcategory_id]?.name ||
          subcategories[transaction.subcategory_id]?.name ||
          null,
        subcategory_id:
          transaction.user_subcategory_id || transaction.subcategory_id || null,
        sendingAccount:
          transaction.type == 'expense' || transaction.type == 'transfer'
            ? accounts[transaction.account_from_id]?.name
            : null,
        receivingAccount:
          transaction.type == 'income' || transaction.type == 'transfer'
            ? accounts[transaction.account_to_id]?.name
            : null,
      }));
    };

    try {
      const data = await fetchData();
      console.log('Fetching:', data);
      if (data) dispatch(transactionActions.replaceTransactions(data));
      dispatch(transactionActions.setLoading(false));
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      dispatch(transactionActions.setLoading(false));
      // Optionally dispatch an error action here
      // dispatch(transactionActions.setError(error.message));
    }
  };
};

export const addTransaction = (data) => {
  return async (dispatch) => {
    const addData = async (transactionData) => {
      console.log('ADD TRANSACTION fn', transactionData);
      if (transactionData.sendingAccount_id === '')
        transactionData.sendingAccount_id = transactionData.receivingAccount_id;
      if (transactionData.receivingAccount_id === '')
        transactionData.receivingAccount_id = transactionData.sendingAccount_id;
      console.log('ADD TRANSACTION fn post reset', transactionData);
      const { data, error } = await supabase
        .from('user_transactions')
        .insert({
          amount: transactionData.amount,
          category_id: transactionData.category_id,
          subcategory_id: transactionData.subcategory_id,
          user_id: transactionData.user_id,
          account_to_id: transactionData.receivingAccount_id,
          account_from_id: transactionData.sendingAccount_id,
          date: transactionData.date,
          note: transactionData.note,
          type: transactionData.type,
        })
        .select('*');
      if (error) throw new Error(error.message);
      console.log('Transaction add:', data);
      const updatedData = {
        ...data[0],
        receivingAccount: transactionData.receivingAccount,
        sendingAccount: transactionData.sendingAccount,
        category: transactionData.category,
        subcategory: transactionData.subcategory,
      };
      return updatedData;
    };
    try {
      const transactionData = await addData(data);
      console.log('ADD TRANSACTION fn post addData', transactionData);
      dispatch(transactionActions.addTransaction(transactionData));

      if (transactionData.type === 'income') {
        // Handle income
        dispatch(
          updateBalance(
            transactionData.account_to_id,
            Number(transactionData.amount)
          )
        );
      } else if (transactionData.type === 'expense') {
        // Handle expense
        dispatch(
          updateBalance(
            transactionData.account_from_id,
            Number(transactionData.amount) * -1
          )
        );
      } else if (transactionData.type === 'transfer') {
        // Handle transfer
        dispatch(
          updateBalance(
            transactionData.account_from_id,
            Number(transactionData.amount) * -1
          )
        ); // Decrease from sending account
        dispatch(
          updateBalance(
            transactionData.account_to_id,
            Number(transactionData.amount)
          )
        ); // Increase to receiving account
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteTransaction = (transactionId) => {
  return async (dispatch) => {
    const deleteTransaction = async (id) => {
      const response = await supabase
        .from('user_transactions')
        .delete()
        .eq('id', id);
      return response;
    };
    try {
      deleteTransaction(transactionId);
      dispatch(transactionActions.deleteTransaction({ id: transactionId }));
      toast.success(`Transaction deleted`, { position: 'bottom-right' });
    } catch (error) {
      toast.error(`Failed to delete transaction`, {
        position: 'bottom-right',
      });
    }
  };
};
export const batchDeleteTransactions = (transactions) => {
  return async (dispatch, getState) => {
    const transactionIds = transactions.map((transaction) => transaction.id);

    try {
      // Perform the deletion
      const { data, error } = await supabase
        .from('user_transactions')
        .delete()
        .in('id', transactionIds);

      if (error) throw new Error(error.message);

      // Dispatch the action to update the state
      const transactionIdsToDelete = transactions.map((trans) => trans.id);
      dispatch(
        transactionActions.batchDeleteTransactions(transactionIdsToDelete)
      );
      console.log('DELETED TRANS: ', transactions);
      // Get accounts from the state
      const accounts = getState().account.accounts;
      const newAccounts = calculateAccountBalancesWithDeletedTransactions(
        accounts,
        transactions
      );
      // Dispatch the updated accounts
      dispatch(accountActions.replaceAccounts(newAccounts));
      // Show success message
      toast.success('Transactions deleted successfully!', {
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error deleting transactions:', error);
      // Use the correct method for showing error messages
      toast.error(`Failed to batch delete transaction: ${error.message}`, {
        position: 'bottom-right',
      });
    }
  };
};
export const updateTransaction = (data) => {
  return async (dispatch, getState) => {
    const updateData = async (transactionData, id) => {
      if (transactionData.sendingAccount_id === '')
        transactionData.sendingAccount_id = transactionData.receivingAccount_id;
      if (transactionData.receivingAccount_id === '')
        transactionData.receivingAccount_id = transactionData.sendingAccount_id;
      const oldTransaction = await supabase
        .from('user_transactions')
        .select('*')
        .eq('id', id)
        .single();
      const { error } = await supabase
        .from('user_transactions')
        .update({
          amount: transactionData.amount,
          category_id: transactionData.category_id,
          subcategory_id: transactionData.subcategory_id,
          user_id: transactionData.user_id,
          account_to_id: transactionData.sendingAccount_id,
          account_from_id: transactionData.receivingAccount_id,
          date: transactionData.date,
          note: transactionData.note,
          type: transactionData.type,
        })
        .eq('id', id);
      if (error) throw new Error(error.message);
      return { transactionData, oldTransaction: oldTransaction.data };
    };
    try {
      const { transactionData, oldTransaction } = await updateData(
        data,
        data.id
      );
      console.log('OLD TRANSACTION', oldTransaction);
      console.log('NEW TRANSACTION', transactionData);
      dispatch(transactionActions.updateTransaction(transactionData));
      const accounts = getState().account.accounts;
      const newAccounts = calculateAccountBalancesWithDeletedTransactions(
        accounts,
        [oldTransaction]
      );
      console.log('NEW ACCOUNTS', newAccounts);
      // Dispatch the updated accounts
      dispatch(accountActions.replaceAccounts(newAccounts));
      if (
        transactionData.type === 'income' &&
        oldTransaction.type !== 'income'
      ) {
        // Handle income
        dispatch(
          updateBalance(
            transactionData.receivingAccount_id,
            Number(transactionData.amount)
          )
        );
      } else if (
        transactionData.type === 'expense' &&
        oldTransaction.type !== 'expense'
      ) {
        // Handle expense
        dispatch(
          updateBalance(
            transactionData.sendingAccount_id,
            Number(transactionData.amount) * -1
          )
        );
      } else if (transactionData.type === 'transfer') {
        // Handle transfer
        dispatch(
          updateBalance(
            transactionData.sendingAccount_id,
            Number(transactionData.amount) * -1
          )
        ); // Decrease from sending account
        dispatch(
          updateBalance(
            transactionData.receivingAccount_id,
            Number(transactionData.amount)
          )
        ); // Increase to receiving account
      }

      toast.success(`Transaction updated`, { position: 'top-right' });
    } catch (error) {
      console.log(error.message);
      toast.error(`Failed to update transaction`, {
        position: 'top-right',
      });
    }
  };
};

// export const updateTransaction = (data) => {
//   return async (dispatch, getState) => {
//     const updateData = async (transactionData) => {
//       //Delete the old transaction.
//       const response = await supabase
//         .from('user_transactions')
//         .delete()
//         .eq('id', transactionData.id);
//       //Update the accounts post deletion.
//       const accounts = getState().account.accounts;
//       const newAccounts = calculateAccountBalancesWithDeletedTransactions(
//         accounts,
//         [transactionData]
//       );
//       // Dispatch the updated accounts
//       dispatch(accountActions.replaceAccounts(newAccounts));
//       addTransaction(transactionData);
//     };
//     try {
//       const transactionData = await updateData(data);
//       toast.success(`Transaction updated`, { position: 'bottom-right' });
//     } catch (error) {
//       console.log(error.message);
//       toast.error(`Failed to update transaction`, {
//         position: 'bottom-right',
//       });
//     }
//   };
// };

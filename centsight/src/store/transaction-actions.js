import { transactionActions } from './transaction-slice';
import supabase from './../../utils/supabase';
import { addSubcategory } from './category-actions';
import { accountActions } from './account-slice';
import { updateBalance } from './account-actions';

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
        sendingAccount: accounts[transaction.account_from_id]?.name || null,
        receivingAccount: accounts[transaction.account_to_id]?.name || null,
      }));
    };

    try {
      const data = await fetchData();
      console.log('Fetching:', data);
      dispatch(transactionActions.replaceTransactions(data));
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
      if (transactionData.sendingAccount === '')
        transactionData.sendingAccount = transactionData.recievingAccount;
      if (transactionData.recievingAccount === '')
        transactionData.recievingAccount = transactionData.sendingAccount;

      const { data, error } = await supabase
        .from('user_transactions')
        .insert({
          // TODO: ADD category and account names to transaction data from form
          amount: transactionData.amount,
          category_id: transactionData.category,
          subcategory_id: transactionData.subcategory,
          user_id: transactionData.user_id,
          account_to_id: transactionData.sendingAccount,
          account_from_id: transactionData.recievingAccount,
          date: transactionData.date,
          note: transactionData.note,
          type: transactionData.type,
        })
        .select('*');
      if (error) throw new Error(error.message);
      console.log('Transaction add:', data);
      return data[0];
    };
    try {
      const transactionData = await addData(data);
      dispatch(transactionActions.addTransaction(transactionData));

      if (
        transactionData.type === 'income' ||
        transactionData.type === 'transfer'
      ) {
        dispatch(
          updateBalance(
            transactionData.account_to_id,
            Number(transactionData.amount)
          )
        );
      }
      if (
        transactionData.type === 'expense' ||
        transactionData.type === 'transfer'
      ) {
        dispatch(
          updateBalance(
            transactionData.account_from_id,
            Number(transactionData.amount) * -1
          )
        );
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
    } catch (error) {
      //handle error
    }
  };
};

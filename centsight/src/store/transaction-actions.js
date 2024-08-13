import { transactionActions } from './transaction-slice';
import supabase from './../../utils/supabase';
import { addSubcategory } from './category-actions';
export const fetchTransactionsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw new Error(error.message);

      const { data: transactions, error: transactionsError } = await supabase
        .from('user_transactions')
        .select()
        .eq('user_id', data.user.id);
      if (transactionsError) throw new Error(transactionsError.message);

      return transactions;
    };
    try {
      const data = await fetchData();
      dispatch(transactionActions.replaceTransactions(data));
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch transactions');
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
      if (transactionData.category === '')
        transactionData.category = transactionData.user;

      const { data, error } = await supabase
        .from('user_transactions')
        .insert({
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
    } catch (error) {
      console.log(error.message);
    }
  };
};

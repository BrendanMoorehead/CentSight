import { transactionActions } from './transaction-slice';
import supabase from './../../utils/supabase';
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

export const fetchCategoryData = () => {
  return (dispatch) => {
    const fetchData = async () => {
      const { data } = await supabase.from('categories').select();
    };
  };
};

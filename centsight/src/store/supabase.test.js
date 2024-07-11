import supabase from './../utils/supabase';
/* eslint-disable no-undef */
describe('Supabase connection', () => {
  test('data fetched from categories table', async () => {
    const { data, error } = await supabase.from('categories').select();
    expect(data);
  });
});

import { it, describe, expect, test } from 'vitest';
import supabase from './../../utils/supabase';

/* eslint-disable no-undef */
describe('Supabase Client', () => {
  it('should be defined', () => {
    expect(supabase).toBeDefined();
  });
  it('should login test user via email and password', async () => {
    const email = 'test@gmail.com';
    const password = '1234';

    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    expect(error).toBeNull();
    expect(user).toBeDefined();
  });
  test('should fetch one or more categories from categories table', async () => {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*');
    expect(categories.length).toBeGreaterThan(0);
    expect(error).toBeNull();
  });
  test('should fetch one or more subcategories from subcategories table', async () => {
    const { data: subcategories, error } = await supabase
      .from('subcategories')
      .select('*');
    expect(subcategories.length).toBeGreaterThan(0);
    expect(error).toBeNull();
  });
});

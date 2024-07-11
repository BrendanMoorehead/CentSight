import { it, describe, expect, test } from 'vitest';
import supabase from './../../utils/supabase';

/* eslint-disable no-undef */
describe('Supabase Client', () => {
  it('should be defined', () => {
    expect(supabase).toBeDefined();
  });
  it('should login user', async () => {
    const email = 'test@gmail.com';
    const password = '1234';

    try {
      const { user, session, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Log the response for debugging
      console.log('Login response:', { user, session, error });

      // Assertions
      expect(error).toBeNull();
      expect(user).toBeDefined(); // Check if user object is defined
      expect(session).toBeDefined(); // Check if session object is defined
    } catch (error) {
      console.error('Error logging in:', error.message);
      throw error; // Re-throw the error to fail the test explicitly
    }
  });
  test('data fetched from categories table', async () => {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*');
    expect(categories.length).toBeGreaterThan(0);
    expect(error).toBeNull();
  });
  test('data fetched from subcategories table', async () => {
    const { data: subcategories, error } = await supabase
      .from('subcategories')
      .select('*');
    expect(subcategories.length).toBeGreaterThan(0);
    expect(error).toBeNull();
  });
});

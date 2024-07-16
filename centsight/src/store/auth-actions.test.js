import { it, describe, expect, test } from 'vitest';
import supabase from './../../utils/supabase';
import { loginUserWithPassword } from './auth-actions';

describe('Auth actions', () => {
  it('should throw an error attempting unregistered login', async () => {
    const email = 'test1@gmail.com';
    const password = 'test1password';

    expect(() => loginUserWithPassword(email, password).toThrowError('Failed'));
  });
  it('should login the user', async () => {
    const email = 'testuser@test.com';
    const password = 'testuserpassword';

    const user = loginUserWithPassword(email, password);
    expect(user).toBeDefined();
  });
});

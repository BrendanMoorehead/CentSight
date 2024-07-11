import supabase from './supabase';
import { it, describe, expect, test } from 'vitest';
import nestCategories from './nestCategories';

describe('Nest categories', () => {
  it('should create an array with subcategories', async () => {
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*');
    const { data: subcategories, error: subCatError } = await supabase
      .from('subcategories')
      .select('*');

    const nestedCategories = nestCategories(categories, subcategories);
    const hasChild = nestedCategories.every((category) =>
      Array.isArray(category.subcategories)
    );
    expect(hasChild).toBe(true);
    expect(catError).toBeNull();
    expect(subCatError).toBeNull();
  });
});

export default function nestCategories(parentArr, childrenArr) {
  const parentMap = new Map();
  parentArr.forEach((parent) =>
    parentMap.set(parent.id, { ...parent, subcategories: [] })
  );

  childrenArr.forEach((child) => {
    const parent = parentMap.get(child.category_id);
    if (parent) {
      parent.subcategories.push(child);
    }
  });

  return Array.from(parentMap.values());
}

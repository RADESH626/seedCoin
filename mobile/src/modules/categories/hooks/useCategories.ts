// Obsoleto: Las categorías son ahora estáticas en src/constants/categories.ts
export function useCategories() {
  return {
    categories: [],
    fetchCategories: () => {},
    fetchExpensesCategories: () => {},
    loading: false
  };
}

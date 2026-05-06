export interface StaticCategory {
  category_id: string;
  name: string;
  is_income: number;
  icon: string;
  color: string;
  is_default: number;
}

export const CATEGORIES: StaticCategory[] = [
  // Ingresos
  { category_id: 'income_salary', name: 'Salario', is_income: 1, icon: 'cash', color: '#2ecc71', is_default: 1 },
  { category_id: 'income_business', name: 'Negocio / Ventas', is_income: 1, icon: 'briefcase', color: '#27ae60', is_default: 1 },
  { category_id: 'income_gifts', name: 'Regalos', is_income: 1, icon: 'gift', color: '#1abc9c', is_default: 1 },
  { category_id: 'income_other', name: 'Otros Ingresos', is_income: 1, icon: 'add-circle-outline', color: '#16a085', is_default: 1 },

  // Gastos
  { category_id: 'expense_food', name: 'Alimentación', is_income: 0, icon: 'restaurant', color: '#e74c3c', is_default: 1 },
  { category_id: 'expense_housing', name: 'Vivienda', is_income: 0, icon: 'home', color: '#c0392b', is_default: 1 },
  { category_id: 'expense_transport', name: 'Transporte', is_income: 0, icon: 'car', color: '#e67e22', is_default: 1 },
  { category_id: 'expense_utilities', name: 'Servicios', is_income: 0, icon: 'flash', color: '#d35400', is_default: 1 },
  { category_id: 'expense_entertainment', name: 'Entretenimiento', is_income: 0, icon: 'game-controller', color: '#9b59b6', is_default: 1 },
  { category_id: 'expense_health', name: 'Salud', is_income: 0, icon: 'medkit', color: '#8e44ad', is_default: 1 },
  { category_id: 'expense_education', name: 'Educacion', is_income: 0, icon: 'school', color: '#3498db', is_default: 1 },
  { category_id: 'expense_debt', name: 'Pago de Deudas', is_income: 0, icon: 'card', color: '#2980b9', is_default: 1 },
  { category_id: 'expense_other', name: 'Otros Gastos', is_income: 0, icon: 'remove-circle-outline', color: '#7f8c8d', is_default: 1 }
];

export const CATEGORY_MAP = CATEGORIES.reduce((acc, cat) => {
  acc[cat.category_id] = cat;
  return acc;
}, {} as Record<string, StaticCategory>);

export const getCategoryById = (id: string): StaticCategory | undefined => {
  return CATEGORY_MAP[id];
};

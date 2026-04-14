export const INITIAL_CATEGORIES = [
    // Ingresos
    { name: 'Salario', is_income: 1, icon: 'cash', color: '#2ecc71', is_default: 1 },
    { name: 'Negocio / Ventas', is_income: 1, icon: 'briefcase', color: '#27ae60', is_default: 1 },
    { name: 'Regalos', is_income: 1, icon: 'gift', color: '#1abc9c', is_default: 1 },
    { name: 'Otros Ingresos', is_income: 1, icon: 'add-circle-outline', color: '#16a085', is_default: 1 },

    // Gastos
    { name: 'Alimentación', is_income: 0, icon: 'restaurant', color: '#e74c3c', is_default: 1 },
    { name: 'Vivienda', is_income: 0, icon: 'home', color: '#c0392b', is_default: 1 },
    { name: 'Transporte', is_income: 0, icon: 'car', color: '#e67e22', is_default: 1 },
    { name: 'Servicios', is_income: 0, icon: 'flash', color: '#d35400', is_default: 1 },
    { name: 'Entretenimiento', is_income: 0, icon: 'game-controller', color: '#9b59b6', is_default: 1 },
    { name: 'Salud', is_income: 0, icon: 'medkit', color: '#8e44ad', is_default: 1 },
    { name: 'Educacion', is_income: 0, icon: 'school', color: '#3498db', is_default: 1 },
    { name: 'Pago de Deudas', is_income: 0, icon: 'card', color: '#2980b9', is_default: 1 },
    { name: 'Otros Gastos', is_income: 0, icon: 'remove-circle-outline', color: '#7f8c8d', is_default: 1 }
];

export const SEED_CATEGORIES_QUERY = `
    INSERT INTO CATEGORY (name, is_income, icon, color, is_default)
    VALUES (?, ?, ?, ?, ?);
`;

package com.seedCoin.seedCoin.config;

import com.seedCoin.seedCoin.model.Category;
import com.seedCoin.seedCoin.model.TransactionType;
import com.seedCoin.seedCoin.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private com.seedCoin.seedCoin.repository.RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        seedRoles();
        seedUnifiedCategories();
    }

    private void seedRoles() {
        if (roleRepository.count() == 0) {
            createRole("CUSTOMER");
            createRole("ADMIN");
            System.out.println("Roles seeded successfully.");
        }
    }

    private void createRole(String name) {
        com.seedCoin.seedCoin.model.Role role = new com.seedCoin.seedCoin.model.Role();
        role.setName(name);
        roleRepository.save(role);
    }

    private void seedUnifiedCategories() {
        if (categoryRepository.count() == 0) {
            // 1. ACCOUNT TYPES (Group: ACCOUNT_TYPE)
            createSystemCategory("Efectivo", "CASH", "ACCOUNT_TYPE", "💵", null);
            createSystemCategory("Cuenta Bancaria", "BANK_ACCOUNT", "ACCOUNT_TYPE", "🏦", null);
            createSystemCategory("Tarjeta de Crédito", "CREDIT_CARD", "ACCOUNT_TYPE", "💳", null);
            createSystemCategory("Billetera Digital", "WALLET", "ACCOUNT_TYPE", "📱", null);
            createSystemCategory("Inversión", "INVESTMENT", "ACCOUNT_TYPE", "📈", null);

            // 2. TRANSACTION TYPES - INCOME (Group: TRANSACTION)
            createSystemCategory("Salario", "SALARY", "TRANSACTION", "💰", TransactionType.INCOME);
            createSystemCategory("Negocio", "BUSINESS", "TRANSACTION", "🏪", TransactionType.INCOME);
            createSystemCategory("Rendimientos", "INVESTMENT_RETURN", "TRANSACTION", "📊", TransactionType.INCOME);
            createSystemCategory("Regalos", "GIFT", "TRANSACTION", "🎁", TransactionType.INCOME);
            createSystemCategory("Otros Ingresos", "OTHER_INCOME", "TRANSACTION", "💵", TransactionType.INCOME);

            // 3. TRANSACTION TYPES - EXPENSE (Group: TRANSACTION)
            createSystemCategory("Alimentación", "FOOD", "TRANSACTION", "🍔", TransactionType.EXPENSE);
            createSystemCategory("Vivienda", "HOUSING", "TRANSACTION", "🏠", TransactionType.EXPENSE);
            createSystemCategory("Transporte", "TRANSPORT", "TRANSACTION", "🚌", TransactionType.EXPENSE);
            createSystemCategory("Servicios", "UTILITIES", "TRANSACTION", "💡", TransactionType.EXPENSE);
            createSystemCategory("Entretenimiento", "ENTERTAINMENT", "TRANSACTION", "🎬", TransactionType.EXPENSE);
            createSystemCategory("Salud", "HEALTH", "TRANSACTION", "💊", TransactionType.EXPENSE);
            createSystemCategory("Compras", "SHOPPING", "TRANSACTION", "🛍️", TransactionType.EXPENSE);
            createSystemCategory("Otros Gastos", "OTHER_EXPENSE", "TRANSACTION", "💸", TransactionType.EXPENSE);

            System.out.println("Unified Categories seeded successfully.");
        }
    }

    private void createSystemCategory(String name, String code, String group, String icon, TransactionType type) {
        Category category = new Category();
        category.setName(name);
        category.setCode(code);
        category.setCategoryGroup(group);
        category.setIcon(icon);
        category.setType(type);
        category.setIsSystem(true);
        category.setIsActive(true);
        categoryRepository.save(category);
    }
}

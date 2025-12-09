-- Create Database
CREATE DATABASE IF NOT EXISTS seedCoin;
USE seedCoin;

-- Table structure for table `roles`
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `UK_roles_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Table structure for table `users`
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `role_id` INT NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_users_email` (`email`),
  KEY `FK_users_role` (`role_id`),
  CONSTRAINT `FK_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `categories`
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `category_group` VARCHAR(50) NOT NULL,
  `icon` VARCHAR(50) DEFAULT NULL,
  `transaction_type` VARCHAR(20) DEFAULT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `is_system` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `UK_categories_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `accounts`
CREATE TABLE IF NOT EXISTS `accounts` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `category_id` INT NOT NULL,
  `current_balance` DECIMAL(15,2) DEFAULT 0.00,
  `is_active` BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (`account_id`),
  KEY `FK_accounts_user` (`user_id`),
  KEY `FK_accounts_category` (`category_id`),
  CONSTRAINT `FK_accounts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FK_accounts_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `transactions`
CREATE TABLE IF NOT EXISTS `transactions` (
  `transaction_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `account_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `amount` DECIMAL(15,2) NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `transaction_date` DATETIME NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`),
  KEY `FK_transactions_user` (`user_id`),
  KEY `FK_transactions_account` (`account_id`),
  KEY `FK_transactions_category` (`category_id`),
  CONSTRAINT `FK_transactions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FK_transactions_account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`),
  CONSTRAINT `FK_transactions_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `scheduled_transactions`
CREATE TABLE IF NOT EXISTS `scheduled_transactions` (
  `scheduled_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `account_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `amount` DECIMAL(15,2) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `next_execution_date` DATETIME NOT NULL,
  `frequency` VARCHAR(20) NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`scheduled_id`),
  KEY `FK_scheduled_transactions_user` (`user_id`),
  KEY `FK_scheduled_transactions_account` (`account_id`),
  KEY `FK_scheduled_transactions_category` (`category_id`),
  CONSTRAINT `FK_scheduled_transactions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FK_scheduled_transactions_account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`),
  CONSTRAINT `FK_scheduled_transactions_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =========================================
-- Data Seeding (Values from DataInitializer)
-- =========================================

-- 1. Roles
INSERT INTO `roles` (`role_name`) VALUES 
('CUSTOMER'),
('ADMIN');

-- 2. Categories
-- 2.1 Account Types (Group: ACCOUNT_TYPE)
INSERT INTO `categories` (`name`, `code`, `category_group`, `icon`, `transaction_type`, `is_system`, `is_active`) VALUES
('Efectivo', 'CASH', 'ACCOUNT_TYPE', '💵', NULL, TRUE, TRUE),
('Cuenta Bancaria', 'BANK_ACCOUNT', 'ACCOUNT_TYPE', '🏦', NULL, TRUE, TRUE),
('Tarjeta de Crédito', 'CREDIT_CARD', 'ACCOUNT_TYPE', '💳', NULL, TRUE, TRUE),
('Billetera Digital', 'WALLET', 'ACCOUNT_TYPE', '📱', NULL, TRUE, TRUE),
('Inversión', 'INVESTMENT', 'ACCOUNT_TYPE', '📈', NULL, TRUE, TRUE);

-- 2.2 Income Categories (Group: TRANSACTION, Type: INCOME)
INSERT INTO `categories` (`name`, `code`, `category_group`, `icon`, `transaction_type`, `is_system`, `is_active`) VALUES
('Salario', 'SALARY', 'TRANSACTION', '💰', 'INCOME', TRUE, TRUE),
('Negocio', 'BUSINESS', 'TRANSACTION', '🏪', 'INCOME', TRUE, TRUE),
('Rendimientos', 'INVESTMENT_RETURN', 'TRANSACTION', '📊', 'INCOME', TRUE, TRUE),
('Regalos', 'GIFT', 'TRANSACTION', '🎁', 'INCOME', TRUE, TRUE),
('Otros Ingresos', 'OTHER_INCOME', 'TRANSACTION', '💵', 'INCOME', TRUE, TRUE);

-- 2.3 Expense Categories (Group: TRANSACTION, Type: EXPENSE)
INSERT INTO `categories` (`name`, `code`, `category_group`, `icon`, `transaction_type`, `is_system`, `is_active`) VALUES
('Alimentación', 'FOOD', 'TRANSACTION', '🍔', 'EXPENSE', TRUE, TRUE),
('Vivienda', 'HOUSING', 'TRANSACTION', '🏠', 'EXPENSE', TRUE, TRUE),
('Transporte', 'TRANSPORT', 'TRANSACTION', '🚌', 'EXPENSE', TRUE, TRUE),
('Servicios', 'UTILITIES', 'TRANSACTION', '💡', 'EXPENSE', TRUE, TRUE),
('Entretenimiento', 'ENTERTAINMENT', 'TRANSACTION', '🎬', 'EXPENSE', TRUE, TRUE),
('Salud', 'HEALTH', 'TRANSACTION', '💊', 'EXPENSE', TRUE, TRUE),
('Compras', 'SHOPPING', 'TRANSACTION', '🛍️', 'EXPENSE', TRUE, TRUE),
('Otros Gastos', 'OTHER_EXPENSE', 'TRANSACTION', '💸', 'EXPENSE', TRUE, TRUE);

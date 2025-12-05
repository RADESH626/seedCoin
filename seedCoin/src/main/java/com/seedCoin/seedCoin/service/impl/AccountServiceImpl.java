package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.AccountDTO;
import com.seedCoin.seedCoin.dto.CreateAccountDTO;
import com.seedCoin.seedCoin.model.Account;
import com.seedCoin.seedCoin.model.Category;
import com.seedCoin.seedCoin.model.User;
import com.seedCoin.seedCoin.repository.AccountRepository;
import com.seedCoin.seedCoin.repository.CategoryRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import com.seedCoin.seedCoin.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<AccountDTO> getAllAccounts() {
        return accountRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AccountDTO> getAccountsByUserId(Integer userId) {

        // TODO: SOLUCIONAR EL PROBLEMA DE LA CONSULTA
        return accountRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<AccountDTO> getAccountById(Integer id) {
        return accountRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public AccountDTO createAccount(CreateAccountDTO createAccountDTO) {
        User user = userRepository.findById(createAccountDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(createAccountDTO.getAccountTypeId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Ensure it is an Account Type
        if (!"ACCOUNT_TYPE".equals(category.getCategoryGroup())) {
            throw new RuntimeException("Selected category is not an Account Type");
        }

        Account account = new Account();
        account.setUser(user);
        account.setCategory(category);
        account.setName(createAccountDTO.getName());
        account.setCurrentBalance(
                createAccountDTO.getInitialBalance() != null ? createAccountDTO.getInitialBalance() : BigDecimal.ZERO);
        account.setIsActive(true);

        Account savedAccount = accountRepository.save(account);
        return convertToDTO(savedAccount);
    }

    @Override
    public AccountDTO updateAccount(Integer id, AccountDTO accountDTO) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (accountDTO.getAccountTypeId() != null) {
            Category category = categoryRepository.findById(accountDTO.getAccountTypeId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            if (!"ACCOUNT_TYPE".equals(category.getCategoryGroup())) {
                throw new RuntimeException("Selected category is not an Account Type");
            }
            account.setCategory(category);
        }

        account.setName(accountDTO.getName());
        if (accountDTO.getCurrentBalance() != null) {
            account.setCurrentBalance(accountDTO.getCurrentBalance());
        }
        if (accountDTO.getIsActive() != null) {
            account.setIsActive(accountDTO.getIsActive());
        }

        Account updatedAccount = accountRepository.save(account);
        return convertToDTO(updatedAccount);
    }

    @Override
    public void deleteAccount(Integer id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        account.setIsActive(false);
        accountRepository.save(account);
    }

    private AccountDTO convertToDTO(Account account) {
        AccountDTO dto = new AccountDTO();
        dto.setId(account.getId());
        dto.setUserId(account.getUser().getId());
        dto.setName(account.getName());
        dto.setCurrentBalance(account.getCurrentBalance());

        if (account.getCategory() != null) {
            dto.setAccountType(account.getCategory().getName());
            dto.setAccountTypeId(account.getCategory().getId());
        }
        dto.setIsActive(account.getIsActive());
        return dto;
    }
}

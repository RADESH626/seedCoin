package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.AccountDTO;
import com.seedCoin.seedCoin.dto.createDTO.CreateAccountDTO;
import com.seedCoin.seedCoin.model.Account;
import com.seedCoin.seedCoin.model.User;

import com.seedCoin.seedCoin.repository.AccountRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import com.seedCoin.seedCoin.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<AccountDTO> getAllAccounts() {
        return accountRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AccountDTO> getAccountsByUserId(Integer userId) {

        return accountRepository.findByUserIdAndIsActiveTrue(Objects.requireNonNull(userId)).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<AccountDTO> getAccountById(Integer id) {
        return accountRepository.findById(Objects.requireNonNull(id)).map(this::convertToDTO);
    }

    @Override
    public AccountDTO createAccount(CreateAccountDTO createAccountDTO) {

        User user = userRepository.findById(Objects.requireNonNull(createAccountDTO.getUserId()))
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = new Account();
        account.setUser(user);
        account.setAccountType(createAccountDTO.getAccountType());
        account.setName(createAccountDTO.getName());
        account.setCurrentBalance(
                createAccountDTO.getInitialBalance() != null ? createAccountDTO.getInitialBalance() : BigDecimal.ZERO);
        account.setIsActive(true);

        Account savedAccount = accountRepository.save(account);
        return convertToDTO(savedAccount);
    }

    @Override
    public AccountDTO updateAccount(Integer id, AccountDTO accountDTO) {
        Account account = accountRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new RuntimeException("Account not found"));

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
        Account account = accountRepository.findById(Objects.requireNonNull(id))
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

        if (account.getAccountType() != null) {
            dto.setAccountType(account.getAccountType());
        }
        dto.setIsActive(account.getIsActive());
        return dto;
    }
}

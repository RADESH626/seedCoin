package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.AccountDTO;
import com.seedCoin.seedCoin.dto.CreateAccountDTO;
import com.seedCoin.seedCoin.model.Account;
import com.seedCoin.seedCoin.model.User;
import com.seedCoin.seedCoin.repository.AccountRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import com.seedCoin.seedCoin.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public Optional<AccountDTO> getAccountById(Integer id) {
        return accountRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public AccountDTO createAccount(CreateAccountDTO createAccountDTO) {
        Account account = new Account();
        account.setName(createAccountDTO.getName());
        account.setCurrentBalance(createAccountDTO.getCurrentBalance());
        account.setIsActive(true);

        User user = userRepository.findById(createAccountDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        account.setUser(user);

        Account savedAccount = accountRepository.save(account);
        return convertToDTO(savedAccount);
    }

    @Override
    public AccountDTO updateAccount(Integer id, AccountDTO accountDTO) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setName(accountDTO.getName());
        account.setCurrentBalance(accountDTO.getCurrentBalance());
        account.setIsActive(accountDTO.getIsActive());

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
        dto.setIsActive(account.getIsActive());
        return dto;
    }
}

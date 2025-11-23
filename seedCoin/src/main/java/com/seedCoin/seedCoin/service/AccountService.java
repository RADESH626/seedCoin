package com.seedCoin.seedCoin.service;

import com.seedCoin.seedCoin.dto.AccountDTO;
import com.seedCoin.seedCoin.dto.CreateAccountDTO;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    List<AccountDTO> getAllAccounts();

    Optional<AccountDTO> getAccountById(Integer id);

    AccountDTO createAccount(CreateAccountDTO createAccountDTO);

    AccountDTO updateAccount(Integer id, AccountDTO accountDTO);

    void deleteAccount(Integer id);
}

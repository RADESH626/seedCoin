package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.AccountDTO;
import com.seedCoin.seedCoin.dto.CreateAccountDTO;
import com.seedCoin.seedCoin.model.Account;
import com.seedCoin.seedCoin.model.Category;
import com.seedCoin.seedCoin.model.User;
import com.seedCoin.seedCoin.repository.AccountRepository;
import com.seedCoin.seedCoin.repository.CategoryRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountServiceImplTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private AccountServiceImpl accountService;

    private User user;
    private Account account;
    private Category category;
    private CreateAccountDTO createAccountDTO;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);
        user.setName("John");

        category = new Category();
        category.setId(1);
        category.setName("Bank");
        category.setCategoryGroup("ACCOUNT_TYPE");

        account = new Account();
        account.setId(1);
        account.setUser(user);
        account.setCategory(category);
        account.setName("Savings");
        account.setCurrentBalance(BigDecimal.valueOf(1000));
        account.setIsActive(true);

        createAccountDTO = new CreateAccountDTO();
        createAccountDTO.setUserId(1);
        createAccountDTO.setAccountTypeId(1);
        createAccountDTO.setName("Savings");
        createAccountDTO.setInitialBalance(BigDecimal.valueOf(1000));
    }

    @Test
    void getAllAccounts() {
        when(accountRepository.findAll()).thenReturn(Arrays.asList(account));

        List<AccountDTO> result = accountService.getAllAccounts();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(account.getName(), result.get(0).getName());
    }

    @Test
    void getAccountById() {
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));

        Optional<AccountDTO> result = accountService.getAccountById(1);

        assertTrue(result.isPresent());
        assertEquals(account.getName(), result.get().getName());
    }

    @Test
    @SuppressWarnings("null")
    void createAccount() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));
        when(accountRepository.save(any(Account.class))).thenReturn(account);

        AccountDTO result = accountService.createAccount(createAccountDTO);

        assertNotNull(result);
        assertEquals(createAccountDTO.getName(), result.getName());
        verify(accountRepository, times(1)).save(any(Account.class));
    }

    @Test
    @SuppressWarnings("null")
    void updateAccount() {
        AccountDTO updateDTO = new AccountDTO();
        updateDTO.setName("Updated Savings");
        updateDTO.setCurrentBalance(BigDecimal.valueOf(2000));
        updateDTO.setIsActive(true);
        updateDTO.setAccountTypeId(1);

        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));
        when(accountRepository.save(any(Account.class))).thenReturn(account);

        AccountDTO result = accountService.updateAccount(1, updateDTO);

        assertNotNull(result);
        verify(accountRepository, times(1)).save(any(Account.class));
    }

    @Test
    @SuppressWarnings("null")
    void deleteAccount() {
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        when(accountRepository.save(any(Account.class))).thenReturn(account);

        accountService.deleteAccount(1);

        verify(accountRepository, times(1)).save(any(Account.class));
        assertFalse(account.getIsActive());
    }
}

package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.CreateTransactionDTO;
import com.seedCoin.seedCoin.dto.TransactionDTO;
import com.seedCoin.seedCoin.model.Account;
import com.seedCoin.seedCoin.model.Category;
import com.seedCoin.seedCoin.model.Transaction;
import com.seedCoin.seedCoin.model.TransactionType;
import com.seedCoin.seedCoin.model.User;
import com.seedCoin.seedCoin.repository.AccountRepository;
import com.seedCoin.seedCoin.repository.CategoryRepository;
import com.seedCoin.seedCoin.repository.TransactionRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TransactionServiceImplTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    private User user;
    private Account account;
    private Category category;
    private Transaction transaction;
    private CreateTransactionDTO createTransactionDTO;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);

        account = new Account();
        account.setId(1);
        account.setCurrentBalance(BigDecimal.valueOf(1000)); // Initialize with some balance

        category = new Category();
        category.setId(1);
        category.setType(TransactionType.EXPENSE);

        transaction = new Transaction();
        transaction.setId(1);
        transaction.setUser(user);
        transaction.setAccount(account);
        transaction.setCategory(category);
        transaction.setAmount(BigDecimal.valueOf(100));
        transaction.setType(TransactionType.EXPENSE);
        transaction.setDescription("Lunch");
        transaction.setTransactionDate(LocalDateTime.now());

        createTransactionDTO = new CreateTransactionDTO();
        createTransactionDTO.setUserId(1);
        createTransactionDTO.setAccountId(1);
        createTransactionDTO.setCategoryId(1);
        createTransactionDTO.setAmount(BigDecimal.valueOf(100));
        createTransactionDTO.setType("EXPENSE");
        createTransactionDTO.setDescription("Lunch");
        createTransactionDTO.setTransactionDate(LocalDateTime.now());
    }

    @Test
    void getAllTransactions() {
        when(transactionRepository.findAll()).thenReturn(Arrays.asList(transaction));

        List<TransactionDTO> result = transactionService.getAllTransactions();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(transaction.getDescription(), result.get(0).getDescription());
    }

    @Test
    void getTransactionById() {
        when(transactionRepository.findById(1)).thenReturn(Optional.of(transaction));

        Optional<TransactionDTO> result = transactionService.getTransactionById(1);

        assertTrue(result.isPresent());
        assertEquals(transaction.getDescription(), result.get().getDescription());
    }

    @Test
    @SuppressWarnings("null")
    void createTransaction() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        TransactionDTO result = transactionService.createTransaction(createTransactionDTO);

        assertNotNull(result);
        assertEquals(createTransactionDTO.getDescription(), result.getDescription());
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    @SuppressWarnings("null")
    void updateTransaction() {
        TransactionDTO updateDTO = new TransactionDTO();
        updateDTO.setAmount(BigDecimal.valueOf(200));
        updateDTO.setType("EXPENSE");
        updateDTO.setDescription("Dinner");
        updateDTO.setTransactionDate(LocalDateTime.now());

        when(transactionRepository.findById(1)).thenReturn(Optional.of(transaction));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        TransactionDTO result = transactionService.updateTransaction(1, updateDTO);

        assertNotNull(result);
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    void deleteTransaction() {
        when(transactionRepository.findById(1)).thenReturn(Optional.of(transaction));
        doNothing().when(transactionRepository).deleteById(1);

        transactionService.deleteTransaction(1);

        verify(transactionRepository, times(1)).deleteById(1);
    }

    @Test
    @SuppressWarnings("null")
    void getCommonTransactions() {
        com.seedCoin.seedCoin.dto.CommonTransactionDTO commonDTO = new com.seedCoin.seedCoin.dto.CommonTransactionDTO();
        commonDTO.setCategoryId(1);
        commonDTO.setCategoryName("Food");
        commonDTO.setDescription("Lunch");
        commonDTO.setUsageCount(5L);

        when(transactionRepository.findCommonTransactions(eq(1), eq(TransactionType.EXPENSE),
                any(org.springframework.data.domain.Pageable.class)))
                .thenReturn(Arrays.asList(commonDTO));

        List<com.seedCoin.seedCoin.dto.CommonTransactionDTO> result = transactionService.getCommonTransactions(1,
                "EXPENSE");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Lunch", result.get(0).getDescription());
    }

    @Test
    void createTransaction_InsufficientFunds_ShouldThrowException() {
        createTransactionDTO.setType("EXPENSE");
        createTransactionDTO.setAmount(BigDecimal.valueOf(1000)); // Account has 100 probably? Need to check setup

        // Setup Account with low balance
        account.setCurrentBalance(BigDecimal.valueOf(100)); // Set specific balance for this test

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));

        assertThrows(org.springframework.web.server.ResponseStatusException.class, () -> {
            transactionService.createTransaction(createTransactionDTO);
        });

        verify(transactionRepository, never()).save(any(Transaction.class));
    }

}

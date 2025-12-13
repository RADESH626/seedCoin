package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.ScheduledTransactionDTO;
import com.seedCoin.seedCoin.model.*;
import com.seedCoin.seedCoin.repository.AccountRepository;
import com.seedCoin.seedCoin.repository.CategoryRepository;
import com.seedCoin.seedCoin.repository.ScheduledTransactionRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import com.seedCoin.seedCoin.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings("null")
class ScheduledTransactionServiceImplTest {

    @Mock
    private ScheduledTransactionRepository scheduledTransactionRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private ScheduledTransactionServiceImpl scheduledTransactionService;

    private ScheduledTransactionDTO dto;
    private ScheduledTransaction entity;
    private User user;
    private Account account;
    private Category category;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);

        account = new Account();
        account.setId(1);
        account.setUser(user);
        account.setName("Test Account");

        category = new Category();
        category.setId(1);
        category.setName("Test Category");

        dto = new ScheduledTransactionDTO();
        dto.setUserId(1);
        dto.setAccountId(1);
        dto.setCategoryId(1);
        dto.setAmount(BigDecimal.valueOf(100.00));
        dto.setDescription("Test Scheduled");
        dto.setFrequency(Frequency.MONTHLY);
        dto.setType(TransactionType.EXPENSE);
        dto.setNextExecutionDate(LocalDateTime.now().plusDays(1));
        dto.setIsActive(true);

        entity = new ScheduledTransaction();
        entity.setId(1);
        entity.setUser(user);
        entity.setAccount(account);
        entity.setCategory(category);
        entity.setAmount(BigDecimal.valueOf(100.00));
        entity.setFrequency(Frequency.MONTHLY);
        entity.setType(TransactionType.EXPENSE);
        entity.setNextExecutionDate(LocalDateTime.now().plusDays(1));
        entity.setIsActive(true);
    }

    @Test
    void createScheduledTransaction_Success() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));
        when(scheduledTransactionRepository.save(any(ScheduledTransaction.class))).thenReturn(entity);

        ScheduledTransactionDTO created = scheduledTransactionService.createScheduledTransaction(dto);

        assertNotNull(created);
        assertEquals(dto.getAmount(), created.getAmount());
        verify(scheduledTransactionRepository, times(1)).save(any(ScheduledTransaction.class));
    }

    @Test
    void getScheduledTransactionsByUserId_Success() {
        when(scheduledTransactionRepository.findByUserIdAndIsActiveTrue(1))
                .thenReturn(Collections.singletonList(entity));

        List<ScheduledTransactionDTO> list = scheduledTransactionService.getScheduledTransactionsByUserId(1);

        assertFalse(list.isEmpty());
        assertEquals(1, list.size());
    }

    @Test
    void updateScheduledTransaction_Success() {
        when(scheduledTransactionRepository.findById(1)).thenReturn(Optional.of(entity));
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));
        when(scheduledTransactionRepository.save(any(ScheduledTransaction.class))).thenReturn(entity);

        dto.setDescription("Updated");
        ScheduledTransactionDTO updated = scheduledTransactionService.updateScheduledTransaction(1, dto);

        assertEquals("Updated", updated.getDescription());
    }

    @Test
    void processDueTransactions_ShouldProcessAndReschedule() {
        // Setup a due transaction
        entity.setNextExecutionDate(LocalDateTime.now().minusMinutes(1));
        List<ScheduledTransaction> dueTransactions = new ArrayList<>();
        dueTransactions.add(entity);

        when(scheduledTransactionRepository.findByNextExecutionDateBeforeAndIsActiveTrue(any(LocalDateTime.class)))
                .thenReturn(dueTransactions);
        when(scheduledTransactionRepository.save(any(ScheduledTransaction.class))).thenReturn(entity);

        scheduledTransactionService.processDueTransactions();

        // Verify transaction was created
        verify(transactionService, times(1)).createTransaction(any());
        // Verify schedule was updated (saved)
        verify(scheduledTransactionRepository, times(1)).save(entity);
    }
}

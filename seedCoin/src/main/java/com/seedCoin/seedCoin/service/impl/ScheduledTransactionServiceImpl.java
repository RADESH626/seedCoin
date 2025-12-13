package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.CreateTransactionDTO;
import com.seedCoin.seedCoin.dto.ScheduledTransactionDTO;
import com.seedCoin.seedCoin.model.*;
import com.seedCoin.seedCoin.repository.AccountRepository;
import com.seedCoin.seedCoin.repository.CategoryRepository;
import com.seedCoin.seedCoin.repository.ScheduledTransactionRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import com.seedCoin.seedCoin.service.ScheduledTransactionService;
import com.seedCoin.seedCoin.service.TransactionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ScheduledTransactionServiceImpl implements ScheduledTransactionService {

    @Autowired
    private ScheduledTransactionRepository scheduledTransactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TransactionService transactionService;

    @Override
    public ScheduledTransactionDTO createScheduledTransaction(ScheduledTransactionDTO dto) {
        ScheduledTransaction entity = new ScheduledTransaction();
        updateEntityFromDto(entity, dto);
        ScheduledTransaction saved = scheduledTransactionRepository.save(entity);
        return mapToDto(saved);
    }

    @Override
    public List<ScheduledTransactionDTO> getScheduledTransactionsByUserId(Integer userId) {
        return scheduledTransactionRepository.findByUserIdAndIsActiveTrue(userId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ScheduledTransactionDTO updateScheduledTransaction(Integer id, ScheduledTransactionDTO dto) {
        ScheduledTransaction entity = scheduledTransactionRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new RuntimeException("Scheduled Transaction not found"));

        updateEntityFromDto(entity, dto);
        ScheduledTransaction saved = scheduledTransactionRepository.save(Objects.requireNonNull(entity));
        return mapToDto(saved);
    }

    @Override
    public void deleteScheduledTransaction(Integer id) {
        ScheduledTransaction entity = scheduledTransactionRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new RuntimeException("Scheduled Transaction not found"));
        entity.setIsActive(false); // Soft delete
        scheduledTransactionRepository.save(entity);
    }

    @Override
    @Scheduled(cron = "0 0 0 * * *") // Run daily at midnight
    @Transactional
    public void processDueTransactions() {
        LocalDateTime now = LocalDateTime.now();
        List<ScheduledTransaction> dueTransactions = scheduledTransactionRepository
                .findByNextExecutionDateBeforeAndIsActiveTrue(now);

        for (ScheduledTransaction st : dueTransactions) {
            try {
                CreateTransactionDTO transactionDTO = new CreateTransactionDTO();
                transactionDTO.setUserId(st.getUser().getId());
                transactionDTO.setAccountId(st.getAccount().getId());
                transactionDTO.setCategoryId(st.getCategory().getId());
                transactionDTO.setAmount(st.getAmount());
                transactionDTO.setDescription(st.getDescription());
                transactionDTO.setType(st.getType().toString());
                transactionDTO.setTransactionDate(st.getNextExecutionDate());

                transactionService.createTransaction(transactionDTO);

                updateSchedule(st);
            } catch (Exception e) {
                System.err.println(
                        "Failed to process scheduled transaction ID: " + st.getId() + " Error: " + e.getMessage());
            }
        }
    }

    private void updateSchedule(ScheduledTransaction st) {
        if (st.getFrequency() == null)
            return;

        LocalDateTime next = st.getNextExecutionDate();
        switch (st.getFrequency()) {
            case ONCE:
                st.setIsActive(false);
                break;
            case WEEKLY:
                next = next.plusWeeks(1);
                st.setNextExecutionDate(next);
                break;
            case MONTHLY:
                next = next.plusMonths(1);
                st.setNextExecutionDate(next);
                break;
            case YEARLY:
                next = next.plusYears(1);
                st.setNextExecutionDate(next);
                break;
        }
        scheduledTransactionRepository.save(st);
    }

    private void updateEntityFromDto(ScheduledTransaction entity, ScheduledTransactionDTO dto) {
        if (dto.getUserId() != null) {
            User user = userRepository.findById(Objects.requireNonNull(dto.getUserId()))
                    .orElseThrow(() -> new RuntimeException("User not found"));
            entity.setUser(user);
        }
        if (dto.getAccountId() != null) {
            Account account = accountRepository.findById(Objects.requireNonNull(dto.getAccountId()))
                    .orElseThrow(() -> new RuntimeException("Account not found"));
            entity.setAccount(account);
        }
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(Objects.requireNonNull(dto.getCategoryId()))
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            entity.setCategory(category);
        }
        entity.setAmount(dto.getAmount());
        entity.setDescription(dto.getDescription());
        entity.setNextExecutionDate(dto.getNextExecutionDate());
        entity.setFrequency(dto.getFrequency());
        entity.setType(dto.getType());
        if (dto.getIsActive() != null)
            entity.setIsActive(dto.getIsActive());
    }

    private ScheduledTransactionDTO mapToDto(ScheduledTransaction entity) {
        ScheduledTransactionDTO dto = new ScheduledTransactionDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getId());
        dto.setAccountId(entity.getAccount().getId());
        dto.setAccountName(entity.getAccount().getName());
        dto.setCategoryId(entity.getCategory().getId());
        dto.setCategoryName(entity.getCategory().getName());
        dto.setAmount(entity.getAmount());
        dto.setDescription(entity.getDescription());
        dto.setNextExecutionDate(entity.getNextExecutionDate());
        dto.setFrequency(entity.getFrequency());
        dto.setType(entity.getType());
        dto.setIsActive(entity.getIsActive());
        return dto;
    }
}

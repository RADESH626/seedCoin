package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.CreateTransactionDTO;
import com.seedCoin.seedCoin.dto.TransactionDTO;
import com.seedCoin.seedCoin.model.Account;
import com.seedCoin.seedCoin.model.Category;
import com.seedCoin.seedCoin.model.Transaction;
import com.seedCoin.seedCoin.model.User;
import com.seedCoin.seedCoin.repository.AccountRepository;
import com.seedCoin.seedCoin.repository.CategoryRepository;
import com.seedCoin.seedCoin.repository.TransactionRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import com.seedCoin.seedCoin.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<TransactionDTO> getAllTransactions() {
        return transactionRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TransactionDTO> getTransactionsByUserId(Integer userId) {
        return transactionRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<TransactionDTO> getTransactionById(Integer id) {
        return transactionRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public TransactionDTO createTransaction(CreateTransactionDTO createTransactionDTO) {
        Transaction transaction = new Transaction();
        transaction.setAmount(createTransactionDTO.getAmount());
        transaction.setType(com.seedCoin.seedCoin.model.TransactionType.valueOf(createTransactionDTO.getType()));
        transaction.setDescription(createTransactionDTO.getDescription());
        transaction.setTransactionDate(createTransactionDTO.getTransactionDate());

        User user = userRepository.findById(createTransactionDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        transaction.setUser(user);

        Account account = accountRepository.findById(createTransactionDTO.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));
        transaction.setAccount(account);

        Category category = categoryRepository.findById(createTransactionDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        transaction.setCategory(category);

        // Update Account Balance
        if (transaction.getType() == com.seedCoin.seedCoin.model.TransactionType.INCOME) {
            account.setCurrentBalance(account.getCurrentBalance().add(transaction.getAmount()));
        } else {
            account.setCurrentBalance(account.getCurrentBalance().subtract(transaction.getAmount()));
        }
        accountRepository.save(account);

        Transaction savedTransaction = transactionRepository.save(transaction);
        return convertToDTO(savedTransaction);
    }

    @Override
    public TransactionDTO updateTransaction(Integer id, TransactionDTO transactionDTO) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        Account account = transaction.getAccount();

        // Revert old balance
        if (transaction.getType() == com.seedCoin.seedCoin.model.TransactionType.INCOME) {
            account.setCurrentBalance(account.getCurrentBalance().subtract(transaction.getAmount()));
        } else {
            account.setCurrentBalance(account.getCurrentBalance().add(transaction.getAmount()));
        }

        // Apply new values
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setType(com.seedCoin.seedCoin.model.TransactionType.valueOf(transactionDTO.getType()));
        transaction.setDescription(transactionDTO.getDescription());
        transaction.setTransactionDate(transactionDTO.getTransactionDate());

        // Update Account with new balance
        if (transaction.getType() == com.seedCoin.seedCoin.model.TransactionType.INCOME) {
            account.setCurrentBalance(account.getCurrentBalance().add(transaction.getAmount()));
        } else {
            account.setCurrentBalance(account.getCurrentBalance().subtract(transaction.getAmount()));
        }
        accountRepository.save(account);

        // Note: Updating account/category relationships is not handled here for
        // simplicity
        // If changed, we'd need to handle balance on old vs new account. Assuming
        // account doesn't change for now.

        Transaction updatedTransaction = transactionRepository.save(transaction);
        return convertToDTO(updatedTransaction);
    }

    @Override
    public void deleteTransaction(Integer id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        Account account = transaction.getAccount();

        // Revert balance before deleting
        if (transaction.getType() == com.seedCoin.seedCoin.model.TransactionType.INCOME) {
            account.setCurrentBalance(account.getCurrentBalance().subtract(transaction.getAmount()));
        } else {
            account.setCurrentBalance(account.getCurrentBalance().add(transaction.getAmount()));
        }
        accountRepository.save(account);

        transactionRepository.deleteById(id);
    }

    private TransactionDTO convertToDTO(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setUserId(transaction.getUser().getId());
        dto.setAccountId(transaction.getAccount().getId());
        dto.setCategoryId(transaction.getCategory().getId());
        dto.setCategoryName(transaction.getCategory().getName());
        dto.setAmount(transaction.getAmount());
        dto.setType(transaction.getType().name());
        dto.setDescription(transaction.getDescription());
        dto.setTransactionDate(transaction.getTransactionDate());
        dto.setCreatedAt(transaction.getCreatedAt());
        return dto;
    }
}

package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.TransactionDTO;
import com.seedCoin.seedCoin.dto.createDTO.CreateTransactionDTO;
import com.seedCoin.seedCoin.model.*;
import com.seedCoin.seedCoin.model.enums.TransactionType;
import com.seedCoin.seedCoin.repository.AccountRepository;
import com.seedCoin.seedCoin.repository.TransactionRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import com.seedCoin.seedCoin.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<TransactionDTO> getAllTransactions() {
        return transactionRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public List<TransactionDTO> getTransactionsByUserId(Integer userId) {
        return transactionRepository.findByUserIdOrderByTransactionDateDescIdDesc(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<TransactionDTO> getTransactionById(Integer id) {
        return transactionRepository.findById(Objects.requireNonNull(id)).map(this::convertToDTO);
    }

    @Override
    public TransactionDTO createTransaction(CreateTransactionDTO createTransactionDTO) {

        // objeto que guardaremos en la base de datos
        Transaction transaction = new Transaction();

        // establecemos la fecha de la transaccion usando el LocalDateTime.now() que
        // debe ser la fecha actual
        transaction.setTransactionDate(LocalDateTime.now());

        // establecemos el usuario que realizara la transaccion
        transaction.setUser(userRepository.findById(Objects.requireNonNull(createTransactionDTO.getUserId()))
                .orElseThrow(() -> new RuntimeException("User not found")));

        // establecemos la cuenta que se usara para la transaccion
        transaction.setAccount(accountRepository.findById(Objects.requireNonNull(createTransactionDTO.getAccountId()))
                .orElseThrow(() -> new RuntimeException("Account not found")));

        // establecemos la categoria de la transaccion
        transaction.setCategory(createTransactionDTO.getCategory());

        // establecemos el monto de la transaccion
        transaction.setAmount(createTransactionDTO.getAmount());

        // establecemos la descripcion de la transaccion
        transaction.setDescription(createTransactionDTO.getDescription());

        // establecemos el tipo de la transaccion
        transaction.setType(createTransactionDTO.getType());

        // Update Account Balance
        Account account = transaction.getAccount();

        if (transaction.getType() == TransactionType.INCOME) {
            account.setCurrentBalance(account.getCurrentBalance().add(transaction.getAmount()));
        } else {
            account.setCurrentBalance(account.getCurrentBalance().subtract(transaction.getAmount()));
        }
        accountRepository.save(account);
        // guardamos la transaccion en la base de datos
        Transaction savedTransaction = transactionRepository.save(transaction);

        // retornamos la transaccion convertida a dto
        return convertToDTO(savedTransaction);
    }

    @Override
    public TransactionDTO updateTransaction(Integer id, TransactionDTO transactionDTO) {
        return transactionRepository.findById(Objects.requireNonNull(id)).map(transaction -> {
            // Revert balance change for the old transaction amount
            Account oldAccount = transaction.getAccount();
            if (transaction.getType() == TransactionType.INCOME) {
                oldAccount.setCurrentBalance(oldAccount.getCurrentBalance().subtract(transaction.getAmount()));
            } else {
                oldAccount.setCurrentBalance(oldAccount.getCurrentBalance().add(transaction.getAmount()));
            }
            accountRepository.save(oldAccount);

            // Update transaction details
            transaction.setAmount(transactionDTO.getAmount());
            transaction.setDescription(transactionDTO.getDescription());
            transaction.setType(TransactionType.valueOf(transactionDTO.getType()));
            // Note: If you want to allow changing account or category, handle here

            // Apply new balance change
            Account account = transaction.getAccount();
            if (transaction.getType() == TransactionType.INCOME) {
                account.setCurrentBalance(account.getCurrentBalance().add(transaction.getAmount()));
            } else {
                account.setCurrentBalance(account.getCurrentBalance().subtract(transaction.getAmount()));
            }
            accountRepository.save(account);

            return convertToDTO(transactionRepository.save(transaction));
        }).orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    @Override
    public void deleteTransaction(Integer id) {
        Transaction transaction = transactionRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        // Revert balance
        Account account = transaction.getAccount();
        if (transaction.getType() == TransactionType.INCOME) {
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
        dto.setCategory(transaction.getCategory());
        dto.setAmount(transaction.getAmount());
        dto.setDescription(transaction.getDescription());
        dto.setType(transaction.getType().name());
        dto.setTransactionDate(transaction.getTransactionDate());
        dto.setCreatedAt(transaction.getCreatedAt());
        return dto;
    }

}

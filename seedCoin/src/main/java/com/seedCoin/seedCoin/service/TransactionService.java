package com.seedCoin.seedCoin.service;

import com.seedCoin.seedCoin.dto.CreateTransactionDTO;
import com.seedCoin.seedCoin.dto.TransactionDTO;
import com.seedCoin.seedCoin.dto.CommonTransactionDTO;

import java.util.List;
import java.util.Optional;

public interface TransactionService {
    List<TransactionDTO> getAllTransactions();

    List<TransactionDTO> getTransactionsByUserId(Integer userId);

    Optional<TransactionDTO> getTransactionById(Integer id);

    TransactionDTO createTransaction(CreateTransactionDTO createTransactionDTO);

    TransactionDTO updateTransaction(Integer id, TransactionDTO transactionDTO);

    void deleteTransaction(Integer id);

    List<com.seedCoin.seedCoin.dto.CommonTransactionDTO> getCommonTransactions(Integer userId, String type);
}

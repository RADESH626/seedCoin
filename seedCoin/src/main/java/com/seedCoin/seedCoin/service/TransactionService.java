package com.seedCoin.seedCoin.service;

import com.seedCoin.seedCoin.dto.CreateTransactionDTO;
import com.seedCoin.seedCoin.dto.TransactionDTO;
import com.seedCoin.seedCoin.dto.CommonTransactionResponseDTO;
import com.seedCoin.seedCoin.dto.CreateCommonTransactionDTO;
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

        List<CommonTransactionDTO> getCommonTransactions(Integer userId, String type);

        // Common Transaction Templates (Presets)
        List<com.seedCoin.seedCoin.dto.CommonTransactionResponseDTO> getAllCommonTransactions(Integer userId);

        com.seedCoin.seedCoin.dto.CommonTransactionResponseDTO createCommonTransaction(
                        CreateCommonTransactionDTO createCommonTransactionDTO);

        com.seedCoin.seedCoin.dto.CommonTransactionResponseDTO updateCommonTransaction(Integer id,
                        CreateCommonTransactionDTO createCommonTransactionDTO);

        void deleteCommonTransaction(Integer id);

        TransactionDTO createTransactionFromCommon(Integer commonId, Integer accountId, java.time.LocalDateTime date);
}

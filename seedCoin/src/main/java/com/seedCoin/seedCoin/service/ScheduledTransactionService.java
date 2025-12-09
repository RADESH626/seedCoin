package com.seedCoin.seedCoin.service;

import com.seedCoin.seedCoin.dto.ScheduledTransactionDTO;
import java.util.List;

public interface ScheduledTransactionService {
    ScheduledTransactionDTO createScheduledTransaction(ScheduledTransactionDTO dto);

    List<ScheduledTransactionDTO> getScheduledTransactionsByUserId(Integer userId);

    ScheduledTransactionDTO updateScheduledTransaction(Integer id, ScheduledTransactionDTO dto);

    void deleteScheduledTransaction(Integer id);

    void processDueTransactions();
}

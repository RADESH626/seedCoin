package com.seedCoin.seedCoin.repository;

import com.seedCoin.seedCoin.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByUserId(Integer userId);

    List<Transaction> findByAccountId(Integer accountId);
}

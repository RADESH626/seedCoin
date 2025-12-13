package com.seedCoin.seedCoin.repository;

import com.seedCoin.seedCoin.model.CommonTransaction;
import com.seedCoin.seedCoin.model.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommonTransactionRepository extends JpaRepository<CommonTransaction, Integer> {
    List<CommonTransaction> findByUserIdAndType(Integer userId, TransactionType type);

    List<CommonTransaction> findByUserId(Integer userId);
}

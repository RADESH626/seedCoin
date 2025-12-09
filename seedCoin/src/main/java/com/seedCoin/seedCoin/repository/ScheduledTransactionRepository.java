package com.seedCoin.seedCoin.repository;

import com.seedCoin.seedCoin.model.ScheduledTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScheduledTransactionRepository extends JpaRepository<ScheduledTransaction, Integer> {
    List<ScheduledTransaction> findByNextExecutionDateBeforeAndIsActiveTrue(LocalDateTime date);

    List<ScheduledTransaction> findByUserIdAndIsActiveTrue(Integer userId);
}

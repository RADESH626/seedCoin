package com.seedCoin.seedCoin.repository;

import com.seedCoin.seedCoin.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    List<Account> findByUserId(Integer userId);

    @org.springframework.data.jpa.repository.Query("SELECT SUM(a.currentBalance) FROM Account a WHERE a.user.id = :userId AND a.isActive = true")
    java.math.BigDecimal sumCurrentBalanceByUserId(
            @org.springframework.data.repository.query.Param("userId") Integer userId);
}

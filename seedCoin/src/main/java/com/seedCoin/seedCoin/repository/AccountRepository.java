package com.seedCoin.seedCoin.repository;

import com.seedCoin.seedCoin.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    List<Account> findByUserId(Integer userId);

    List<Account> findByUserIdAndIsActiveTrue(Integer userId);

    BigDecimal sumCurrentBalanceByUserId(Integer userId);

}

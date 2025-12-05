package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.DashboardDTO;
import com.seedCoin.seedCoin.model.TransactionType;
import com.seedCoin.seedCoin.repository.AccountRepository;
import com.seedCoin.seedCoin.repository.TransactionRepository;
import com.seedCoin.seedCoin.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public DashboardDTO getDashboardSummary(Integer userId) {
        DashboardDTO dashboardDTO = new DashboardDTO();

        // 1. Total Consolidated Balance
        BigDecimal totalBalance = accountRepository.sumCurrentBalanceByUserId(userId);
        dashboardDTO.setTotalBalance(totalBalance != null ? totalBalance : BigDecimal.ZERO);

        // 2. Monthly Stats
        LocalDateTime startOfMonth = LocalDateTime.of(LocalDate.now().with(TemporalAdjusters.firstDayOfMonth()),
                LocalTime.MIN);
        LocalDateTime endOfMonth = LocalDateTime.of(LocalDate.now().with(TemporalAdjusters.lastDayOfMonth()),
                LocalTime.MAX);

        // Monthly Income
        BigDecimal monthlyIncome = transactionRepository.sumAmountByUserIdAndTypeAndDateBetween(
                userId, TransactionType.INCOME, startOfMonth, endOfMonth);
        dashboardDTO.setMonthlyIncome(monthlyIncome != null ? monthlyIncome : BigDecimal.ZERO);

        // Monthly Expense
        BigDecimal monthlyExpense = transactionRepository.sumAmountByUserIdAndTypeAndDateBetween(
                userId, TransactionType.EXPENSE, startOfMonth, endOfMonth);
        dashboardDTO.setMonthlyExpense(monthlyExpense != null ? monthlyExpense : BigDecimal.ZERO);

        return dashboardDTO;
    }
}

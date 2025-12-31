package com.seedCoin.seedCoin.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DashboardDTO {
    private BigDecimal totalBalance;
    private BigDecimal monthlyIncome;
    private BigDecimal monthlyExpense;
}

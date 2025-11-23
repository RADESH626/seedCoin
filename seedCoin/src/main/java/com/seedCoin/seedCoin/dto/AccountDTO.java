package com.seedCoin.seedCoin.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AccountDTO {
    private Integer id;
    private Integer userId;
    private String name;
    private BigDecimal currentBalance;
    private Boolean isActive;
}

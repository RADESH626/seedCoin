package com.seedCoin.seedCoin.dto;

import com.seedCoin.seedCoin.model.enums.AccountTypes;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AccountDTO {
    private Integer id;
    private Integer userId;
    private String name;
    private AccountTypes accountType;
    private BigDecimal currentBalance;
    private Boolean isActive;
}

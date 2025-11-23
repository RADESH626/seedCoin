package com.seedCoin.seedCoin.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateAccountDTO {
    private Integer userId;
    private String name;
    private BigDecimal currentBalance;
}

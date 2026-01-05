package com.seedCoin.seedCoin.dto.createDTO;

import lombok.Data;

import java.math.BigDecimal;

import com.seedCoin.seedCoin.model.enums.AccountTypes;

@Data
public class CreateAccountDTO {

    private Integer userId;
    private String name;
    private AccountTypes accountType;
    private BigDecimal initialBalance;

}

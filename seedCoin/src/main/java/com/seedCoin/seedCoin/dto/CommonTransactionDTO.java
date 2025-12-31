package com.seedCoin.seedCoin.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CommonTransactionDTO {
    public CommonTransactionDTO() {
    }

    private Integer categoryId;
    private String categoryName;
    private String categoryIcon;
    private String description;
    private Long usageCount;
    private BigDecimal amount;

}

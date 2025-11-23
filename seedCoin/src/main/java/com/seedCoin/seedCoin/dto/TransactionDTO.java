package com.seedCoin.seedCoin.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TransactionDTO {
    private Integer id;
    private Integer userId;
    private Integer accountId;
    private Integer categoryId;
    private BigDecimal amount;
    private String type;
    private String description;
    private LocalDateTime transactionDate;
    private LocalDateTime createdAt;
}

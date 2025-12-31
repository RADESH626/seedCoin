package com.seedCoin.seedCoin.dto.createDTO;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.seedCoin.seedCoin.model.enums.TransactionType;

@Data
public class CreateTransactionDTO {

    private Integer userId;
    private Integer accountId;
    private String category;
    private BigDecimal amount;
    private TransactionType type;
    private String description;
    private LocalDateTime transactionDate;

}

package com.seedCoin.seedCoin.dto;

import com.seedCoin.seedCoin.model.enums.Frequency;
import com.seedCoin.seedCoin.model.enums.TransactionType;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ScheduledTransactionDTO {
    private Integer id;
    private Integer userId;
    private Integer accountId;
    private String accountName;
    private String category;
    private BigDecimal amount;
    private String description;
    private LocalDateTime nextExecutionDate;
    private Frequency frequency;
    private TransactionType type;
    private Boolean isActive;

}

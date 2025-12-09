package com.seedCoin.seedCoin.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CreateTransactionDTO {
    @jakarta.validation.constraints.NotNull(message = "User ID is required")
    private Integer userId;

    @jakarta.validation.constraints.NotNull(message = "Account ID is required")
    private Integer accountId;

    @jakarta.validation.constraints.NotNull(message = "Category ID is required")
    private Integer categoryId;

    @jakarta.validation.constraints.NotNull(message = "Amount is required")
    @jakarta.validation.constraints.Positive(message = "Amount must be positive")
    private BigDecimal amount;

    @jakarta.validation.constraints.NotNull(message = "Type is required")
    private String type;

    private String description;

    @jakarta.validation.constraints.NotNull(message = "Date is required")
    private LocalDateTime transactionDate;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }
}

package com.seedCoin.seedCoin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommonTransactionDTO {
    private Integer categoryId;
    private String categoryName;
    private String categoryIcon;
    private String description;
    private Long usageCount;
    private java.math.BigDecimal amount;

    public CommonTransactionDTO() {
    }

    public CommonTransactionDTO(Number categoryId, String categoryName, String categoryIcon, String description,
            Number usageCount, Number amount) {
        this.categoryId = categoryId != null ? categoryId.intValue() : null;
        this.categoryName = categoryName;
        this.categoryIcon = categoryIcon;
        this.description = description;
        this.usageCount = usageCount != null ? usageCount.longValue() : 0L;
        this.amount = amount != null ? new java.math.BigDecimal(amount.toString()) : java.math.BigDecimal.ZERO;
    }

    public CommonTransactionDTO(Integer categoryId, String categoryName, String categoryIcon, String description,
            Long usageCount, java.math.BigDecimal amount) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryIcon = categoryIcon;
        this.description = description;
        this.usageCount = usageCount;
        this.amount = amount;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryIcon(String categoryIcon) {
        this.categoryIcon = categoryIcon;
    }

    public String getCategoryIcon() {
        return categoryIcon;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setUsageCount(Long usageCount) {
        this.usageCount = usageCount;
    }

    public Long getUsageCount() {
        return usageCount;
    }

}

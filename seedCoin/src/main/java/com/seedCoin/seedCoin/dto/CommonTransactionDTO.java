package com.seedCoin.seedCoin.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CommonTransactionDTO {
    private Integer id;
    private String name;
    private BigDecimal amount;
    private String type;
    private CategoryDTO category;

    @Data
    public static class CategoryDTO {
        private Integer id;
        private String name;
        private String icon;
        private String color;
        private String type;
    }
}

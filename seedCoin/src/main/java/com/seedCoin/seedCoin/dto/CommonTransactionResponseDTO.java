package com.seedCoin.seedCoin.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CommonTransactionResponseDTO {
    private Integer id;
    private CategoryDTO category;
    private String name;
    private BigDecimal amount;
    private String type;

    @Data
    public static class CategoryDTO {
        private Integer id;
        private String name;
        private String icon;
        private String type;
        // Add other category fields if needed by frontend, e.g. code/group
    }
}

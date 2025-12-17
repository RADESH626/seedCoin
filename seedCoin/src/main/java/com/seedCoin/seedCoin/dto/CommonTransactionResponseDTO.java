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

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}

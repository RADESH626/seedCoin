package com.seedCoin.seedCoin.dto.createDTO;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CreateCommonTransactionDTO {

    private Integer userId;
    private Integer categoryId;
    private String name;
    private BigDecimal amount;
    private String transactionType;

}

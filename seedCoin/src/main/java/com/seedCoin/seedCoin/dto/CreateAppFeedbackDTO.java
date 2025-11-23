package com.seedCoin.seedCoin.dto;

import lombok.Data;

@Data
public class CreateAppFeedbackDTO {
    private Integer userId;
    private Integer rating;
    private String type;
    private String comment;
}

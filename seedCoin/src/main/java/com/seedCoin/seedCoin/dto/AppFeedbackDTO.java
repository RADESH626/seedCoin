package com.seedCoin.seedCoin.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppFeedbackDTO {
    private Integer id;
    private Integer userId;
    private Integer rating;
    private String type;
    private String comment;
    private String status;
    private LocalDateTime createdAt;
}

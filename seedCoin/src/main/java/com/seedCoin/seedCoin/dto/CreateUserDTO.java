package com.seedCoin.seedCoin.dto;

import lombok.Data;

@Data
public class CreateUserDTO {
    private String name;
    private String lastName;
    private String email;
    private String password;
    private Integer identificationTypeId;
    private String identificationNumber;
}

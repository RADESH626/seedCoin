package com.seedCoin.seedCoin.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Integer id;
    private String name;
    private String lastName;
    private String email;
    private String identificationNumber;
    private String roleName;
    private Boolean isActive;
}

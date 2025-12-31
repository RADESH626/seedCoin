package com.seedCoin.seedCoin.dto;

import lombok.Data;

@Data
public class UserDTO {

    private Integer id;
    private String name;
    private String lastName;
    private String email;
    private Boolean isActive;

}

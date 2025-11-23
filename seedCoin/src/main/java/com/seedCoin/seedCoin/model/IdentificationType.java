package com.seedCoin.seedCoin.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "identification_type")
public class IdentificationType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "identification_type_id")
    private Integer id;

    @Column(nullable = false, length = 50)
    private String name;
}

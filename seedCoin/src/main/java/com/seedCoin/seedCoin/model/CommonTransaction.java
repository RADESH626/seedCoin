package com.seedCoin.seedCoin.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import com.seedCoin.seedCoin.model.enums.TransactionType;

@Data
@Entity
@Table(name = "commons_transactions")
public class CommonTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "category", nullable = false)
    private Integer category;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(length = 255)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TransactionType type;

}

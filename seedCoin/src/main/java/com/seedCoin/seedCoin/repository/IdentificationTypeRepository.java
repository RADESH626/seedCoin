package com.seedCoin.seedCoin.repository;

import com.seedCoin.seedCoin.model.IdentificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdentificationTypeRepository extends JpaRepository<IdentificationType, Integer> {
}

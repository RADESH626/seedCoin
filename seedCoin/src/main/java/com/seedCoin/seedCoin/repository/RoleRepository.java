package com.seedCoin.seedCoin.repository;

import com.seedCoin.seedCoin.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    java.util.Optional<Role> findByName(String name);
}

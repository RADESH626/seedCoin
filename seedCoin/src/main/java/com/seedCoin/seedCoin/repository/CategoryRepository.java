package com.seedCoin.seedCoin.repository;

import com.seedCoin.seedCoin.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByCategoryGroupAndIsActiveTrue(String categoryGroup);

    List<Category> findByCategoryGroup(String categoryGroup);
}

package com.seedCoin.seedCoin.service;

import com.seedCoin.seedCoin.dto.CategoryDTO;
import com.seedCoin.seedCoin.dto.CreateCategoryDTO;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<CategoryDTO> getAllCategories();

    List<CategoryDTO> getCategoriesByGroup(String group);

    Optional<CategoryDTO> getCategoryById(Integer id);

    CategoryDTO createCategory(CreateCategoryDTO createCategoryDTO);

    CategoryDTO updateCategory(Integer id, CategoryDTO categoryDTO);

    void deleteCategory(Integer id);
}

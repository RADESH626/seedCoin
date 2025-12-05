package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.CategoryDTO;
import com.seedCoin.seedCoin.dto.CreateCategoryDTO;
import com.seedCoin.seedCoin.model.Category;
import com.seedCoin.seedCoin.repository.CategoryRepository;
import com.seedCoin.seedCoin.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CategoryDTO> getCategoriesByGroup(String groupVal) {

        // TODO: SOLUCIONAR EL PROBLEMA DE LA CONSULTA
        return categoryRepository.findByCategoryGroupAndIsActiveTrue(groupVal).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<CategoryDTO> getCategoryById(Integer id) {
        return categoryRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public CategoryDTO createCategory(CreateCategoryDTO createCategoryDTO) {
        Category category = new Category();
        category.setName(createCategoryDTO.getName());
        category.setIcon(createCategoryDTO.getIcon());

        if (createCategoryDTO.getType() != null) {
            category.setType(com.seedCoin.seedCoin.model.TransactionType.valueOf(createCategoryDTO.getType()));
        }

        // Auto-generate code? Or use default if not provided?
        // For custom categories, we generate a code or leave it?
        // Design says simple "CUSTOM_..." or so.
        // For now, let's set a simple code based on name if not handled elsewhere
        if (createCategoryDTO.getCategoryGroup() != null) {
            category.setCategoryGroup(createCategoryDTO.getCategoryGroup());
        } else {
            category.setCategoryGroup("TRANSACTION"); // Default?
        }

        // Generate a random code for custom categories
        category.setCode("CUST_" + System.currentTimeMillis());
        category.setIsSystem(false);
        category.setIsActive(true);

        Category savedCategory = categoryRepository.save(category);
        return convertToDTO(savedCategory);
    }

    @Override
    public CategoryDTO updateCategory(Integer id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(categoryDTO.getName());
        category.setIcon(categoryDTO.getIcon());
        category.setType(com.seedCoin.seedCoin.model.TransactionType.valueOf(categoryDTO.getType()));

        Category updatedCategory = categoryRepository.save(category);
        return convertToDTO(updatedCategory);
    }

    @Override
    public void deleteCategory(Integer id) {
        categoryRepository.deleteById(id);
    }

    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setIcon(category.getIcon());
        dto.setType(category.getType() != null ? category.getType().name() : null);
        dto.setCode(category.getCode());
        dto.setCategoryGroup(category.getCategoryGroup());
        dto.setIsSystem(category.getIsSystem());
        dto.setIsActive(category.getIsActive());
        return dto;
    }
}

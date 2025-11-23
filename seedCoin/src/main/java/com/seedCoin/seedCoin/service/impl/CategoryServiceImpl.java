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
    public Optional<CategoryDTO> getCategoryById(Integer id) {
        return categoryRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public CategoryDTO createCategory(CreateCategoryDTO createCategoryDTO) {
        Category category = new Category();
        category.setName(createCategoryDTO.getName());
        category.setIcon(createCategoryDTO.getIcon());
        category.setType(createCategoryDTO.getType());

        Category savedCategory = categoryRepository.save(category);
        return convertToDTO(savedCategory);
    }

    @Override
    public CategoryDTO updateCategory(Integer id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(categoryDTO.getName());
        category.setIcon(categoryDTO.getIcon());
        category.setType(categoryDTO.getType());

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
        dto.setType(category.getType());
        return dto;
    }
}

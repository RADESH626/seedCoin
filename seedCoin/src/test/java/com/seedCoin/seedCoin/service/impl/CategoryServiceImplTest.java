package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.CategoryDTO;
import com.seedCoin.seedCoin.dto.CreateCategoryDTO;
import com.seedCoin.seedCoin.model.Category;
import com.seedCoin.seedCoin.model.TransactionType;
import com.seedCoin.seedCoin.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceImplTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    private Category category;
    private CreateCategoryDTO createCategoryDTO;

    @BeforeEach
    void setUp() {
        category = new Category();
        category.setId(1);
        category.setName("Food");
        category.setIcon("food-icon");
        category.setType(TransactionType.EXPENSE);
        category.setCategoryGroup("TRANSACTION_TYPE");

        createCategoryDTO = new CreateCategoryDTO();
        createCategoryDTO.setName("Food");
        createCategoryDTO.setIcon("food-icon");
        createCategoryDTO.setType("EXPENSE");
    }

    @Test
    void getAllCategories() {
        when(categoryRepository.findAll()).thenReturn(Arrays.asList(category));

        List<CategoryDTO> result = categoryService.getAllCategories();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(category.getName(), result.get(0).getName());
    }

    @Test
    void getCategoryById() {
        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));

        Optional<CategoryDTO> result = categoryService.getCategoryById(1);

        assertTrue(result.isPresent());
        assertEquals(category.getName(), result.get().getName());
    }

    @Test
    void createCategory() {
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        CategoryDTO result = categoryService.createCategory(createCategoryDTO);

        assertNotNull(result);
        assertEquals(createCategoryDTO.getName(), result.getName());
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    void updateCategory() {
        CategoryDTO updateDTO = new CategoryDTO();
        updateDTO.setName("Updated Food");
        updateDTO.setIcon("new-icon");
        updateDTO.setType("EXPENSE");

        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        CategoryDTO result = categoryService.updateCategory(1, updateDTO);

        assertNotNull(result);
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    void deleteCategory() {
        doNothing().when(categoryRepository).deleteById(1);

        categoryService.deleteCategory(1);

        verify(categoryRepository, times(1)).deleteById(1);
    }
}

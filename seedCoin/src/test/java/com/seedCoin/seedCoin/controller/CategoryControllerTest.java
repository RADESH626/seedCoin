package com.seedCoin.seedCoin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seedCoin.seedCoin.dto.CategoryDTO;
import com.seedCoin.seedCoin.dto.CreateCategoryDTO;
import com.seedCoin.seedCoin.service.CategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Objects;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class CategoryControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    private ObjectMapper objectMapper;
    private CategoryDTO categoryDTO;
    private CreateCategoryDTO createCategoryDTO;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).build();
        objectMapper = new ObjectMapper();

        categoryDTO = new CategoryDTO();
        categoryDTO.setId(1);
        categoryDTO.setName("Food");
        categoryDTO.setIcon("food-icon");
        categoryDTO.setType("EXPENSE");

        createCategoryDTO = new CreateCategoryDTO();
        createCategoryDTO.setName("Food");
        createCategoryDTO.setIcon("food-icon");
        createCategoryDTO.setType("EXPENSE");
    }

    @Test
    void getAllCategories() throws Exception {
        when(categoryService.getAllCategories()).thenReturn(Arrays.asList(categoryDTO));

        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Food"));
    }

    @Test
    void getCategoryById() throws Exception {
        when(categoryService.getCategoryById(1)).thenReturn(Optional.of(categoryDTO));

        mockMvc.perform(get("/api/categories/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Food"));
    }

    @Test
    void createCategory() throws Exception {
        when(categoryService.createCategory(any(CreateCategoryDTO.class))).thenReturn(categoryDTO);

        mockMvc.perform(post("/api/categories")
                .contentType(Objects.requireNonNull(MediaType.APPLICATION_JSON))
                .content(Objects.requireNonNull(objectMapper.writeValueAsString(createCategoryDTO))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Food"));
    }

    @Test
    void updateCategory() throws Exception {
        when(categoryService.updateCategory(eq(1), any(CategoryDTO.class))).thenReturn(categoryDTO);

        mockMvc.perform(put("/api/categories/1")
                .contentType(Objects.requireNonNull(MediaType.APPLICATION_JSON))
                .content(Objects.requireNonNull(objectMapper.writeValueAsString(categoryDTO))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Food"));
    }

    @Test
    void deleteCategory() throws Exception {
        doNothing().when(categoryService).deleteCategory(1);

        mockMvc.perform(delete("/api/categories/1"))
                .andExpect(status().isNoContent());
    }
}

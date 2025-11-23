package com.seedCoin.seedCoin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seedCoin.seedCoin.dto.AppFeedbackDTO;
import com.seedCoin.seedCoin.dto.CreateAppFeedbackDTO;
import com.seedCoin.seedCoin.service.AppFeedbackService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AppFeedbackControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AppFeedbackService appFeedbackService;

    @InjectMocks
    private AppFeedbackController appFeedbackController;

    private ObjectMapper objectMapper;
    private AppFeedbackDTO appFeedbackDTO;
    private CreateAppFeedbackDTO createAppFeedbackDTO;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(appFeedbackController).build();
        objectMapper = new ObjectMapper();

        appFeedbackDTO = new AppFeedbackDTO();
        appFeedbackDTO.setId(1);
        appFeedbackDTO.setRating(5);
        appFeedbackDTO.setType("BUG");
        appFeedbackDTO.setComment("Great app!");
        appFeedbackDTO.setStatus("PENDING");

        createAppFeedbackDTO = new CreateAppFeedbackDTO();
        createAppFeedbackDTO.setUserId(1);
        createAppFeedbackDTO.setRating(5);
        createAppFeedbackDTO.setType("BUG");
        createAppFeedbackDTO.setComment("Great app!");
    }

    @Test
    void getAllAppFeedbacks() throws Exception {
        when(appFeedbackService.getAllAppFeedbacks()).thenReturn(Arrays.asList(appFeedbackDTO));

        mockMvc.perform(get("/api/app-feedback"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].comment").value("Great app!"));
    }

    @Test
    void getAppFeedbackById() throws Exception {
        when(appFeedbackService.getAppFeedbackById(1)).thenReturn(Optional.of(appFeedbackDTO));

        mockMvc.perform(get("/api/app-feedback/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.comment").value("Great app!"));
    }

    @Test
    void createAppFeedback() throws Exception {
        when(appFeedbackService.createAppFeedback(any(CreateAppFeedbackDTO.class))).thenReturn(appFeedbackDTO);

        mockMvc.perform(post("/api/app-feedback")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAppFeedbackDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.comment").value("Great app!"));
    }

    @Test
    void updateAppFeedback() throws Exception {
        when(appFeedbackService.updateAppFeedback(eq(1), any(AppFeedbackDTO.class))).thenReturn(appFeedbackDTO);

        mockMvc.perform(put("/api/app-feedback/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(appFeedbackDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.comment").value("Great app!"));
    }

    @Test
    void deleteAppFeedback() throws Exception {
        doNothing().when(appFeedbackService).deleteAppFeedback(1);

        mockMvc.perform(delete("/api/app-feedback/1"))
                .andExpect(status().isNoContent());
    }
}

package com.seedCoin.seedCoin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.seedCoin.seedCoin.dto.ScheduledTransactionDTO;
import com.seedCoin.seedCoin.model.Frequency;
import com.seedCoin.seedCoin.model.TransactionType;
import com.seedCoin.seedCoin.service.ScheduledTransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ScheduledTransactionControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ScheduledTransactionService scheduledTransactionService;

    @InjectMocks
    private ScheduledTransactionController scheduledTransactionController;

    private ObjectMapper objectMapper;
    private ScheduledTransactionDTO dto;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(scheduledTransactionController).build();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        dto = new ScheduledTransactionDTO();
        dto.setId(1);
        dto.setUserId(1);
        dto.setAmount(BigDecimal.valueOf(100));
        dto.setDescription("Netflix");
        dto.setFrequency(Frequency.MONTHLY);
        dto.setType(TransactionType.EXPENSE);
        dto.setNextExecutionDate(LocalDateTime.now().plusMonths(1));
    }

    @Test
    void createScheduledTransaction() throws Exception {
        when(scheduledTransactionService.createScheduledTransaction(any(ScheduledTransactionDTO.class)))
                .thenReturn(dto);

        mockMvc.perform(post("/api/scheduled-transactions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Netflix"));
    }

    @Test
    void getScheduledTransactionsByUser() throws Exception {
        when(scheduledTransactionService.getScheduledTransactionsByUserId(1))
                .thenReturn(Collections.singletonList(dto));

        mockMvc.perform(get("/api/scheduled-transactions/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].description").value("Netflix"));
    }

    @Test
    void manualProcess() throws Exception {
        doNothing().when(scheduledTransactionService).processDueTransactions();

        mockMvc.perform(post("/api/scheduled-transactions/process"))
                .andExpect(status().isOk());
    }
}

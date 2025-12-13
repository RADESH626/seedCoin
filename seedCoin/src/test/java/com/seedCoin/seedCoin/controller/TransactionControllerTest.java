package com.seedCoin.seedCoin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.seedCoin.seedCoin.dto.CreateTransactionDTO;
import com.seedCoin.seedCoin.dto.TransactionDTO;
import com.seedCoin.seedCoin.service.TransactionService;
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
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class TransactionControllerTest {

    private MockMvc mockMvc;

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    private ObjectMapper objectMapper;
    private TransactionDTO transactionDTO;
    private CreateTransactionDTO createTransactionDTO;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(transactionController).build();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        transactionDTO = new TransactionDTO();
        transactionDTO.setId(1);
        transactionDTO.setAmount(BigDecimal.valueOf(100));
        transactionDTO.setType("EXPENSE");
        transactionDTO.setDescription("Lunch");
        transactionDTO.setTransactionDate(LocalDateTime.now());

        createTransactionDTO = new CreateTransactionDTO();
        createTransactionDTO.setUserId(1);
        createTransactionDTO.setAccountId(1);
        createTransactionDTO.setCategoryId(1);
        createTransactionDTO.setAmount(BigDecimal.valueOf(100));
        createTransactionDTO.setType("EXPENSE");
        createTransactionDTO.setDescription("Lunch");
        createTransactionDTO.setTransactionDate(LocalDateTime.now());
    }

    @Test
    void getAllTransactions() throws Exception {
        when(transactionService.getAllTransactions()).thenReturn(Arrays.asList(transactionDTO));

        mockMvc.perform(get("/api/transactions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].description").value("Lunch"));
    }

    @Test
    void getTransactionById() throws Exception {
        when(transactionService.getTransactionById(1)).thenReturn(Optional.of(transactionDTO));

        mockMvc.perform(get("/api/transactions/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Lunch"));
    }

    @Test
    void createTransaction() throws Exception {
        when(transactionService.createTransaction(any(CreateTransactionDTO.class))).thenReturn(transactionDTO);

        mockMvc.perform(post("/api/transactions")
                .contentType(Objects.requireNonNull(MediaType.APPLICATION_JSON))
                .content(Objects.requireNonNull(objectMapper.writeValueAsString(createTransactionDTO))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.description").value("Lunch"));
    }

    @Test
    void updateTransaction() throws Exception {
        when(transactionService.updateTransaction(eq(1), any(TransactionDTO.class))).thenReturn(transactionDTO);

        mockMvc.perform(put("/api/transactions/1")
                .contentType(Objects.requireNonNull(MediaType.APPLICATION_JSON))
                .content(Objects.requireNonNull(objectMapper.writeValueAsString(transactionDTO))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Lunch"));
    }

    @Test
    void deleteTransaction() throws Exception {
        doNothing().when(transactionService).deleteTransaction(1);

        mockMvc.perform(delete("/api/transactions/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void getCommonTransactions() throws Exception {
        com.seedCoin.seedCoin.dto.CommonTransactionDTO commonDTO = new com.seedCoin.seedCoin.dto.CommonTransactionDTO();
        commonDTO.setDescription("Lunch");
        commonDTO.setCategoryName("Food");

        when(transactionService.getCommonTransactions(1, "EXPENSE")).thenReturn(Arrays.asList(commonDTO));

        mockMvc.perform(get("/api/transactions/common")
                .param("userId", "1")
                .param("type", "EXPENSE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].description").value("Lunch"));
    }

    @Test
    void createTransaction_NegativeAmount_ShouldReturnBadRequest() throws Exception {
        createTransactionDTO.setAmount(BigDecimal.valueOf(-100));

        mockMvc.perform(post("/api/transactions")
                .contentType(Objects.requireNonNull(MediaType.APPLICATION_JSON))
                .content(Objects.requireNonNull(objectMapper.writeValueAsString(createTransactionDTO))))
                .andExpect(status().isBadRequest());
    }
}

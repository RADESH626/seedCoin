package com.seedCoin.seedCoin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seedCoin.seedCoin.dto.AccountDTO;
import com.seedCoin.seedCoin.dto.CreateAccountDTO;
import com.seedCoin.seedCoin.service.AccountService;
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
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AccountControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AccountService accountService;

    @InjectMocks
    private AccountController accountController;

    private ObjectMapper objectMapper;
    private AccountDTO accountDTO;
    private CreateAccountDTO createAccountDTO;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(accountController).build();
        objectMapper = new ObjectMapper();

        accountDTO = new AccountDTO();
        accountDTO.setId(1);
        accountDTO.setName("Savings");
        accountDTO.setCurrentBalance(BigDecimal.valueOf(1000));
        accountDTO.setIsActive(true);
        accountDTO.setAccountTypeId(1);
        accountDTO.setAccountType("Bank");

        createAccountDTO = new CreateAccountDTO();
        createAccountDTO.setUserId(1);
        createAccountDTO.setName("Savings");
        createAccountDTO.setInitialBalance(BigDecimal.valueOf(1000));
        createAccountDTO.setAccountTypeId(1);
    }

    @Test
    void getAllAccounts() throws Exception {
        when(accountService.getAllAccounts()).thenReturn(Arrays.asList(accountDTO));

        mockMvc.perform(get("/api/accounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Savings"));
    }

    @Test
    void getAccountById() throws Exception {
        when(accountService.getAccountById(1)).thenReturn(Optional.of(accountDTO));

        mockMvc.perform(get("/api/accounts/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Savings"));
    }

    @Test
    void createAccount() throws Exception {
        when(accountService.createAccount(any(CreateAccountDTO.class))).thenReturn(accountDTO);

        mockMvc.perform(post("/api/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createAccountDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Savings"));
    }

    @Test
    void updateAccount() throws Exception {
        when(accountService.updateAccount(eq(1), any(AccountDTO.class))).thenReturn(accountDTO);

        mockMvc.perform(put("/api/accounts/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(accountDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Savings"));
    }

    @Test
    void deleteAccount() throws Exception {
        doNothing().when(accountService).deleteAccount(1);

        mockMvc.perform(delete("/api/accounts/1"))
                .andExpect(status().isNoContent());
    }
}

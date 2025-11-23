package com.seedCoin.seedCoin.controller;

import com.seedCoin.seedCoin.dto.AccountDTO;
import com.seedCoin.seedCoin.dto.CreateAccountDTO;
import com.seedCoin.seedCoin.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping
    public ResponseEntity<List<AccountDTO>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDTO> getAccountById(@PathVariable Integer id) {
        return accountService.getAccountById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AccountDTO> createAccount(@RequestBody CreateAccountDTO createAccountDTO) {
        return new ResponseEntity<>(accountService.createAccount(createAccountDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountDTO> updateAccount(@PathVariable Integer id, @RequestBody AccountDTO accountDTO) {
        try {
            return ResponseEntity.ok(accountService.updateAccount(id, accountDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Integer id) {
        try {
            accountService.deleteAccount(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

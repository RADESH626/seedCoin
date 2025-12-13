package com.seedCoin.seedCoin.controller;

import com.seedCoin.seedCoin.dto.CreateTransactionDTO;
import com.seedCoin.seedCoin.dto.TransactionDTO;
import com.seedCoin.seedCoin.dto.CommonTransactionResponseDTO;
import com.seedCoin.seedCoin.dto.CreateCommonTransactionDTO;
import com.seedCoin.seedCoin.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getAllTransactions(@RequestParam(required = false) Integer userId) {
        if (userId != null) {
            return ResponseEntity.ok(transactionService.getTransactionsByUserId(userId));
        }
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @GetMapping("/common")
    public ResponseEntity<?> getCommonTransactions(
            @RequestParam Integer userId,
            @RequestParam(defaultValue = "EXPENSE") String type) {
        return ResponseEntity.ok(transactionService.getCommonTransactions(userId, type));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable Integer id) {
        return transactionService.getTransactionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction(
            @jakarta.validation.Valid @RequestBody CreateTransactionDTO createTransactionDTO) {
        return new ResponseEntity<>(transactionService.createTransaction(createTransactionDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(@PathVariable Integer id,
            @RequestBody TransactionDTO transactionDTO) {
        try {
            return ResponseEntity.ok(transactionService.updateTransaction(id, transactionDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Integer id) {
        try {
            transactionService.deleteTransaction(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // --- Common Transaction Presets ---

    @GetMapping("/common-presets")
    public ResponseEntity<List<CommonTransactionResponseDTO>> getAllCommonTransactions(
            @RequestParam Integer userId) {
        return ResponseEntity.ok(transactionService.getAllCommonTransactions(userId));
    }

    @PostMapping("/common-presets")
    public ResponseEntity<CommonTransactionResponseDTO> createCommonTransaction(
            @RequestBody CreateCommonTransactionDTO createCommonTransactionDTO) {
        return ResponseEntity.ok(transactionService.createCommonTransaction(createCommonTransactionDTO));
    }

    @PutMapping("/common-presets/{id}")
    public ResponseEntity<CommonTransactionResponseDTO> updateCommonTransaction(
            @PathVariable Integer id,
            @RequestBody CreateCommonTransactionDTO createCommonTransactionDTO) {
        return ResponseEntity.ok(transactionService.updateCommonTransaction(id, createCommonTransactionDTO));
    }

    @DeleteMapping("/common-presets/{id}")
    public ResponseEntity<Void> deleteCommonTransaction(@PathVariable Integer id) {
        transactionService.deleteCommonTransaction(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/from-common")
    public ResponseEntity<TransactionDTO> createTransactionFromCommon(
            @RequestBody com.seedCoin.seedCoin.dto.SeedTransactionDTO seedDto) {
        return ResponseEntity.ok(transactionService.createTransactionFromCommon(
                seedDto.getCommonId(),
                seedDto.getAccountId(),
                java.time.LocalDateTime.parse(seedDto.getTransactionDate())));
    }
}

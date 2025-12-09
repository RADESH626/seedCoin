package com.seedCoin.seedCoin.controller;

import com.seedCoin.seedCoin.dto.ScheduledTransactionDTO;
import com.seedCoin.seedCoin.service.ScheduledTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scheduled-transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class ScheduledTransactionController {

    @Autowired
    private ScheduledTransactionService scheduledTransactionService;

    @PostMapping
    public ResponseEntity<ScheduledTransactionDTO> createScheduledTransaction(
            @RequestBody ScheduledTransactionDTO dto) {
        return ResponseEntity.ok(scheduledTransactionService.createScheduledTransaction(dto));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ScheduledTransactionDTO>> getScheduledTransactionsByUserId(
            @PathVariable Integer userId) {
        return ResponseEntity.ok(scheduledTransactionService.getScheduledTransactionsByUserId(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduledTransactionDTO> updateScheduledTransaction(@PathVariable Integer id,
            @RequestBody ScheduledTransactionDTO dto) {
        return ResponseEntity.ok(scheduledTransactionService.updateScheduledTransaction(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScheduledTransaction(@PathVariable Integer id) {
        scheduledTransactionService.deleteScheduledTransaction(id);
        return ResponseEntity.noContent().build();
    }

    // Test endpoint to trigger processing manually
    @PostMapping("/process")
    public ResponseEntity<Void> processDueTransactions() {
        scheduledTransactionService.processDueTransactions();
        return ResponseEntity.ok().build();
    }
}

package com.seedCoin.seedCoin.controller;

import com.seedCoin.seedCoin.dto.AppFeedbackDTO;
import com.seedCoin.seedCoin.dto.CreateAppFeedbackDTO;
import com.seedCoin.seedCoin.service.AppFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/app-feedback")
public class AppFeedbackController {

    @Autowired
    private AppFeedbackService appFeedbackService;

    @GetMapping
    public ResponseEntity<List<AppFeedbackDTO>> getAllAppFeedbacks() {
        return ResponseEntity.ok(appFeedbackService.getAllAppFeedbacks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppFeedbackDTO> getAppFeedbackById(@PathVariable Integer id) {
        return appFeedbackService.getAppFeedbackById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AppFeedbackDTO> createAppFeedback(@RequestBody CreateAppFeedbackDTO createAppFeedbackDTO) {
        return new ResponseEntity<>(appFeedbackService.createAppFeedback(createAppFeedbackDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppFeedbackDTO> updateAppFeedback(@PathVariable Integer id,
            @RequestBody AppFeedbackDTO appFeedbackDTO) {
        try {
            return ResponseEntity.ok(appFeedbackService.updateAppFeedback(id, appFeedbackDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppFeedback(@PathVariable Integer id) {
        try {
            appFeedbackService.deleteAppFeedback(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

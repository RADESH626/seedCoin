package com.seedCoin.seedCoin.controller;

import com.seedCoin.seedCoin.dto.DashboardDTO;
import com.seedCoin.seedCoin.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*") // Allow requests from Next.js frontend
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardDTO> getDashboardSummary(@RequestParam("userId") Integer userId) {
        DashboardDTO dashboardSummary = dashboardService.getDashboardSummary(userId);
        return ResponseEntity.ok(dashboardSummary);
    }
}

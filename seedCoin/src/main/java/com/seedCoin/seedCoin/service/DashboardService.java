package com.seedCoin.seedCoin.service;

import com.seedCoin.seedCoin.dto.DashboardDTO;

public interface DashboardService {
    DashboardDTO getDashboardSummary(Integer userId);
}

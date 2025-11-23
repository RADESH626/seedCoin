package com.seedCoin.seedCoin.service;

import com.seedCoin.seedCoin.dto.AppFeedbackDTO;
import com.seedCoin.seedCoin.dto.CreateAppFeedbackDTO;

import java.util.List;
import java.util.Optional;

public interface AppFeedbackService {
    List<AppFeedbackDTO> getAllAppFeedbacks();

    Optional<AppFeedbackDTO> getAppFeedbackById(Integer id);

    AppFeedbackDTO createAppFeedback(CreateAppFeedbackDTO createAppFeedbackDTO);

    AppFeedbackDTO updateAppFeedback(Integer id, AppFeedbackDTO appFeedbackDTO);

    void deleteAppFeedback(Integer id);
}

package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.AppFeedbackDTO;
import com.seedCoin.seedCoin.dto.CreateAppFeedbackDTO;
import com.seedCoin.seedCoin.model.AppFeedback;
import com.seedCoin.seedCoin.model.User;
import com.seedCoin.seedCoin.repository.AppFeedbackRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import com.seedCoin.seedCoin.service.AppFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppFeedbackServiceImpl implements AppFeedbackService {

    @Autowired
    private AppFeedbackRepository appFeedbackRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<AppFeedbackDTO> getAllAppFeedbacks() {
        return appFeedbackRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<AppFeedbackDTO> getAppFeedbackById(Integer id) {
        return appFeedbackRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public AppFeedbackDTO createAppFeedback(CreateAppFeedbackDTO createAppFeedbackDTO) {
        AppFeedback appFeedback = new AppFeedback();
        appFeedback.setRating(createAppFeedbackDTO.getRating());
        appFeedback.setType(createAppFeedbackDTO.getType());
        appFeedback.setComment(createAppFeedbackDTO.getComment());
        appFeedback.setStatus("PENDING");

        User user = userRepository.findById(createAppFeedbackDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        appFeedback.setUser(user);

        AppFeedback savedAppFeedback = appFeedbackRepository.save(appFeedback);
        return convertToDTO(savedAppFeedback);
    }

    @Override
    public AppFeedbackDTO updateAppFeedback(Integer id, AppFeedbackDTO appFeedbackDTO) {
        AppFeedback appFeedback = appFeedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AppFeedback not found"));

        appFeedback.setRating(appFeedbackDTO.getRating());
        appFeedback.setType(appFeedbackDTO.getType());
        appFeedback.setComment(appFeedbackDTO.getComment());
        appFeedback.setStatus(appFeedbackDTO.getStatus());

        AppFeedback updatedAppFeedback = appFeedbackRepository.save(appFeedback);
        return convertToDTO(updatedAppFeedback);
    }

    @Override
    public void deleteAppFeedback(Integer id) {
        appFeedbackRepository.deleteById(id);
    }

    private AppFeedbackDTO convertToDTO(AppFeedback appFeedback) {
        AppFeedbackDTO dto = new AppFeedbackDTO();
        dto.setId(appFeedback.getId());
        dto.setUserId(appFeedback.getUser().getId());
        dto.setRating(appFeedback.getRating());
        dto.setType(appFeedback.getType());
        dto.setComment(appFeedback.getComment());
        dto.setStatus(appFeedback.getStatus());
        dto.setCreatedAt(appFeedback.getCreatedAt());
        return dto;
    }
}

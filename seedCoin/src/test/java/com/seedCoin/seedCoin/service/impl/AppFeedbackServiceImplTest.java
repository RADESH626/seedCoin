package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.AppFeedbackDTO;
import com.seedCoin.seedCoin.dto.CreateAppFeedbackDTO;
import com.seedCoin.seedCoin.model.AppFeedback;
import com.seedCoin.seedCoin.model.User;
import com.seedCoin.seedCoin.repository.AppFeedbackRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AppFeedbackServiceImplTest {

    @Mock
    private AppFeedbackRepository appFeedbackRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AppFeedbackServiceImpl appFeedbackService;

    private User user;
    private AppFeedback appFeedback;
    private CreateAppFeedbackDTO createAppFeedbackDTO;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);
        user.setName("John");

        appFeedback = new AppFeedback();
        appFeedback.setId(1);
        appFeedback.setUser(user);
        appFeedback.setRating(5);
        appFeedback.setType("BUG");
        appFeedback.setComment("Great app!");
        appFeedback.setStatus("PENDING");

        createAppFeedbackDTO = new CreateAppFeedbackDTO();
        createAppFeedbackDTO.setUserId(1);
        createAppFeedbackDTO.setRating(5);
        createAppFeedbackDTO.setType("BUG");
        createAppFeedbackDTO.setComment("Great app!");
    }

    @Test
    void getAllAppFeedbacks() {
        when(appFeedbackRepository.findAll()).thenReturn(Arrays.asList(appFeedback));

        List<AppFeedbackDTO> result = appFeedbackService.getAllAppFeedbacks();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(appFeedback.getComment(), result.get(0).getComment());
    }

    @Test
    void getAppFeedbackById() {
        when(appFeedbackRepository.findById(1)).thenReturn(Optional.of(appFeedback));

        Optional<AppFeedbackDTO> result = appFeedbackService.getAppFeedbackById(1);

        assertTrue(result.isPresent());
        assertEquals(appFeedback.getComment(), result.get().getComment());
    }

    @Test
    @SuppressWarnings("null")
    void createAppFeedback() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(appFeedbackRepository.save(any(AppFeedback.class))).thenReturn(appFeedback);

        AppFeedbackDTO result = appFeedbackService.createAppFeedback(createAppFeedbackDTO);

        assertNotNull(result);
        assertEquals(createAppFeedbackDTO.getComment(), result.getComment());
        verify(appFeedbackRepository, times(1)).save(any(AppFeedback.class));
    }

    @Test
    @SuppressWarnings("null")
    void updateAppFeedback() {
        AppFeedbackDTO updateDTO = new AppFeedbackDTO();
        updateDTO.setRating(4);
        updateDTO.setType("FEATURE");
        updateDTO.setComment("Updated comment");
        updateDTO.setStatus("RESOLVED");

        when(appFeedbackRepository.findById(1)).thenReturn(Optional.of(appFeedback));
        when(appFeedbackRepository.save(any(AppFeedback.class))).thenReturn(appFeedback);

        AppFeedbackDTO result = appFeedbackService.updateAppFeedback(1, updateDTO);

        assertNotNull(result);
        verify(appFeedbackRepository, times(1)).save(any(AppFeedback.class));
    }

    @Test
    void deleteAppFeedback() {
        doNothing().when(appFeedbackRepository).deleteById(1);

        appFeedbackService.deleteAppFeedback(1);

        verify(appFeedbackRepository, times(1)).deleteById(1);
    }
}

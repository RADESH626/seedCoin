package com.seedCoin.seedCoin.integration;

import com.seedCoin.seedCoin.dto.LoginRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(OutputCaptureExtension.class)
public class LoggingIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testControllerLogging(CapturedOutput output) throws Exception {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password");

        // We don't care if login fails or succeeds, just that the Controller is hit.
        // Assuming /api/auth/login is accessible.
        try {
            mockMvc.perform(post("/api/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(loginRequest)));
        } catch (Exception e) {
            // Ignore exceptions, strict check is on logs
        }

        // Verify logs
        String logs = output.getOut();
        // The aspect logs: USER: [...] | ENTER: AuthController.login() ...
        // We look for parts of it to be resilient.
        assertTrue(logs.contains("ENTER: AuthController.login"), "Should contain entry log. Logs found: " + logs);
        assertTrue(logs.contains("EXIT: AuthController.login"), "Should contain exit log. Logs found: " + logs);
    }
}

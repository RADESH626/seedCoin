package com.seedCoin.seedCoin.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @org.springframework.beans.factory.annotation.Autowired
    private javax.sql.DataSource dataSource;

    @GetMapping
    public Map<String, String> test() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Backend is connected!");

        try (java.sql.Connection connection = dataSource.getConnection()) {
            if (connection.isValid(1)) {
                response.put("database", "Connected successfully to MySQL!");
            } else {
                response.put("database", "Connection invalid!");
            }
        } catch (java.sql.SQLException e) {
            response.put("database", "Error: " + e.getMessage());
        }

        response.put("status", "success");
        return response;
    }
}

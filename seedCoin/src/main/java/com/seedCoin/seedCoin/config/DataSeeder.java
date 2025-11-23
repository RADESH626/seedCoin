package com.seedCoin.seedCoin.config;

import com.seedCoin.seedCoin.model.IdentificationType;
import com.seedCoin.seedCoin.repository.IdentificationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private IdentificationTypeRepository identificationTypeRepository;

    @Override
    public void run(String... args) throws Exception {
        loadIdentificationTypes();
    }

    private void loadIdentificationTypes() {
        if (identificationTypeRepository.count() == 0) {
            List<String> types = Arrays.asList(
                    "Cédula de Ciudadanía",
                    "Tarjeta de Identidad",
                    "Cédula de Extranjería",
                    "Pasaporte");

            for (String typeName : types) {
                IdentificationType type = new IdentificationType();
                type.setName(typeName);
                identificationTypeRepository.save(type);
            }
            System.out.println("Identification Types seeded successfully!");
        }
    }
}

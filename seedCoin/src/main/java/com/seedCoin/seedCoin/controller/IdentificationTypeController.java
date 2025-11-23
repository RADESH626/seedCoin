package com.seedCoin.seedCoin.controller;

import com.seedCoin.seedCoin.dto.IdentificationTypeDTO;
import com.seedCoin.seedCoin.service.IdentificationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/identification-types")
public class IdentificationTypeController {

    @Autowired
    private IdentificationTypeService identificationTypeService;

    @GetMapping
    public ResponseEntity<List<IdentificationTypeDTO>> getAllIdentificationTypes() {
        return ResponseEntity.ok(identificationTypeService.getAllIdentificationTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IdentificationTypeDTO> getIdentificationTypeById(@PathVariable Integer id) {
        return identificationTypeService.getIdentificationTypeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<IdentificationTypeDTO> createIdentificationType(
            @RequestBody IdentificationTypeDTO identificationTypeDTO) {
        return new ResponseEntity<>(identificationTypeService.createIdentificationType(identificationTypeDTO),
                HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IdentificationTypeDTO> updateIdentificationType(@PathVariable Integer id,
            @RequestBody IdentificationTypeDTO identificationTypeDTO) {
        try {
            return ResponseEntity.ok(identificationTypeService.updateIdentificationType(id, identificationTypeDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIdentificationType(@PathVariable Integer id) {
        try {
            identificationTypeService.deleteIdentificationType(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

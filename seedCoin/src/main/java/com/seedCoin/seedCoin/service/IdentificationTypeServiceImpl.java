package com.seedCoin.seedCoin.service;

import com.seedCoin.seedCoin.dto.IdentificationTypeDTO;
import com.seedCoin.seedCoin.model.IdentificationType;
import com.seedCoin.seedCoin.repository.IdentificationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IdentificationTypeServiceImpl implements IdentificationTypeService {

    @Autowired
    private IdentificationTypeRepository identificationTypeRepository;

    @Override
    public List<IdentificationTypeDTO> getAllIdentificationTypes() {
        return identificationTypeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<IdentificationTypeDTO> getIdentificationTypeById(Integer id) {
        return identificationTypeRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public IdentificationTypeDTO createIdentificationType(IdentificationTypeDTO identificationTypeDTO) {
        IdentificationType type = new IdentificationType();
        type.setName(identificationTypeDTO.getName());
        IdentificationType savedType = identificationTypeRepository.save(type);
        return convertToDTO(savedType);
    }

    @Override
    public IdentificationTypeDTO updateIdentificationType(Integer id, IdentificationTypeDTO identificationTypeDTO) {
        IdentificationType type = identificationTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Identification Type not found"));
        type.setName(identificationTypeDTO.getName());
        IdentificationType updatedType = identificationTypeRepository.save(type);
        return convertToDTO(updatedType);
    }

    @Override
    public void deleteIdentificationType(Integer id) {
        identificationTypeRepository.deleteById(id);
    }

    private IdentificationTypeDTO convertToDTO(IdentificationType type) {
        IdentificationTypeDTO dto = new IdentificationTypeDTO();
        dto.setId(type.getId());
        dto.setName(type.getName());
        return dto;
    }
}

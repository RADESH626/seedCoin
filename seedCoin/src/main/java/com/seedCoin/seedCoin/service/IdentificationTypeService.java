package com.seedCoin.seedCoin.service;

import com.seedCoin.seedCoin.dto.IdentificationTypeDTO;

import java.util.List;
import java.util.Optional;

public interface IdentificationTypeService {
    List<IdentificationTypeDTO> getAllIdentificationTypes();

    Optional<IdentificationTypeDTO> getIdentificationTypeById(Integer id);

    IdentificationTypeDTO createIdentificationType(IdentificationTypeDTO identificationTypeDTO);

    IdentificationTypeDTO updateIdentificationType(Integer id, IdentificationTypeDTO identificationTypeDTO);

    void deleteIdentificationType(Integer id);
}

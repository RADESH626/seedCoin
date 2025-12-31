package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.CommonTransactionDTO;
import com.seedCoin.seedCoin.dto.createDTO.CreateCommonTransactionDTO;
import com.seedCoin.seedCoin.model.CommonTransaction;
import com.seedCoin.seedCoin.model.User;
import com.seedCoin.seedCoin.model.enums.TransactionType;
import com.seedCoin.seedCoin.repository.CommonTransactionRepository;
import com.seedCoin.seedCoin.repository.UserRepository; // Assuming exists
import com.seedCoin.seedCoin.service.CommonTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommonTransactionServiceImpl implements CommonTransactionService {

    @Autowired
    private CommonTransactionRepository commonTransactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<CommonTransactionDTO> getAllCommonTransactions(Integer userId) {
        // If userId is provided, filter by it, otherwise all (or throw error if user
        // specific)
        // Assuming repository has findByUserId or findAll
        List<CommonTransaction> entities;
        if (userId != null) {
            entities = commonTransactionRepository.findByUserId(userId);
        } else {
            // For safety, maybe empty list or all if admin? Let's assume user context is
            // needed normally.
            // But for now, if repo supports findAll:
            entities = commonTransactionRepository.findAll();
        }

        return entities.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public CommonTransactionDTO createCommonTransaction(CreateCommonTransactionDTO createDto) {
        CommonTransaction entity = new CommonTransaction();
        entity.setName(createDto.getName());
        entity.setAmount(createDto.getAmount());

        if (createDto.getTransactionType() != null) {
            entity.setType(TransactionType.valueOf(createDto.getTransactionType()));
        }

        if (createDto.getCategoryId() != null) {
            entity.setCategoryId(createDto.getCategoryId());
        }

        if (createDto.getUserId() != null) {
            User user = userRepository.findById(createDto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            entity.setUser(user);
        }

        CommonTransaction saved = commonTransactionRepository.save(entity);
        return convertToDTO(saved);
    }

    @Override
    public CommonTransactionDTO updateCommonTransaction(Integer id, CreateCommonTransactionDTO createDto) {
        CommonTransaction entity = commonTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Common Transaction not found"));

        entity.setName(createDto.getName());
        entity.setAmount(createDto.getAmount());
        if (createDto.getTransactionType() != null) {
            entity.setType(TransactionType.valueOf(createDto.getTransactionType()));
        }
        if (createDto.getCategoryId() != null) {
            entity.setCategoryId(createDto.getCategoryId());
        }

        CommonTransaction updated = commonTransactionRepository.save(entity);
        return convertToDTO(updated);
    }

    @Override
    public void deleteCommonTransaction(Integer id) {
        commonTransactionRepository.deleteById(id);
    }

    private CommonTransactionDTO convertToDTO(CommonTransaction entity) {
        CommonTransactionDTO dto = new CommonTransactionDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setAmount(entity.getAmount());
        dto.setType(entity.getType() != null ? entity.getType().name() : null);

        // Map Category
        CommonTransactionDTO.CategoryDTO catDto = new CommonTransactionDTO.CategoryDTO();
        // Since we only have ID, we populate ID. Name/Icon/Color would normally come
        // from a lookup or DB join.
        // For now, valid JSON requires us to populate what we can.
        if (entity.getCategoryId() != null) {
            catDto.setId(entity.getCategoryId());
            catDto.setName("Category " + entity.getCategoryId()); // Fallback name
        }
        catDto.setColor("#000000"); // Default
        catDto.setIcon("help"); // Default
        if (entity.getType() != null)
            catDto.setType(entity.getType().name());

        dto.setCategory(catDto);
        return dto;
    }
}

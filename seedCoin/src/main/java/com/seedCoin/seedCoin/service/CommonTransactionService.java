package com.seedCoin.seedCoin.service;

import java.util.List;

import com.seedCoin.seedCoin.dto.CommonTransactionDTO;
import com.seedCoin.seedCoin.dto.createDTO.CreateCommonTransactionDTO;

public interface CommonTransactionService {

    List<CommonTransactionDTO> getAllCommonTransactions(Integer userId);

    CommonTransactionDTO createCommonTransaction(CreateCommonTransactionDTO createCommonTransactionDTO);

    CommonTransactionDTO updateCommonTransaction(Integer id, CreateCommonTransactionDTO createCommonTransactionDTO);

    void deleteCommonTransaction(Integer id);
}

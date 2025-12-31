package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.CommonTransactionDTO;
import com.seedCoin.seedCoin.dto.CommonTransactionResponseDTO;
import com.seedCoin.seedCoin.dto.CreateCommonTransactionDTO;
import com.seedCoin.seedCoin.dto.CreateTransactionDTO;
import com.seedCoin.seedCoin.dto.TransactionDTO;
import com.seedCoin.seedCoin.model.*;
import com.seedCoin.seedCoin.repository.AccountRepository;
import com.seedCoin.seedCoin.repository.CategoryRepository;
import com.seedCoin.seedCoin.repository.CommonTransactionRepository;
import com.seedCoin.seedCoin.repository.TransactionRepository;
import com.seedCoin.seedCoin.repository.UserRepository;
import com.seedCoin.seedCoin.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
// import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CommonTransactionRepository commonTransactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<TransactionDTO> getAllTransactions() {
        return transactionRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public List<TransactionDTO> getTransactionsByUserId(Integer userId) {
        return transactionRepository.findByUserIdOrderByTransactionDateDescIdDesc(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<TransactionDTO> getTransactionById(Integer id) {
        return transactionRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public TransactionDTO createTransaction(CreateTransactionDTO createTransactionDTO) {
        Transaction transaction = new Transaction();
        transaction.setUser(userRepository.findById(createTransactionDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));
        transaction.setAccount(accountRepository.findById(createTransactionDTO.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found")));
        transaction.setCategory(categoryRepository.findById(createTransactionDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found")));
        transaction.setAmount(createTransactionDTO.getAmount());
        transaction.setDescription(createTransactionDTO.getDescription());
        transaction.setType(TransactionType.valueOf(createTransactionDTO.getType()));
        transaction.setTransactionDate(createTransactionDTO.getTransactionDate());

        // Update Account Balance
        Account account = transaction.getAccount();
        if (transaction.getType() == TransactionType.INCOME) {
            account.setCurrentBalance(account.getCurrentBalance().add(transaction.getAmount()));
        } else {
            account.setCurrentBalance(account.getCurrentBalance().subtract(transaction.getAmount()));
        }
        accountRepository.save(account);

        Transaction savedTransaction = transactionRepository.save(transaction);
        return convertToDTO(savedTransaction);
    }

    @Override
    public TransactionDTO updateTransaction(Integer id, TransactionDTO transactionDTO) {
        return transactionRepository.findById(id).map(transaction -> {
            // Revert balance change for the old transaction amount
            Account oldAccount = transaction.getAccount();
            if (transaction.getType() == TransactionType.INCOME) {
                oldAccount.setCurrentBalance(oldAccount.getCurrentBalance().subtract(transaction.getAmount()));
            } else {
                oldAccount.setCurrentBalance(oldAccount.getCurrentBalance().add(transaction.getAmount()));
            }
            accountRepository.save(oldAccount);

            // Update transaction details
            transaction.setAmount(transactionDTO.getAmount());
            transaction.setDescription(transactionDTO.getDescription());
            transaction.setType(TransactionType.valueOf(transactionDTO.getType()));
            // Note: If you want to allow changing account or category, handle here

            // Apply new balance change
            Account account = transaction.getAccount();
            if (transaction.getType() == TransactionType.INCOME) {
                account.setCurrentBalance(account.getCurrentBalance().add(transaction.getAmount()));
            } else {
                account.setCurrentBalance(account.getCurrentBalance().subtract(transaction.getAmount()));
            }
            accountRepository.save(account);

            return convertToDTO(transactionRepository.save(transaction));
        }).orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    @Override
    public void deleteTransaction(Integer id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        // Revert balance
        Account account = transaction.getAccount();
        if (transaction.getType() == TransactionType.INCOME) {
            account.setCurrentBalance(account.getCurrentBalance().subtract(transaction.getAmount()));
        } else {
            account.setCurrentBalance(account.getCurrentBalance().add(transaction.getAmount()));
        }
        accountRepository.save(account);

        transactionRepository.deleteById(id);
    }

    @Override
    public List<CommonTransactionDTO> getCommonTransactions(Integer userId, String type) {
        TransactionType transactionType = TransactionType.valueOf(type);
        Pageable pageable = PageRequest.of(0, 5);
        List<Object[]> results = transactionRepository.findCommonTransactions(userId, transactionType, pageable);
        return results.stream().map(result -> new CommonTransactionDTO(
                (Number) result[0],
                (String) result[1],
                (String) result[2],
                (String) result[3],
                (Number) result[4],
                (Number) result[5])).collect(Collectors.toList());
    }

    // --- NEW METHODS ---

    @Override
    public List<CommonTransactionResponseDTO> getAllCommonTransactions(Integer userId) {
        return commonTransactionRepository.findByUserId(userId).stream()
                .map(this::convertToCommonResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CommonTransactionResponseDTO createCommonTransaction(CreateCommonTransactionDTO dto) {
        CommonTransaction common = new CommonTransaction();
        common.setUser(userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));
        common.setCategory(categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found")));
        common.setName(dto.getName());
        common.setAmount(dto.getAmount());
        common.setType(TransactionType.valueOf(dto.getType()));

        CommonTransaction saved = commonTransactionRepository.save(common);
        return convertToCommonResponseDTO(saved);
    }

    @Override
    public CommonTransactionResponseDTO updateCommonTransaction(Integer id, CreateCommonTransactionDTO dto) {
        return commonTransactionRepository.findById(id).map(common -> {
            common.setCategory(categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found")));
            common.setName(dto.getName());
            common.setAmount(dto.getAmount());
            common.setType(TransactionType.valueOf(dto.getType()));
            return convertToCommonResponseDTO(commonTransactionRepository.save(common));
        }).orElseThrow(() -> new RuntimeException("Common Transaction Preset not found"));
    }

    @Override
    public void deleteCommonTransaction(Integer id) {
        commonTransactionRepository.deleteById(id);
    }

    @Override
    public TransactionDTO createTransactionFromCommon(Integer commonId, Integer accountId, LocalDateTime date) {
        CommonTransaction common = commonTransactionRepository.findById(commonId)
                .orElseThrow(() -> new RuntimeException("Common Transaction Preset not found"));

        CreateTransactionDTO dto = new CreateTransactionDTO();
        dto.setUserId(common.getUser().getId());
        dto.setAccountId(accountId);
        dto.setCategoryId(common.getCategory().getId());
        dto.setAmount(common.getAmount());
        dto.setDescription(common.getName());
        dto.setType(common.getType().name());
        dto.setTransactionDate(date);

        return createTransaction(dto);
    }

    private TransactionDTO convertToDTO(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setUserId(transaction.getUser().getId());
        dto.setAccountId(transaction.getAccount().getId());
        dto.setCategoryId(transaction.getCategory().getId());
        dto.setCategoryName(transaction.getCategory().getName());
        dto.setAmount(transaction.getAmount());
        dto.setDescription(transaction.getDescription());
        dto.setType(transaction.getType().name());
        dto.setTransactionDate(transaction.getTransactionDate());
        dto.setCreatedAt(transaction.getCreatedAt());
        return dto;
    }

    private CommonTransactionResponseDTO convertToCommonResponseDTO(CommonTransaction common) {
        CommonTransactionResponseDTO dto = new CommonTransactionResponseDTO();
        dto.setId(common.getId());
        dto.setName(common.getName());
        dto.setAmount(common.getAmount());
        dto.setType(common.getType().name());

        CommonTransactionResponseDTO.CategoryDTO catDto = new CommonTransactionResponseDTO.CategoryDTO();
        catDto.setId(common.getCategory().getId());
        catDto.setName(common.getCategory().getName());
        catDto.setIcon(common.getCategory().getIcon());
        catDto.setType(common.getCategory().getType() != null ? common.getCategory().getType().name() : null);

        dto.setCategory(catDto);
        return dto;
    }
}

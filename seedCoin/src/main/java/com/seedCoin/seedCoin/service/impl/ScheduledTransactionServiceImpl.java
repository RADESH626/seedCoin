package com.seedCoin.seedCoin.service.impl;

import com.seedCoin.seedCoin.dto.ScheduledTransactionDTO;
import com.seedCoin.seedCoin.dto.createDTO.CreateTransactionDTO;
import com.seedCoin.seedCoin.model.*;
import com.seedCoin.seedCoin.repository.ScheduledTransactionRepository;

import com.seedCoin.seedCoin.service.ScheduledTransactionService;
import com.seedCoin.seedCoin.service.TransactionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ScheduledTransactionServiceImpl implements ScheduledTransactionService {

    @Autowired
    private ScheduledTransactionRepository scheduledTransactionRepository;

    @Autowired
    private TransactionService transactionService;

    @Override
    public ScheduledTransactionDTO createScheduledTransaction(ScheduledTransactionDTO dto) {
        ScheduledTransaction scheduleTransaction = new ScheduledTransaction();
        ScheduledTransaction saved = scheduledTransactionRepository.save(scheduleTransaction);
        return mapToDto(saved);
    }

    @Override
    public List<ScheduledTransactionDTO> getScheduledTransactionsByUserId(Integer userId) {
        return scheduledTransactionRepository.findByUserIdAndIsActiveTrue(userId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @SuppressWarnings("null")
    public ScheduledTransactionDTO updateScheduledTransaction(Integer id, ScheduledTransactionDTO dto) {
        ScheduledTransaction scheduleTransaction = scheduledTransactionRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new RuntimeException("Scheduled Transaction not found"));

        ScheduledTransaction saved = scheduledTransactionRepository.save(scheduleTransaction);
        return mapToDto(saved);
    }

    @Override
    public void deleteScheduledTransaction(Integer id) {
        ScheduledTransaction entity = scheduledTransactionRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new RuntimeException("Scheduled Transaction not found"));
        entity.setIsActive(false); // Soft delete
        scheduledTransactionRepository.save(entity);
    }

    @Override
    @Scheduled(cron = "0 0 0 * * *") // Run daily at midnight
    @Transactional
    public void processDueTransactions() {

        // obtenemos la fecha actual
        LocalDateTime now = LocalDateTime.now();

        // obtenemos las transacciones programadas que esten activas y que esten por
        // vencer
        List<ScheduledTransaction> dueTransactions = scheduledTransactionRepository
                .findByNextExecutionDateBeforeAndIsActiveTrue(now);

        // por cada transaccion programada actualizamos la fecha en la que se va a
        // ejecturar conservando los datos de la transaccion programada
        for (ScheduledTransaction scheduleTransaction : dueTransactions) {

            try {

                // creamos la transaccion a partir de la transaccion programada sin asignarle un
                // momento de repeticion
                CreateTransactionDTO transactionDTO = new CreateTransactionDTO();
                transactionDTO.setUserId(scheduleTransaction.getUser().getId());
                transactionDTO.setAccountId(scheduleTransaction.getAccount().getId());
                transactionDTO.setCategory(scheduleTransaction.getCategory());
                transactionDTO.setAmount(scheduleTransaction.getAmount());
                transactionDTO.setDescription(scheduleTransaction.getDescription());
                transactionDTO.setType(scheduleTransaction.getType());

                // asignamos la fecha de la transaccion programada usando la siguiente fecha de
                // ejecucion
                // (ejemplo la transaccion 1 se ejecuta el 1 de enero, entoces toca calcular la
                // siguiente fecha de ejecucion,
                // esto se hace con el metodo update Schedule)
                transactionDTO.setTransactionDate(scheduleTransaction.getNextExecutionDate());

                transactionService.createTransaction(transactionDTO);

                // actualizamos la transaccion programada que teniamos antes

                updateSchedule(scheduleTransaction);

            } catch (Exception e) {
                System.err.println(
                        "Failed to process scheduled transaction ID: " + scheduleTransaction.getId() + " Error: "
                                + e.getMessage());
            }
        }
    }

    private void updateSchedule(ScheduledTransaction scheduleTransaction) {

        // verificamos que la transaccion programada tenga una frecuencia
        if (scheduleTransaction.getFrequency() == null)
            return;

        // obtenemos la fecha actual y la asignamos a el atributo que indica la
        // siguiente fecha de ejecucion

        LocalDateTime next = scheduleTransaction.getNextExecutionDate();

        // aqui determinamos cuanto se le sumara a la fecha actual
        switch (scheduleTransaction.getFrequency()) {

            // aqui desactivamos la transaccion programada por que solo se debe ejecutar una
            // vez, cuando ya se ejecute no debe estar activa (borrado logico)
            case ONCE:
                scheduleTransaction.setIsActive(false);
                break;

            // de aqui en adelante se le suma la frecuencia a la fecha actual
            case WEEKLY:
                next = next.plusWeeks(1);
                scheduleTransaction.setNextExecutionDate(next);
                break;
            case MONTHLY:
                next = next.plusMonths(1);
                scheduleTransaction.setNextExecutionDate(next);
                break;
            case YEARLY:
                next = next.plusYears(1);
                scheduleTransaction.setNextExecutionDate(next);
                break;
        }

        // ya con el tiempo de ejecucion establecido, al igual que la siguiente fecha de
        // ejecucion, se puede guardar la transaccion programada
        scheduledTransactionRepository.save(scheduleTransaction);
    }

    private ScheduledTransactionDTO mapToDto(ScheduledTransaction entity) {
        ScheduledTransactionDTO dto = new ScheduledTransactionDTO();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUser().getId());
        dto.setAccountId(entity.getAccount().getId());
        dto.setAccountName(entity.getAccount().getName());
        dto.setCategory(entity.getCategory());
        dto.setAmount(entity.getAmount());
        dto.setDescription(entity.getDescription());
        dto.setNextExecutionDate(entity.getNextExecutionDate());
        dto.setFrequency(entity.getFrequency());
        dto.setType(entity.getType());
        dto.setIsActive(entity.getIsActive());
        return dto;
    }
}

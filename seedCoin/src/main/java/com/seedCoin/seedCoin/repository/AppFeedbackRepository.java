package com.seedCoin.seedCoin.repository;

import com.seedCoin.seedCoin.model.AppFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppFeedbackRepository extends JpaRepository<AppFeedback, Integer> {
    List<AppFeedback> findByUserId(Integer userId);
}

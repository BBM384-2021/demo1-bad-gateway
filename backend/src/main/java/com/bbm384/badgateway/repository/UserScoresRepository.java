package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.UserScores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface UserScoresRepository extends JpaRepository<UserScores,Long>, QuerydslPredicateExecutor<UserScores> {
    List<UserScores> findAllByUserId(Long userId);
}

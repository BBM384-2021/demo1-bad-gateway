package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.Answers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswersRepository extends JpaRepository<Answers,Long>, QuerydslPredicateExecutor<Answers> {
}

package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.Club;
import com.bbm384.badgateway.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long>, QuerydslPredicateExecutor<Question> {
    List<Question> findByClub(Club club);
}

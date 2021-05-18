package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.Club;
import com.bbm384.badgateway.model.SubClub;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Repository
public interface SubClubRepository extends JpaRepository<SubClub, Long> , QuerydslPredicateExecutor<SubClub> {
    Optional<SubClub> findById(Long id);
    Optional<SubClub> findByName(String name);
    List<SubClub> findAllByParentClub(Club parentClub);
}

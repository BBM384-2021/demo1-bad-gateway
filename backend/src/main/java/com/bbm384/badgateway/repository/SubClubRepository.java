package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.SubClub;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SubClubRepository extends JpaRepository<SubClub, Long> {
    Optional<SubClub> findById(Long id);
    Optional<SubClub> findByName(String name);

    Page<SubClub> findAll(BooleanExpression query, Pageable pageable);
}

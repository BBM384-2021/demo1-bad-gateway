package com.bbm384.badgateway.repository;


import com.bbm384.badgateway.model.ClubRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClubRequestRepository extends JpaRepository<ClubRequest,Long>, QuerydslPredicateExecutor<ClubRequest> {
    Optional<ClubRequest> findById(Long id);
    Optional<ClubRequest> findByClubName(String clubName);
    boolean existsClubRequestByClubName(String clubName);
}

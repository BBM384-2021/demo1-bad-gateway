package com.bbm384.badgateway.repository;


import com.bbm384.badgateway.model.Club;
import com.bbm384.badgateway.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRepository extends JpaRepository<Club,Long>, QuerydslPredicateExecutor<Club> {
        Optional<Club> findById(Long id);
        Optional<Club> findByName(String name);
        List<Club> findAllByMembers(User member);
}

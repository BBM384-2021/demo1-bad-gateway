package com.bbm384.badgateway.repository;


import com.bbm384.badgateway.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event,Long>, QuerydslPredicateExecutor<Event> {
    Optional<Event> findById(Long id);
    Optional<Event> findByName(String name);
    Optional<Event> findByAddressAndEventDate(String address, Instant eventDate);
}

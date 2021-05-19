package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.Club;
import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubClubRepository extends JpaRepository<SubClub, Long> , QuerydslPredicateExecutor<SubClub> {
    Optional<SubClub> findById(Long id);
    Optional<SubClub> findByName(String name);
    List<SubClub> findAllByMembersAndParentClub(User member, Club parentClub);
    List<SubClub> findAllByMembers(User member);
}

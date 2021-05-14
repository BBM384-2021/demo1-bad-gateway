package com.bbm384.badgateway.repository;


import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.SubClubChat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;

@Repository
public interface SubClubMessageRepository extends JpaRepository<SubClubChat, Long> {
    Page<SubClubChat> findBySubClubAndSentAtBeforeOrderBySentAtDesc(SubClub subClub, Instant sentAt, Pageable pageable);
    Page<SubClubChat> findBySubClubAndSentAtAfterOrderBySentAtDesc(SubClub subClub, Instant sentAt, Pageable pageable);
    Page<SubClubChat> findBySubClubOrderBySentAtDesc(SubClub subClub, Pageable pageable);
}

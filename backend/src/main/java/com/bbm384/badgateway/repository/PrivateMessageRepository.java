package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.PrivateMessage;
import com.bbm384.badgateway.model.SubClubChat;
import com.bbm384.badgateway.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface PrivateMessageRepository extends JpaRepository<PrivateMessage, Long> {
    Page<PrivateMessage> findBySenderAndReceiverAndSentAtBeforeOrderBySentAtDesc(User sender, User receiver, Instant sentAt, Pageable pageable);
    List<PrivateMessage> findBySenderAndReceiverAndSentAtAfterOrderBySentAtDesc(User sender, User receiver, Instant sentAt);
    Page<PrivateMessage> findBySenderAndReceiverOrderBySentAtDesc(User sender, User receiver, Pageable pageable);
    Page<PrivateMessage> findBySenderOrderBySentAtDesc(User sender, Pageable pageable);
    Page<PrivateMessage> findByReceiverOrderBySentAtDesc(User receiver, Pageable pageable);
}

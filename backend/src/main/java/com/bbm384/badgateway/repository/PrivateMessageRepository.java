package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.PrivateMessage;
import com.bbm384.badgateway.model.SubClubChat;
import com.bbm384.badgateway.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;

@Repository
public interface PrivateMessageRepository extends JpaRepository<PrivateMessage, Long> {
    Page<PrivateMessage> findBySenderAndReceiverAndSentAtBeforeOrderBySentAtDesc(User sender, User receiver, Instant sentAt, Pageable pageable);
    Page<PrivateMessage> findBySenderAndReceiverAndSentAtAfterOrderBySentAtDesc(User sender, User receiver, Instant sentAt, Pageable pageable);
    Page<PrivateMessage> findBySenderAndReceiverOrderBySentAtDesc(User sender, User receiver, Pageable pageable);

}

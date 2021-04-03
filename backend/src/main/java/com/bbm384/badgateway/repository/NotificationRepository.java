package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
    Page<Notification> findByUserId(Long userId, Pageable pageable);

    Notification findByUserIdAndId(Long user, Long notificationId);

    long countByUserIdAndIsReadFalse(Long userId);
}
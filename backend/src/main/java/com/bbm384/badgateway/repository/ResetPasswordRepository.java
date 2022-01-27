package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.ResetPassword;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Optional;

public interface ResetPasswordRepository extends JpaRepository<ResetPassword, Long>{
    Optional<ResetPassword> findById(Long resetPasswordId);
    Optional<ResetPassword> findByToken(String token);

    @Transactional
    public void deleteByExpiryDateBefore(Instant expiryDate);
}
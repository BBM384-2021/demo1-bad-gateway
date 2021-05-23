package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.Member;
import com.bbm384.badgateway.model.MemberBan;
import com.bbm384.badgateway.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberBanRepository extends JpaRepository<MemberBan, Long> {
    Optional<MemberBan> findById(Long id);
    Optional<MemberBan> findMemberBanByMember(User member);
}

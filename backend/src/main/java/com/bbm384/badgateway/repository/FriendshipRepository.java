package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.Friendship;
import com.bbm384.badgateway.model.constants.FriendshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship,Long> {
    Friendship findByAddressee_IdAndRequesterId(Long Addressee_Id, Long RequesterId);
    boolean existsByAddressee_IdAndRequesterId(Long Addressee_Id, Long RequesterId);
    List<Friendship> findByAddressee_IdOrRequesterId(Long Addressee_Id,Long RequesterId);
    List<Friendship> findByAddressee_IdAndFriendshipStatus(Long  Addressee_Id, FriendshipStatus status);
}

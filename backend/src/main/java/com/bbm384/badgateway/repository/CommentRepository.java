package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.Club;
import com.bbm384.badgateway.model.Comment;
import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long>, QuerydslPredicateExecutor<Comment> {
      Optional<Comment> findById(Long id);
      Optional<Comment> findByClub(Club club);
      Optional<Comment> findBySubClub(SubClub subClub);
      Optional<Comment> findBySentAt(Instant sentAt);
      boolean existsCommentByClubAndSenderAndContent(Club club, User user, String content);
}
package com.bbm384.badgateway.repository;

import com.bbm384.badgateway.model.Club;
import com.bbm384.badgateway.model.Comment;
import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long>, QuerydslPredicateExecutor<Comment> {
      Optional<Comment> findById(Long id);
      boolean existsCommentByClubAndSenderAndContent(Club club, User user, String content);
      boolean existsCommentBySubClubAndSenderAndContent(SubClub subClub, User user, String content);
}
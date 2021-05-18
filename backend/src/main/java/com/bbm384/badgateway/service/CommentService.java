package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.model.QComment;
import com.bbm384.badgateway.payload.CommentPayload;
import com.bbm384.badgateway.repository.*;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.util.ModelMapper;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@Validated
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    ClubRepository clubRepository;

    @Autowired
    SubClubRepository subClubRepository;


    public CommentPayload createComment(UserPrincipal currentUser, CommentPayload commentPayload) {
        Comment comment = new Comment();
        comment.setSender(currentUser.getUser());
        comment.setContent(commentPayload.getContent());
        comment.setRate(commentPayload.getRate());
        comment.setClub(commentPayload.getClub());
        comment.setSubClub(commentPayload.getSubClub());
        comment.setSentAt(Instant.now());
        boolean exists = commentRepository.existsCommentByClubAndSenderAndContent(comment.getClub(),
                comment.getSender(), comment.getContent());
        if(!exists){
            commentRepository.save(comment);
            return ModelMapper.mapToCommentInfoResponse(comment);
        }
        return null;
    }

    public List<CommentPayload> getAllCommentByClub(long clubId) {
        Club club = clubRepository.findById(clubId).orElseThrow(
                () -> new ResourceNotFoundException("Club", "id", String.valueOf(clubId))
        );
        QComment root = QComment.comment;
        BooleanExpression query = root.id.isNotNull();
        query = query.and(root.club.eq(club));
        List<Comment> commentList = (List<Comment>) commentRepository.findAll(query);
        List<CommentPayload> commentPayloadResponse = new ArrayList<>();
        for(Comment comment : commentList){
            commentPayloadResponse.add(ModelMapper.mapToCommentInfoResponse(comment));
        }
        return commentPayloadResponse;
    }


    public List<CommentPayload> getAllCommentBySubClub(long subClubId) {
        SubClub subClub = subClubRepository.findById(subClubId).orElseThrow(
                () -> new ResourceNotFoundException("SubClub", "id", String.valueOf(subClubId))
        );
        QComment root = QComment.comment;
        BooleanExpression query = root.id.isNotNull();
        query = query.and(root.subClub.eq(subClub));
        List<Comment> commentList = (List<Comment>) commentRepository.findAll(query);
        List<CommentPayload> commentPayloadResponse = new ArrayList<>();
        for(Comment comment : commentList){
            commentPayloadResponse.add(ModelMapper.mapToCommentInfoResponse(comment));
        }
        return commentPayloadResponse;
    }

}

package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.model.Comment;
import com.bbm384.badgateway.payload.CommentPayload;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.CommentService;
import org.hibernate.tool.schema.internal.exec.ScriptTargetOutputToFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${app.api_path}/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/create")
    public CommentPayload createComment(@CurrentUser UserPrincipal currentUser, @RequestBody CommentPayload commentPayload){
        return commentService.createComment(currentUser, commentPayload);
    }

    @GetMapping("/club/list")
    public List<CommentPayload> getAllCommentByClub(@RequestParam(value = "clubId") long clubId){
        return commentService.getAllCommentByClub(clubId);
    }

    @GetMapping("/subClub/list")
    public List<CommentPayload> getAllCommentBySubClub(@RequestParam(value = "subClubId") long subClubId){
        return commentService.getAllCommentBySubClub(subClubId);
    }
}

package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.model.Friendship;
import com.bbm384.badgateway.payload.FriendRequest;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("${app.api_path}/friendship")
public class FriendshipController {

    @Autowired
    FriendshipService friendshipService;

    @GetMapping
    public List<Friendship> getAllFriendships(@CurrentUser UserPrincipal userPrincipal){
        return friendshipService.getFriendships(userPrincipal);
    }

    @GetMapping("/waiting")
    public List<Friendship> getWaitingFriendships(@CurrentUser UserPrincipal userPrincipal){
        return friendshipService.getWaitingFriendships(userPrincipal);
    }

    @PostMapping("/sendRequest")
    public Friendship sendFriendRequest(@CurrentUser UserPrincipal userPrincipal, @RequestBody FriendRequest friendRequest){
        return friendshipService.sendFriendRequest(userPrincipal,friendRequest);
    }

    @PostMapping("/accept")
    public Friendship acceptFriendRequest(@CurrentUser UserPrincipal userPrincipal, @RequestBody FriendRequest friendRequest){
        return friendshipService.acceptFriendRequest(userPrincipal,friendRequest);
    }

    @PostMapping("/reject")
    public Friendship rejectFriendRequest(@CurrentUser UserPrincipal userPrincipal, @RequestBody FriendRequest friendRequest){
        return friendshipService.rejectFriendRequest(userPrincipal,friendRequest);
    }



}

package com.bbm384.badgateway.service;

import com.bbm384.badgateway.model.Friendship;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.model.constants.FriendshipStatus;
import com.bbm384.badgateway.payload.FriendRequest;
import com.bbm384.badgateway.repository.FriendshipRepository;
import com.bbm384.badgateway.repository.UserRepository;
import com.bbm384.badgateway.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendshipService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FriendshipRepository friendshipRepository;

    public Friendship sendFriendRequest(UserPrincipal userPrincipal, FriendRequest friendRequest){
        System.out.println(userPrincipal.getId());
        System.out.println(friendRequest.getUserId());
        User member =  userRepository.findById(userPrincipal.getId()).get();
        Friendship friendship = new Friendship();
        friendship.setAddressee(userRepository.findById(friendRequest.getUserId()).get());
        friendship.setRequester(member);
        friendship.setFriendshipStatus(FriendshipStatus.WAITING);
        if(friendshipRepository.existsByAddressee_IdAndRequesterId(friendRequest.getUserId(),userPrincipal.getId())){
            Friendship friendship1 = friendshipRepository.findByAddressee_IdAndRequesterId(friendRequest.getUserId(),userPrincipal.getId());
            return friendship1;
        }
        friendshipRepository.save(friendship);
        return friendship;
    }

    public List<Friendship> getFriendships(UserPrincipal userPrincipal){
        return friendshipRepository.findByAddressee_IdOrRequesterId(userPrincipal.getId(),userPrincipal.getId());
    }

    public List<Friendship> getWaitingFriendships(UserPrincipal userPrincipal){
        List<Friendship> friendships = friendshipRepository.findByAddressee_IdAndFriendshipStatus(userPrincipal.getId(),FriendshipStatus.WAITING);
        System.out.println(friendships.toString());
        return friendships;
    }

    public Friendship acceptFriendRequest(UserPrincipal userPrincipal,FriendRequest friendRequest){
        Friendship friendship = friendshipRepository.findByAddressee_IdAndRequesterId(userPrincipal.getId(),friendRequest.getUserId());
        friendship.setFriendshipStatus(FriendshipStatus.ACCEPTED);
        friendshipRepository.save(friendship);
        return friendship;
    }
    public Friendship rejectFriendRequest(UserPrincipal userPrincipal,FriendRequest friendRequest){
        Friendship friendship = friendshipRepository.findByAddressee_IdAndRequesterId(userPrincipal.getId(),friendRequest.getUserId());
        friendship.setFriendshipStatus(FriendshipStatus.REJECTED);
        friendshipRepository.save(friendship);
        return friendship;
    }

}

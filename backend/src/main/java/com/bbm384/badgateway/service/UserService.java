package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.AppException;
import com.bbm384.badgateway.model.MemberBan;
import com.bbm384.badgateway.model.constants.BannedMemberStatus;
import com.bbm384.badgateway.model.constants.UserStatus;
import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.repository.RoleRepository;
import com.bbm384.badgateway.repository.UserRepository;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.util.AppConstants;
import com.bbm384.badgateway.util.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    NotificationService notificationService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;


    public PagedResponse<UserInfo> getUserList(int page, String name, String username){
        Pageable pageable = PageRequest.of(page, AppConstants.DEFAULT_PAGE_SIZE, Sort.Direction.DESC, "id");

        Page<User> users = null;


        if(username != null){
            username = username.replace("i", "İ").toUpperCase();
        }


        if (users.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), users.getNumber(),
                    users.getSize(), users.getTotalElements(), users.getTotalPages(),
                    users.isLast());
        }

        List<UserInfo> userInfoResponse = users.map(user -> ModelMapper.mapToUserInfoResponse(user)).getContent();

        return new PagedResponse<>(userInfoResponse,
                users.getNumber(),
                users.getSize(),
                users.getTotalElements(),
                users.getTotalPages(),
                users.isLast()
        );
    }

    public UserFullInfo getUserFullInfo(long userId){
        HashMap<String, String> bans = new HashMap<>();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserFullInfo userFullInfo = new UserFullInfo();
        userFullInfo.setName(user.getName());
        userFullInfo.setUsername(user.getUsername());
        userFullInfo.setId(user.getId());
        userFullInfo.setEmail(user.getEmail());
        userFullInfo.setPhone(user.getPhone());

        for(MemberBan ban: user.getBans()){
            if(ban.getStatus() != BannedMemberStatus.ACTIVE){
                bans.put(ban.getSubClub().getName(), ban.getStatus().getValue());
            }
        }

        userFullInfo.setBans(bans);

        return userFullInfo;
    }

    public ApiResponse disableUser(UserPrincipal currentUser, Long userId){
        User targetUser = userRepository.findById(userId).orElseThrow(()->new AppException("User not found"));

        targetUser.setStatus(UserStatus.PASSIVE);
        userRepository.save(targetUser);

        return new ApiResponse(true, "ok");
    }

    public ApiResponse enableUser(UserPrincipal currentUser, Long userId){
        User targetUser = userRepository.findById(userId).orElseThrow(()->new AppException("User not found"));

        targetUser.setStatus(UserStatus.ACTIVE);
        userRepository.save(targetUser);

        return new ApiResponse(true, "ok");
    }

    public List<UserInfo> getAllUsers() {
        return  userRepository.findAll().stream().map(
                user -> ModelMapper.mapToUserInfoResponse(user)
        ).collect(Collectors.toList());
    }

    public User updateUser(UpdateUserRequest updateUserRequest, UserPrincipal currentUser){
        System.out.println(updateUserRequest.toString());
        User targetUser = userRepository.findById(currentUser.getId()).orElseThrow(()->new AppException("User not found"));
        System.out.println(targetUser.toString());
        targetUser.setName(updateUserRequest.getName());
        targetUser.setPhone(updateUserRequest.getPhone());
        targetUser.setEmail(updateUserRequest.getEmail());
        System.out.println(targetUser.toString());
        userRepository.save(targetUser);

        return targetUser;
    }



}
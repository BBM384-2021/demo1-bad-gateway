package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("${app.api_path}/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("info")
    public UserFullInfo getSelfUserInfo(@CurrentUser UserPrincipal currentUser) {
        return userService.getUserFullInfo(currentUser.getUser().getId());
    }

    @GetMapping("/")
    public UserFullInfo getUserInfo(@RequestParam(value = "userId") long userId) {

        return userService.getUserFullInfo(userId);
    }

    @PostMapping("/disable")
    public ApiResponse disableUser(@CurrentUser UserPrincipal currentUser, @RequestParam("userId") Long userId) {

        return userService.disableUser(currentUser, userId);
    }

    @PostMapping("/enable")
    public ApiResponse enableUser(@CurrentUser UserPrincipal currentUser, @RequestParam("userId") Long userId) {

        return userService.enableUser(currentUser, userId);
    }
}

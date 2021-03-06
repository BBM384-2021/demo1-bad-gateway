package com.bbm384.badgateway.controller;


import com.bbm384.badgateway.model.MemberBan;
import com.bbm384.badgateway.repository.MemberBanRepository;
import com.bbm384.badgateway.service.*;
import com.bbm384.badgateway.exception.AppException;
import com.bbm384.badgateway.model.Role;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.model.UserScores;
import com.bbm384.badgateway.model.constants.UserRole;
import com.bbm384.badgateway.model.constants.UserStatus;
import com.bbm384.badgateway.model.constants.UserType;
import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.repository.RoleRepository;
import com.bbm384.badgateway.repository.UserRepository;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.JwtTokenProvider;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.EmailService;
import com.bbm384.badgateway.service.PasswordService;
import com.bbm384.badgateway.service.QuestionService;
import com.bbm384.badgateway.util.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("${app.api_path}")
public class AuthController {
    @Autowired
    PasswordService passwordService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    EmailService emailService;

    @Autowired
    MemberBanRepository memberBanRepository;
  
    @Autowired
    QuestionService questionService;



    @PostMapping("/auth/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = null;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Username or password wrong!");
        }

        UserPrincipal currentUser = (UserPrincipal) authentication.getPrincipal();
        if (currentUser.getUser().getStatus() == UserStatus.PASSIVE)
            throw new AppException("Banned User!");

        SecurityContextHolder.getContext().setAuthentication(authentication);

        List<String> roles = authentication.getAuthorities().stream().map(
                auth -> auth.toString()
        ).collect(Collectors.toList());

        String[] rolesArray = new String[roles.size()];
        rolesArray = roles.toArray(rolesArray);

        String jwt = tokenProvider.generateToken(authentication);

        checkBanStatus();
       
        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse(jwt, rolesArray);
        List<UserScores> userScores = questionService.getUserScores(currentUser.getId());
        jwtAuthenticationResponse.setUserScores(userScores);
        return ResponseEntity.ok(jwtAuthenticationResponse);
    }

    @PostMapping("/auth/forgot-password")
    public ApiResponse forgotPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest){
        String email = forgotPasswordRequest.getEmail();
        return passwordService.forgotPassword(email);
    }

    @GetMapping("/auth/forgot-password/{token}")
    public ApiResponse checkToken(@PathVariable(value = "token") String token){
        return passwordService.checkToken(token);
    }

    @PostMapping("/auth/forgot-password/{token}")
    public ApiResponse setPassword(@PathVariable(value = "token") String token, @RequestBody SetPasswordRequest setPasswordRequest){
        String newPassword = setPasswordRequest.getPassword();
        String newPasswordAgain = setPasswordRequest.getPasswordAgain();
        PasswordValidator passwordValidator = new PasswordValidator();

        if(newPassword.equals(newPasswordAgain) && passwordValidator.validate(newPassword)){
            return passwordService.setPassword(token, newPassword);
        }

        return new ApiResponse(false, "Passwords don't match.");
    }


    @PostMapping("/auth/signup")
    public ApiResponse signup(@Valid @RequestBody SignUpRequest signUpRequest) {
        ApiResponse apiResponse = new ApiResponse();

        if(signUpRequest.getUsername().length() < 4) {
            apiResponse.setSuccess(false);
            apiResponse.setMessage("Username must be more than 3 character.");
            return apiResponse;
        }

        if(signUpRequest.getUsername().length() > 40) {
            apiResponse.setSuccess(false);
            apiResponse.setMessage("Username must be less than 40 character.");
            return apiResponse;
        }

        if (signUpRequest.getPassword().length() < 8) {
            apiResponse.setSuccess(false);
            apiResponse.setMessage("Password must be more than 7 character.");
            return apiResponse;
        }

        if (!(signUpRequest.getPassword().equals(signUpRequest.getPasswordRepeat()))){
            apiResponse.setSuccess(false);
            apiResponse.setMessage("The passwords you entered do not match.");
            return apiResponse;
        }
        
        PasswordValidator passwordValidator = new PasswordValidator();
        if(!passwordValidator.validate(signUpRequest.getPassword())){
            apiResponse.setSuccess(false);
            apiResponse.setMessage("Password must contain at least a letter, a number and a special character.");
            return apiResponse;
        }

        User user = new User();
        user.setUserType(UserType.MEMBER);
        user.setPhone(signUpRequest.getPhone());
        user.setName(signUpRequest.getName());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setEmail(signUpRequest.getEmail());
        user.setUsername(signUpRequest.getUsername());

        Role role = new Role(user, UserRole.MEMBER);

        userRepository.save(user);
        roleRepository.save(role);

        apiResponse.setSuccess(true);
        apiResponse.setUserId(user.getId());
        return apiResponse;
    }

    @PostMapping("/auth/reset-password")
    public ApiResponse resetPassword(@CurrentUser UserPrincipal currentUser, @RequestBody PasswordInfo passwordInfo){
        String username = currentUser.getUsername();
        String password = passwordInfo.getCurrentPassword();
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                username, password
        );

        Authentication authentication = null;

        try {
            authentication = authenticationManager.authenticate(authenticationToken);
            return passwordService.resetPassword(currentUser, passwordInfo);
        }
        catch (BadCredentialsException ex){
            return new ApiResponse(false, "Current Password Incorrect!");
        }
    }

    public void checkBanStatus(){
        List<MemberBan> memberBans = memberBanRepository.findAll();

        for(MemberBan memberBan: memberBans){
            if(memberBan.checkActivateMember()){
                memberBanRepository.save(memberBan);
            }
        }
    }

}
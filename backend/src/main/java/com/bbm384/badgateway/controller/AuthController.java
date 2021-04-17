package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.service.*;
import com.bbm384.badgateway.model.Role;
import com.bbm384.badgateway.model.constants.UserRole;
import com.bbm384.badgateway.model.constants.UserStatus;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.model.constants.UserType;
import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.repository.RoleRepository;
import com.bbm384.badgateway.repository.UserRepository;
import com.bbm384.badgateway.exception.AppException;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.JwtTokenProvider;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.util.PasswordValidator;
import com.bbm384.badgateway.service.EmailService;
import com.bbm384.badgateway.service.PasswordService;
import com.bbm384.badgateway.util.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

import static com.bbm384.badgateway.model.User.getUserDefaultPassword;

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


    @PostMapping("/auth/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        String password = loginRequest.getPassword();
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword());

        try {
            authenticationManager.authenticate(authenticationToken);
        }
        catch (BadCredentialsException ex){
            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("The user does not exist : " +
                            loginRequest.getUsername()));

            if (!user.isPasswordReset())
                password = getUserDefaultPassword();
        }

        Authentication authentication = null;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            password
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
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, rolesArray));
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
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setEmail(signUpRequest.getEmail());
        user.setUsername(signUpRequest.getUsername());

        Role role = new Role(user, UserRole.MEMBER);

        userRepository.save(user);
        roleRepository.save(role);

        apiResponse.setSuccess(true);
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
            return new ApiResponse(false, "Mevcut şifrenizi yanlış girdiniz.");
        }
    }

}
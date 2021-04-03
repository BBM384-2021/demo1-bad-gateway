package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.model.constants.UserStatus;
import com.bbm384.badgateway.repository.UserRepository;
import com.bbm384.badgateway.exception.AppException;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.payload.JwtAuthenticationResponse;
import com.bbm384.badgateway.payload.LoginRequest;
import com.bbm384.badgateway.security.JwtTokenProvider;
import com.bbm384.badgateway.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.bbm384.badgateway.model.User.getUserDefaultPassword;

@RestController
@RequestMapping("${app.api_path}")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

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
                    .orElseThrow(() -> new UsernameNotFoundException("Kullanıcı Sistemde Bulunamadı : " +
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
            throw new BadCredentialsException("Kullanıcı adı ve/veya şifre hatalı!");
        }


        UserPrincipal currentUser = (UserPrincipal) authentication.getPrincipal();
        if (currentUser.getUser().getStatus() == UserStatus.PASSIVE)
            throw new AppException("Passive User!");

        SecurityContextHolder.getContext().setAuthentication(authentication);

        //Object[] authorities = authentication.getAuthorities().toArray();
        String roleName = "admin";

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, roleName));
    }
}
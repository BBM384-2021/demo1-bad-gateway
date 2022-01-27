package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.repository.*;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.PasswordInfo;
import com.bbm384.badgateway.repository.UserRepository;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.util.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.Period;
import java.util.UUID;

@Service
public class PasswordService {
    @Autowired
    EmailService emailService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ResetPasswordRepository resetPasswordRepository;

    public ApiResponse forgotPassword(String email){
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("Please enter the system registered email address.","User", "email", String.valueOf(email))
        );

        UUID uuid = UUID.randomUUID();

        ResetPassword resetPassword = new ResetPassword();
        resetPassword.setUser(user);
        resetPassword.setToken(uuid.toString());
        resetPassword.setCreatedAt(Instant.now());
        resetPassword.setExpiryDate(resetPassword.getCreatedAt().plus(Period.ofDays(1)));
        resetPasswordRepository.save(resetPassword);
        String body = "Mr/Mrs "+ user.getName() + ",\n" +
                "\n" +
                "This email sent to reset your password on SpiritsUp. You can reset your password by clicking the link below. \n" + "\n" +
                "http://localhost:3000/forgot-password/" + resetPassword.getToken();
        emailService.sendMail(user.getEmail(), "Reset your password.\n", body);
        return new ApiResponse(true, "ok");
    }

    public ApiResponse checkToken(String token){
        ResetPassword resetPassword = resetPasswordRepository.findByToken(token).orElseThrow(
                () -> new ResourceNotFoundException("Verification code is wrong.", "ResetPassword", "token", String.valueOf(token))
        );
        if(Instant.now().compareTo(resetPassword.getExpiryDate()) < 0){
            return new ApiResponse(true, "ok");
        }
        return new ApiResponse(false, "The request timed out.");
    }

    public ApiResponse setPassword(String token, String newPassword) {
        ResetPassword resetPassword = resetPasswordRepository.findByToken(token).orElseThrow(
                () -> new ResourceNotFoundException("ResetPassword", "token", String.valueOf(token))
        );
        User user = resetPassword.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        resetPasswordRepository.deleteByExpiryDateBefore(Instant.now());
        return new ApiResponse(true, "ok");
    }

    public ApiResponse resetPassword(UserPrincipal currentUser, PasswordInfo passwordInfo){
        User user = currentUser.getUser();
        if(!passwordInfo.getNewPassword().equals(passwordInfo.getNewPasswordRepeat())){
            return new ApiResponse(false, "Password and password repeat must match.");
        }
        if(passwordInfo.getNewPassword().equals(passwordInfo.getCurrentPassword())){
            return new ApiResponse(false, "Your new password cannot be the same as your old password.");
        }

        PasswordValidator passwordValidator = new PasswordValidator();
        if(!passwordValidator.validate(passwordInfo.getNewPassword())){
            return new ApiResponse(false, "New password must contain at least 8 characters, 1 number and 1 special character.");
        }

        user.setPassword(passwordEncoder.encode(passwordInfo.getNewPassword()));
        user.setPasswordReset(false);
        userRepository.save(user);
        return new ApiResponse(true, "Password changed successfully!");
    }
}

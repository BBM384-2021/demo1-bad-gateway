package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.Period;
import java.util.UUID;

@Service
public class PasswordService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ResetPasswordRepository resetPasswordRepository;

    public ApiResponse forgotPassword(String email){
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("Lütfen Sisteme Kayıtlı Email adresi giriniz.","User", "email", String.valueOf(email))
        );

        UUID uuid = UUID.randomUUID();

        ResetPassword resetPassword = new ResetPassword();
        resetPassword.setUser(user);
        resetPassword.setToken(uuid.toString());
        resetPassword.setCreatedAt(Instant.now());
        resetPassword.setExpiryDate(resetPassword.getCreatedAt().plus(Period.ofDays(1)));
        resetPasswordRepository.save(resetPassword);
        /*String body = "Sayın "+ user.getName() + ",\n" +
                "\n" +
                "OYAK Emeklilik Portalında kullanmakta olduğunuz şifrenizi yenilemeniz için bu e-posta size gönderilmiştir. Aşağıdaki linke tıklayarak şifrenizi yeniden belirleyebilirsiniz \n" + "\n" +
                "http://localhost:3000/forgot-password/" + resetPassword.getToken();
        emailService.sendMail(user.getEmail(), "Şifre Sıfırlama İşleminizi Tamamlayınız\n", body);*/
        return new ApiResponse(true, "ok");
    }

    public ApiResponse checkToken(String token){
        ResetPassword resetPassword = resetPasswordRepository.findByToken(token).orElseThrow(
                () -> new ResourceNotFoundException("Doğrulama kodunuz yanlış.", "ResetPassword", "token", String.valueOf(token))
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
}

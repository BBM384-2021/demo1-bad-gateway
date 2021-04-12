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

    public ApiResponse resetPassword(UserPrincipal currentUser, PasswordInfo passwordInfo){
        User user = currentUser.getUser();
        if(!passwordInfo.getNewPassword().equals(passwordInfo.getNewPasswordRepeat())){
            return new ApiResponse(false, "Yeni şifreniz tekrarı ile eşleşmiyor.");
        }
        if(passwordInfo.getNewPassword().equals(passwordInfo.getCurrentPassword())){
            return new ApiResponse(false, "Yeni şifreniz eski şifreniz ile aynı olamaz");
        }

        PasswordValidator passwordValidator = new PasswordValidator();
        if(!passwordValidator.validate(passwordInfo.getNewPassword())){
            return new ApiResponse(false, "Lütfen en az 1 harf 1 rakam ve 1 karakter içeren 8 karakterli şifre oluşturunuz.");
        }

        user.setPassword(passwordEncoder.encode(passwordInfo.getNewPassword()));
        user.setPasswordReset(false);
        userRepository.save(user);
        return new ApiResponse(true, "Şifreniz başarıyla sıfırlandı.");
    }
}

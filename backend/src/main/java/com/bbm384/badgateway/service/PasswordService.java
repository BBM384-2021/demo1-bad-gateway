package com.bbm384.badgateway.service;

import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.PasswordInfo;
import com.bbm384.badgateway.repository.UserRepository;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.util.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    @Autowired
    EmailService emailService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;



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

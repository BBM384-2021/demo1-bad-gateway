package com.bbm384.badgateway.security;

import com.bbm384.badgateway.exception.AppException;
import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.constants.UserStatus;
import com.bbm384.badgateway.repository.UserRepository;
import com.bbm384.badgateway.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Let people login with username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Kullanıcı Sistemde Bulunamadı : " + username)
        );

        if (user.getStatus() == UserStatus.PASSIVE)
            throw new AppException("Kullanıcı Aktıf Değil");

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("User", "id", id)
        );

        if (user.getStatus() == UserStatus.PASSIVE)
            throw new AppException("Kullanıcı Aktıf Değil");

        return UserPrincipal.create(user);
    }
}
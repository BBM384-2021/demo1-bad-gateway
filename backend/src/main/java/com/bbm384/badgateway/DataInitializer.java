package com.bbm384.badgateway;

import com.bbm384.badgateway.model.Role;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.model.constants.UserRole;
import com.bbm384.badgateway.model.constants.UserType;
import com.bbm384.badgateway.repository.MessageRepository;
import com.bbm384.badgateway.repository.RoleRepository;
import com.bbm384.badgateway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if(false){
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin"));

            admin.setUserType(UserType.ADMIN);
            Role role = new Role(UserRole.ADMIN);
            role.setUser(admin);
            userRepository.save(admin);
            roleRepository.save(role);
        }
    }
}

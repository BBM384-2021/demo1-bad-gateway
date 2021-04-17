package com.bbm384.badgateway;


import com.bbm384.badgateway.model.Category;
import com.bbm384.badgateway.model.Club;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.repository.CategoryRepository;
import com.bbm384.badgateway.repository.ClubRepository;
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
    ClubRepository clubRepository;

    @Autowired
    CategoryRepository categoryRepository;
  
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
            userRepository.save(admin);

            Category sport = new Category();
            sport.setName("sport");
            categoryRepository.save(sport);

            Category music = new Category();
            music.setName("music");
            categoryRepository.save(music);

            Club club_1 = new Club();
            club_1.setName("guitar");
            club_1.setCategory(music);
            clubRepository.save(club_1);

            Club club_2 = new Club();
            club_2.setName("tennis");
            club_2.setCategory(sport);
            clubRepository.save(club_2);

            Role role = new Role(admin, UserRole.ADMIN);
            roleRepository.save(role);

        }
    }
}

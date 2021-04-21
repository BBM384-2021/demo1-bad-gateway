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

            User member = new User();
            member.setUsername("member");
            member.setPassword(passwordEncoder.encode("member"));
            admin.setUserType(UserType.MEMBER);
            userRepository.save(member);

            User subClubAdmin = new User();
            subClubAdmin.setUsername("subClubAdmin");
            subClubAdmin.setPassword(passwordEncoder.encode("subClubAdmin"));
            subClubAdmin.setUserType(UserType.SUB_CLUB_ADMIN);
            userRepository.save(subClubAdmin);

            Category sport = new Category();
            sport.setName("SPORT");
            categoryRepository.save(sport);

            Category music = new Category();
            music.setName("MUSIC");
            categoryRepository.save(music);

            Category game = new Category();
            game.setName("GAME");
            categoryRepository.save(game);

            Category art = new Category();
            art.setName("ART");
            categoryRepository.save(art);

            Club musicClub= new Club();
            musicClub.setName("GUITAR CLUB");
            musicClub.setCategory(game);
            musicClub.setDescription("Turn up the volume and rock out in our online group guitar " +
                    "class this session! Guitar Club provides students the opportunity to grab a " +
                    "guitar and have fun playing music with friends. \n");
            clubRepository.save(musicClub);

            Club gameClub= new Club();
            gameClub.setName("ONLINE GAME CLUB");
            gameClub.setCategory(game);
            gameClub.setDescription("This club is dedicated to reaching online game players." +
                    "Talking about the games and their mechanics, meeting new players while " +
                    "talking about the topic we're having fun are some of the main aims of this " +
                    "group. Let's join us!\n");
            clubRepository.save(gameClub);

            Club sportClub = new Club();
            sportClub.setName("TENNIS CLUB");
            sportClub.setCategory(sport);
            sportClub.setDescription("Tennis is a great way to stay fit, meet new people or " +
                    "have fun with family and friends. Whether it’s at the beach, down the " +
                    "driveway or at your local club, it’s easy to pick up a racquet and play " +
                    "tennis regardless of your age. And the great thing is that there is a s" +
                    "ocial club for tennis lovers to online meet.");
            clubRepository.save(sportClub);

            Club artClub = new Club();
            artClub.setName("ART CLUB");
            artClub.setCategory(art);
            artClub.setDescription("Want to learn to practice relaxation exercises, " +
                    "and art for self-care? You will just need a pen, felt tips, some" +
                    "plain paper and a cup of tea or coffee. Let's join us!");
            clubRepository.save(artClub);

            Role role = new Role(admin, UserRole.ADMIN);
            roleRepository.save(role);

            Role memberRole = new Role(member, UserRole.MEMBER);
            roleRepository.save(memberRole);

            Role subClubAdminRole = new Role(subClubAdmin, UserRole.SUB_CLUB_ADMIN);
            roleRepository.save(subClubAdminRole);
        }
    }
}

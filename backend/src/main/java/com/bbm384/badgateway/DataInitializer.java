package com.bbm384.badgateway;


import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.model.constants.*;
import com.bbm384.badgateway.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Arrays;
import java.util.HashSet;

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

    @Autowired
    SubClubRepository subClubRepository;

    @Autowired
    PrivateMessageRepository privateMessageRepository;

    @Override
    public void run(String... args) {
        if(false){
            User admin = new User();
            admin.setName("Betül Karagöz");
            admin.setUsername("admin");
            admin.setPhone("0123456789");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setUserType(UserType.ADMIN);
            admin.setEmail("admin@gmail.com");
            userRepository.save(admin);

            User member = new User();
            member.setName("Umut Özdemir");
            member.setUsername("UmutOzdemir");
            member.setPhone("0123456789");
            member.setPassword(passwordEncoder.encode("member"));
            member.setUserType(UserType.MEMBER);
            member.setEmail("member@gmail.com");
            userRepository.save(member);

            User member_2 = new User();
            member_2.setName("Umut Aydemir");
            member_2.setUsername("umutaydemir");
            member_2.setPhone("0123456789");
            member_2.setPassword(passwordEncoder.encode("member2"));
            member_2.setUserType(UserType.MEMBER);
            member_2.setEmail("member2@gmail.com");
            userRepository.save(member_2);

            User subClubAdmin = new User();
            subClubAdmin.setName("Salih Kerem Harman");
            subClubAdmin.setUsername("SalihKeremHarman");
            subClubAdmin.setPhone("0123456789");
            subClubAdmin.setPassword(passwordEncoder.encode("subClubAdmin"));
            subClubAdmin.setUserType(UserType.SUB_CLUB_ADMIN);
            subClubAdmin.setEmail("subClubAdmin@gmail.com");
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
            musicClub.setCategory(music);
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


            SubClub drawing = new SubClub();
            drawing.setName("STORY DRWAING SUBCLUB");
            drawing.setParentClub(artClub);
            drawing.setDescription("Our mission at Story Drawing Club is to provide high quality " +
                    "workshops that engage children from a wide range of backgrounds in story writing " +
                    "and drawing activities to improve diversity in children's stories and inspire" +
                    " potential illustrators and writers.");
            drawing.setCategory(art);
            drawing.setAdmin(subClubAdmin);
            drawing.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin)));
            subClubRepository.save(drawing);

            PrivateMessage pm = new PrivateMessage();
            pm.setSender(member);
            pm.setReceiver(member_2);
            pm.setMessage("hello");
            pm.setSentAt(Instant.now());
            privateMessageRepository.save(pm);


            Role role = new Role(admin, UserRole.ADMIN);
            roleRepository.save(role);

            Role memberRole = new Role(member, UserRole.MEMBER);
            roleRepository.save(memberRole);

            Role subClubAdminRole = new Role(subClubAdmin, UserRole.SUB_CLUB_ADMIN);
            roleRepository.save(subClubAdminRole);


        }
    }
}

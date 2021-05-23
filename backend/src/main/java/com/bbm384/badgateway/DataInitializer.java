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

    @Autowired

    MemberBanRepository memberBanRepository;

     @Autowired
    QuestionRepository questionRepository;

    @Autowired
    AnswersRepository answersRepository;
  
    @Autowired
    EventRepository eventRepository;


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


            MemberBan memberBan = new MemberBan();
            memberBan.setMember(member);
            memberBan.setSubClub(drawing);
            memberBan.setBannedDate(Instant.now());
            memberBanRepository.save(memberBan);

            MemberBan memberBan2 = new MemberBan();
            memberBan2.setMember(member_2);
            memberBan2.setSubClub(drawing);
            memberBan2.setBannedDate(Instant.now());
            memberBanRepository.save(memberBan2);

            Question question = new Question("What you would do in your free time ?",sportClub);
            questionRepository.save(question);
            Answers answer = new Answers("I would go to gym",25,question);
            Answers answer2 = new Answers("I play basketball with my friends",18,question);
            Answers answer3 = new Answers("I would hangout with my friends",12,question);
            Answers answer4 = new Answers("I would prefer to stay home",5,question);

            answersRepository.save(answer);
            answersRepository.save(answer2);
            answersRepository.save(answer3);
            answersRepository.save(answer4);

            Question question2 = new Question("What you would do in the evening during lockdown ?",gameClub);
            questionRepository.save(question2);
            Answers answer21 = new Answers("I would do some sport at home",5,question2);
            Answers answer22 = new Answers("I would play video games",25,question2);
            Answers answer23 = new Answers("I would like to chat with my friends",18,question2);
            Answers answer24 = new Answers("I would watch some tv shows",12,question2);

            answersRepository.save(answer21);
            answersRepository.save(answer22);
            answersRepository.save(answer23);
            answersRepository.save(answer24);

            Event pyCon = new Event();
            pyCon.setName("PyCon Ankara");
            pyCon.setAddress("Beytepe Kongre ve Kültür Merkezi");
            pyCon.setDescription("For the first time in history, PyCon is in Turkey. Well, virtually. And it’s free! PyCon Turkey 2020 is more than just a stream of talks and presentations. " +
                    "In addition to two tracks of talks, you will also have an opportunity to ask questions to the speakers, meet our sponsors, and have random chats with other participants. " +
                    "PyCon is a global event brand for conferences organized by Python programming language users in over 40 countries each year. " +
                    "PyCon Turkey aims to announce our Python Istanbul community to the world, as well as to strengthen the Python culture in our country.");
            pyCon.setEventType(EventType.OFFLINE);
            pyCon.setEventDate(Instant.now());
            pyCon.setClub(artClub);
            eventRepository.save(pyCon);


            Event gameTalks = new Event();
            gameTalks.setName("Game Talks");
            gameTalks.setAddress("https://zoom.us/");
            gameTalks.setDescription("An event about game industry");
            gameTalks.setEventType(EventType.ONLINE);
            gameTalks.setEventDate(Instant.now());
            gameTalks.setClub(gameClub);
            eventRepository.save(gameTalks);

        }
    }
}

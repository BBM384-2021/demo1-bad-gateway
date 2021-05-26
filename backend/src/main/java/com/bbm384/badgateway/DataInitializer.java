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
import java.util.List;

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

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    ClubRequestRepository clubRequestRepository;

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

            User member_3 = new User();
            member_3.setName("Seyma Civan");
            member_3.setUsername("seymacivan");
            member_3.setPhone("0123456789");
            member_3.setPassword(passwordEncoder.encode("member3"));
            member_3.setUserType(UserType.MEMBER);
            member_3.setEmail("member3@gmail.com");
            userRepository.save(member_3);

            User member_4 = new User();
            member_4.setName("Brad Pitt");
            member_4.setUsername("bradpitt");
            member_4.setPhone("0123456789");
            member_4.setPassword(passwordEncoder.encode("brad_pitt"));
            member_4.setUserType(UserType.MEMBER);
            member_4.setEmail("bradpitt@gmail.com");
            userRepository.save(member_4);

            User member_5 = new User();
            member_5.setName("Roger Federer");
            member_5.setUsername("rogerfederer");
            member_5.setPhone("0123456789");
            member_5.setPassword(passwordEncoder.encode("federer_best"));
            member_5.setUserType(UserType.MEMBER);
            member_5.setEmail("rfederer@gmail.com");
            userRepository.save(member_5);

            User member_6 = new User();
            member_6.setName("J.K Rowling");
            member_6.setUsername("jkrowling");
            member_6.setPhone("0123456789");
            member_6.setPassword(passwordEncoder.encode("rowling"));
            member_6.setUserType(UserType.MEMBER);
            member_6.setEmail("jkrowling@gmail.com");
            userRepository.save(member_6);

            User member_7 = new User();
            member_7.setName("LeBron James");
            member_7.setUsername("lebronjames");
            member_7.setPhone("0123456789");
            member_7.setPassword(passwordEncoder.encode("lebron"));
            member_7.setUserType(UserType.MEMBER);
            member_7.setEmail("james23@gmail.com");
            userRepository.save(member_7);

            User member_8 = new User();
            member_8.setName("Lionel Messi");
            member_8.setUsername("leomessi");
            member_8.setPhone("0123456789");
            member_8.setPassword(passwordEncoder.encode("messi10"));
            member_8.setUserType(UserType.MEMBER);
            member_8.setEmail("leomessi@gmail.com");
            userRepository.save(member_8);

            User member_9 = new User();
            member_9.setName("Cristiano Ronaldo");
            member_9.setUsername("cronaldo7");
            member_9.setPhone("0123456789");
            member_9.setPassword(passwordEncoder.encode("ronaldo7"));
            member_9.setUserType(UserType.MEMBER);
            member_9.setEmail("cr7@gmail.com");
            userRepository.save(member_9);

            User member_10 = new User();
            member_10.setName("Kevin Durant");
            member_10.setUsername("kd35");
            member_10.setPhone("0123456789");
            member_10.setPassword(passwordEncoder.encode("kd35"));
            member_10.setUserType(UserType.MEMBER);
            member_10.setEmail("kd35@gmail.com");
            userRepository.save(member_10);

            User member_11 = new User();
            member_11.setName("Fan Zhendong");
            member_11.setUsername("zhendong");
            member_11.setPhone("0123456789");
            member_11.setPassword(passwordEncoder.encode("Zhendong"));
            member_11.setUserType(UserType.MEMBER);
            member_11.setEmail("fzhendong@gmail.com");
            userRepository.save(member_11);

            User member_12 = new User();
            member_12.setName("Mozart");
            member_12.setUsername("mozart");
            member_12.setPhone("0123456789");
            member_12.setPassword(passwordEncoder.encode("mozart"));
            member_12.setUserType(UserType.MEMBER);
            member_12.setEmail("mozart@gmail.com");
            userRepository.save(member_12);

            User member_13 = new User();
            member_13.setName("Some Pianist");
            member_13.setUsername("pianist");
            member_13.setPhone("0123456789");
            member_13.setPassword(passwordEncoder.encode("pianist"));
            member_13.setUserType(UserType.MEMBER);
            member_13.setEmail("pianist@gmail.com");
            userRepository.save(member_13);

            User member_14 = new User();
            member_14.setName("Some Musician");
            member_14.setUsername("musician");
            member_14.setPhone("0123456789");
            member_14.setPassword(passwordEncoder.encode("musician"));
            member_14.setUserType(UserType.MEMBER);
            member_14.setEmail("musician@gmail.com");
            userRepository.save(member_14);

            User member_15 = new User();
            member_15.setName("Some Artist");
            member_15.setUsername("artist");
            member_15.setPhone("0123456789");
            member_15.setPassword(passwordEncoder.encode("artist"));
            member_15.setUserType(UserType.MEMBER);
            member_15.setEmail("artist@gmail.com");
            userRepository.save(member_15);

            User member_16 = new User();
            member_16.setName("Picasso");
            member_16.setUsername("picasso");
            member_16.setPhone("0123456789");
            member_16.setPassword(passwordEncoder.encode("picasso"));
            member_16.setUserType(UserType.MEMBER);
            member_16.setEmail("picasso@gmail.com");
            userRepository.save(member_16);

            User member_17 = new User();
            member_17.setName("Leo Da Vinci");
            member_17.setUsername("davinci");
            member_17.setPhone("0123456789");
            member_17.setPassword(passwordEncoder.encode("davinci"));
            member_17.setUserType(UserType.MEMBER);
            member_17.setEmail("davinci@gmail.com");
            userRepository.save(member_17);

            User member_18 = new User();
            member_18.setName("Bill Gates");
            member_18.setUsername("billgates");
            member_18.setPhone("0123456789");
            member_18.setPassword(passwordEncoder.encode("billgates"));
            member_18.setUserType(UserType.MEMBER);
            member_18.setEmail("billgates@gmail.com");
            userRepository.save(member_18);

            User member_19 = new User();
            member_19.setName("Gamer Boy");
            member_19.setUsername("gamerboy");
            member_19.setPhone("0123456789");
            member_19.setPassword(passwordEncoder.encode("gamerboy"));
            member_19.setUserType(UserType.MEMBER);
            member_19.setEmail("gamerboy@gmail.com");
            userRepository.save(member_19);

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

            Category technology = new Category();
            technology.setName("TECHNOLOGY");
            categoryRepository.save(technology);


            Club musicClub= new Club();
            musicClub.setName("MUSIC CLUB");
            musicClub.setCategory(music);
            musicClub.setDescription("Music is food for the soul they say." +
                    "Let's prove it together.\n");
            clubRepository.save(musicClub);


            SubClub guitar = new SubClub();
            guitar.setName("GUITAR SUBCLUB");
            guitar.setParentClub(musicClub);
            guitar.setDescription("Turn up the volume and rock out in our online group guitar " +
                    "class this session! Guitar Club provides students the opportunity to grab a " +
                    "guitar and have fun playing music with friends. \n");
            guitar.setCategory(music);
            guitar.setAdmin(subClubAdmin);
            guitar.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_14)));
            subClubRepository.save(guitar);


            SubClub piano = new SubClub();
            piano.setName("PIANO SUBCLUB");
            piano.setParentClub(musicClub);
            piano.setDescription("We invite you to join us if you are a pianist, a music director" +
                    "who wishes to encourage potential musicians, a parent or friend of a young pianist," +
                    "or if you are just interested in just the piano itself. \n");
            piano.setCategory(music);
            piano.setAdmin(subClubAdmin);
            piano.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_14, member_13)));
            subClubRepository.save(piano);

            SubClub violin = new SubClub();
            violin.setName("VIOLIN SUBCLUB");
            violin.setParentClub(musicClub);
            violin.setDescription("Learning the violin can be great fun and requires a lot of practice." +
                    "We believe that the best way to get started is to play music that you like right away. To "+
                    "do that, join our club and participate in our events.\n");
            violin.setCategory(music);
            violin.setAdmin(subClubAdmin);
            violin.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_14, member_12)));
            subClubRepository.save(violin);


            SubClub flute = new SubClub();
            flute.setName("FLUTE SUBCLUB");
            flute.setParentClub(musicClub);
            flute.setDescription("Flute is not just an instrumental it's a lifestyle, you know that. To get" +
                    "further information and practice about flutes, join our club and observe the greatness of flute.\n");
            flute.setCategory(music);
            flute.setAdmin(subClubAdmin);
            flute.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_14)));
            subClubRepository.save(flute);

            Club gameClub= new Club();
            gameClub.setName("GAME CLUB");
            gameClub.setCategory(game);
            gameClub.setDescription("This club's purpose is to bring people" +
                    "who play same games and share their feelings together.\n");
            clubRepository.save(gameClub);

            SubClub onlinegame = new SubClub();
            onlinegame.setName("ONLINE GAME SUBCLUB");
            onlinegame.setParentClub(gameClub);
            onlinegame.setDescription("This club is dedicated to reaching online game players." +
                    "Talking about the games and their mechanics, meeting new players while " +
                    "talking about the topic we're having fun are some of the main aims of this " +
                    "group. Let's join us!\n");
            onlinegame.setCategory(game);
            onlinegame.setAdmin(subClubAdmin);
            onlinegame.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_19)));
            subClubRepository.save(onlinegame);

            SubClub boardgame = new SubClub();
            boardgame.setName("BOARD GAMES SUBCLUB");
            boardgame.setParentClub(gameClub);
            boardgame.setDescription("We create and schedule events to play board games such as Monopoly, "+
                    "Yu-Gi-OH, or some spooky stuff. If you're interested, You're welcome!\n");
            boardgame.setCategory(game);
            boardgame.setAdmin(subClubAdmin);
            boardgame.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_19)));
            subClubRepository.save(boardgame);

            SubClub paintball = new SubClub();
            paintball.setName("PAINTBALL SUBCLUB");
            paintball.setParentClub(gameClub);
            paintball.setDescription("If you ever wanted to shoot your husband or friend who pisses you off, "+
                    "this is the best place to do so! Grab your weapon and shoot some paints in an epic places that we "+
                    "schedule our events in.\n");
            paintball.setCategory(game);
            paintball.setAdmin(subClubAdmin);
            paintball.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_4)));
            subClubRepository.save(paintball);

            SubClub console = new SubClub();
            console.setName("CONSOLE GAMES SUBCLUB");
            console.setParentClub(gameClub);
            console.setDescription("This place is for the people has addiction about consoles and games. "+
                    "We discuss new consoles, play games on our old ones or even trade/loan our game DVD's. "+
                    "What are you waiting for to join?!\n");
            console.setCategory(game);
            console.setAdmin(subClubAdmin);
            console.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_19)));
            subClubRepository.save(console);


            Club sportClub = new Club();
            sportClub.setName("SPORT CLUB");
            sportClub.setCategory(sport);
            sportClub.setDescription("Want to learn to practice relaxation exercises, " +
                    "and art for self-care? You will just need a pen, felt tips, some" +
                    "plain paper and a cup of tea or coffee. Let's join us!");
            clubRepository.save(sportClub);

            SubClub tennis = new SubClub();
            tennis.setName("TENNIS SUBCLUB");
            tennis.setParentClub(sportClub);
            tennis.setDescription("Tennis is a great way to stay fit, meet new people or " +
                    "have fun with family and friends. Whether it’s at the beach, or the grass, our aim is to have fun!\n");
            tennis.setCategory(sport);
            tennis.setAdmin(subClubAdmin);
            tennis.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_5)));
            subClubRepository.save(tennis);

            SubClub basketball = new SubClub();
            basketball.setName("BASKETBALL SUBCLUB");
            basketball.setParentClub(sportClub);
            basketball.setDescription("If you ever wanted to ball in, right spot my man! "+
                    "Let's step into the court and shoot some triples. "+
                    "You only need a ball and a hoop. Here are the people you play with.\n");
            basketball.setCategory(sport);
            basketball.setAdmin(subClubAdmin);
            basketball.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_7, member_10)));
            subClubRepository.save(basketball);

            SubClub football = new SubClub();
            football.setName("FOOTBALL SUBCLUB");
            football.setParentClub(sportClub);
            football.setDescription("If you ever wanted to ball in, right spot my man! "+
                    "Let's step into the court and shoot some triples. "+
                    "You only need a ball and a hoop. Here are the people you play with.\n");
            football.setCategory(sport);
            football.setAdmin(subClubAdmin);
            football.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_8, member_9)));
            subClubRepository.save(football);

            SubClub tabletennis = new SubClub();
            tabletennis.setName("TABLE TENNIS SUBCLUB");
            tabletennis.setParentClub(sportClub);
            tabletennis.setDescription("You only need a racket and a ball for this. "+
                    "And probably some skill and interest.\n");
            tabletennis.setCategory(sport);
            tabletennis.setAdmin(subClubAdmin);
            tabletennis.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_11)));
            subClubRepository.save(tabletennis);



            Club artClub = new Club();
            artClub.setName("ART CLUB");
            artClub.setCategory(art);
            artClub.setDescription("Want to learn to practice relaxation exercises, " +
                    "and art for self-care? You will just need a pen, felt tips, some" +
                    "plain paper and a cup of tea or coffee. Let's join us!");
            clubRepository.save(artClub);


            SubClub drawing = new SubClub();
            drawing.setName("STORY DRAWING SUBCLUB");
            drawing.setParentClub(artClub);
            drawing.setDescription("Our mission at Story Drawing Club is to provide high quality " +
                    "workshops that engage children from a wide range of backgrounds in story writing " +
                    "and drawing activities to improve diversity in children's stories and inspire" +
                    " potential illustrators and writers.");
            drawing.setCategory(art);
            drawing.setAdmin(subClubAdmin);
            drawing.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_15, member_6)));
            subClubRepository.save(drawing);

            SubClub painting = new SubClub();
            painting.setName("PAINTING SUBCLUB");
            painting.setParentClub(artClub);
            painting.setDescription("If you like to paint some canvas, what are you waiting for?!");
            painting.setCategory(art);
            painting.setAdmin(subClubAdmin);
            painting.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_15, member_16, member_17)));
            subClubRepository.save(painting);

            SubClub photography = new SubClub();
            photography.setName("PHOTOGRAPHY SUBCLUB");
            photography.setParentClub(artClub);
            photography.setDescription("If you like to picture and save your best moments, here is the best place for you!");
            photography.setCategory(art);
            photography.setAdmin(subClubAdmin);
            photography.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_15)));
            subClubRepository.save(photography);


            Club technologyClub = new Club();
            technologyClub.setName("TECHNOLOGY CLUB");
            technologyClub.setCategory(art);
            technologyClub.setDescription("Want to learn new smartphones released, " +
                    "or some coding languages? Or just to keep on with the science?" +
                    "All you need to do is to join us :)");
            clubRepository.save(technologyClub);

            SubClub software = new SubClub();
            software.setName("SOFTWARE SUBCLUB");
            software.setParentClub(technologyClub);
            software.setDescription("If you like to learn or improve as a software engineer or learn some stuff about it, for sure this is the best place!");
            software.setCategory(technology);
            software.setAdmin(subClubAdmin);
            software.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_18)));
            subClubRepository.save(software);

            SubClub inventions = new SubClub();
            inventions.setName("INVENTIONS SUBCLUB");
            inventions.setParentClub(technologyClub);
            inventions.setDescription("If you like to check out some inventions and keep in touch with technology, you know what to do!");
            inventions.setCategory(technology);
            inventions.setAdmin(subClubAdmin);
            inventions.setMembers(new HashSet<User>(Arrays.asList(member, member_2, subClubAdmin, admin, member_18)));
            subClubRepository.save(inventions);



            PrivateMessage pm = new PrivateMessage();
            pm.setSender(member);
            pm.setReceiver(member_2);
            pm.setMessage("hello");
            pm.setSentAt(Instant.now());
            privateMessageRepository.save(pm);

            PrivateMessage pm2 = new PrivateMessage();
            pm2.setSender(member);
            pm2.setReceiver(member_2);
            pm2.setMessage("hello");
            pm2.setSentAt(Instant.now());
            privateMessageRepository.save(pm2);


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

            Question question1 = new Question("What was your favoruite lesson during high school days?",sportClub);
            questionRepository.save(question1);
            Answers answer5 = new Answers("Physical Education",25,question1);
            Answers answer6 = new Answers("Break Times",18,question1);
            Answers answer7= new Answers("I hated all",12,question1);
            Answers answer8 = new Answers("Maths",5,question1);

            answersRepository.save(answer5);
            answersRepository.save(answer6);
            answersRepository.save(answer7);
            answersRepository.save(answer8);

            Question question2 = new Question("What do you watch on tv?",sportClub);
            questionRepository.save(question2);
            Answers answer9 = new Answers("Some sports matches",25,question2);
            Answers answer10 = new Answers("I don't watch TV at all",18,question2);
            Answers answer11= new Answers("News",12,question2);
            Answers answer12 = new Answers("Some Series",5,question2);

            answersRepository.save(answer9);
            answersRepository.save(answer10);
            answersRepository.save(answer11);
            answersRepository.save(answer12);

            Question question3 = new Question("How often do you go to gym?",sportClub);
            questionRepository.save(question3);
            Answers answer13 = new Answers("Everyday",25,question3);
            Answers answer14 = new Answers("2-3 times a week",18,question3);
            Answers answer15= new Answers("2-3 times a month",12,question3);
            Answers answer16 = new Answers("Never",5,question3);

            answersRepository.save(answer13);
            answersRepository.save(answer14);
            answersRepository.save(answer15);
            answersRepository.save(answer16);

            Question question4 = new Question("What you would do in the evening during lockdown ?",gameClub);
            questionRepository.save(question4);
            Answers answer21 = new Answers("I would do some sport at home",5,question4);
            Answers answer22 = new Answers("I would play video games",25,question4);
            Answers answer23 = new Answers("I would like to chat with my friends",18,question4);
            Answers answer24 = new Answers("I would watch some tv shows",12,question4);

            answersRepository.save(answer21);
            answersRepository.save(answer22);
            answersRepository.save(answer23);
            answersRepository.save(answer24);

            Question question5 = new Question("What is the first thing to do for you to discover new series?",gameClub);
            questionRepository.save(question5);
            Answers answer25 = new Answers("I would read it's book.",5,question5);
            Answers answer26 = new Answers("I would play it's own game.",25,question5);
            Answers answer27 = new Answers("I would go to it's cinema.",18,question5);
            Answers answer28 = new Answers("I would watch it's tv show.",12,question5);

            answersRepository.save(answer25);
            answersRepository.save(answer26);
            answersRepository.save(answer27);
            answersRepository.save(answer28);

            Question question6 = new Question("How many games do you own in your console?",gameClub);
            questionRepository.save(question6);
            Answers answer29 = new Answers("I do not own a console.",5,question6);
            Answers answer30 = new Answers("10+.",25,question6);
            Answers answer31 = new Answers("6-10.",18,question6);
            Answers answer32 = new Answers("1-5.",12,question6);

            answersRepository.save(answer29);
            answersRepository.save(answer30);
            answersRepository.save(answer31);
            answersRepository.save(answer32);

            Question question7 = new Question("How many hours in a week you play games?",gameClub);
            questionRepository.save(question7);
            Answers answer33 = new Answers("0-4",5,question7);
            Answers answer34 = new Answers("20+.",25,question7);
            Answers answer35 = new Answers("10-19.",18,question7);
            Answers answer36 = new Answers("5-9.",12,question7);

            answersRepository.save(answer33);
            answersRepository.save(answer34);
            answersRepository.save(answer35);
            answersRepository.save(answer36);

            Question question8 = new Question("How many instruments can you play?",musicClub);
            questionRepository.save(question8);
            Answers answer37 = new Answers("I can't play an instrument.",5,question8);
            Answers answer38 = new Answers("3+.",25,question8);
            Answers answer39 = new Answers("2",18,question8);
            Answers answer40 = new Answers("1",12,question8);

            answersRepository.save(answer37);
            answersRepository.save(answer38);
            answersRepository.save(answer39);
            answersRepository.save(answer40);

            Question question9 = new Question("How often do you listen to music?",musicClub);
            questionRepository.save(question9);
            Answers answer41 = new Answers("I never listen to music.",5,question9);
            Answers answer42 = new Answers("Always.",25,question9);
            Answers answer43 = new Answers("As much as i can.",18,question9);
            Answers answer44 = new Answers("Sometimes, probably when i am bored.",12,question9);

            answersRepository.save(answer41);
            answersRepository.save(answer42);
            answersRepository.save(answer43);
            answersRepository.save(answer44);

            Question question10 = new Question("How many musicians can you count?",musicClub);
            questionRepository.save(question10);
            Answers answer45 = new Answers("None.",5,question10);
            Answers answer46 = new Answers("6+.",25,question10);
            Answers answer47 = new Answers("3-5.",18,question10);
            Answers answer48 = new Answers("1-2.",12,question10);

            answersRepository.save(answer45);
            answersRepository.save(answer46);
            answersRepository.save(answer47);
            answersRepository.save(answer48);

            Question question11 = new Question("Do you have spotify premium?",musicClub);
            questionRepository.save(question11);
            Answers answer49 = new Answers("No.",5,question11);
            Answers answer50 = new Answers("Yes.",25,question11);
            Answers answer51 = new Answers("I use another software.",18,question11);
            Answers answer52 = new Answers("Why buying when i can crack it.",12,question11);

            answersRepository.save(answer49);
            answersRepository.save(answer50);
            answersRepository.save(answer51);
            answersRepository.save(answer52);

            Question question12 = new Question("What was your favoruite lesson other than main lessons during high school?",artClub);
            questionRepository.save(question12);
            Answers answer53 = new Answers("None.",5,question12);
            Answers answer54 = new Answers("Art.",25,question12);
            Answers answer55 = new Answers("Music.",18,question12);
            Answers answer56 = new Answers("PE.",12,question12);

            answersRepository.save(answer53);
            answersRepository.save(answer54);
            answersRepository.save(answer55);
            answersRepository.save(answer56);

            Question question13 = new Question("How many artists can you count?",artClub);
            questionRepository.save(question13);
            Answers answer57 = new Answers("None.",5,question13);
            Answers answer58 = new Answers("6+",25,question13);
            Answers answer59 = new Answers("3-5",18,question13);
            Answers answer60 = new Answers("1-2",12,question13);

            answersRepository.save(answer57);
            answersRepository.save(answer58);
            answersRepository.save(answer59);
            answersRepository.save(answer60);

            Question question14 = new Question("How often do you visit exhibitons?",artClub);
            questionRepository.save(question14);
            Answers answer61 = new Answers("Never.",5,question14);
            Answers answer62 = new Answers("Always",25,question14);
            Answers answer63 = new Answers("2-3 times a week",18,question14);
            Answers answer64 = new Answers("2-3 times a month",12,question14);

            answersRepository.save(answer61);
            answersRepository.save(answer62);
            answersRepository.save(answer63);
            answersRepository.save(answer64);

            Question question15 = new Question("How often you write your own stories?",artClub);
            questionRepository.save(question15);
            Answers answer65 = new Answers("Never.",5,question15);
            Answers answer66 = new Answers("Always",25,question15);
            Answers answer67 = new Answers("2-3 times a week",18,question15);
            Answers answer68 = new Answers("2-3 times a month",12,question15);

            answersRepository.save(answer65);
            answersRepository.save(answer66);
            answersRepository.save(answer67);
            answersRepository.save(answer68);

            Question question16 = new Question("How often you read tech magazines?",technologyClub);
            questionRepository.save(question16);
            Answers answer69 = new Answers("Never.",5,question16);
            Answers answer70 = new Answers("Always",25,question16);
            Answers answer71 = new Answers("2-3 times a week",18,question16);
            Answers answer72 = new Answers("2-3 times a month",12,question16);

            answersRepository.save(answer69);
            answersRepository.save(answer70);
            answersRepository.save(answer71);
            answersRepository.save(answer72);

            Question question17 = new Question("Do you develop or have any information about software applications?",technologyClub);
            questionRepository.save(question17);
            Answers answer73 = new Answers("I do not.",5,question17);
            Answers answer74 = new Answers("I do.",25,question17);
            Answers answer75 = new Answers("I have some knowledge",18,question17);
            Answers answer76 = new Answers("I do not know but i am interested.",12,question17);

            answersRepository.save(answer73);
            answersRepository.save(answer74);
            answersRepository.save(answer75);
            answersRepository.save(answer76);

            Question question18 = new Question("Do you know how to use MS applications?",technologyClub);
            questionRepository.save(question18);
            Answers answer77 = new Answers("I do not.",5,question18);
            Answers answer78 = new Answers("I do.",25,question18);
            Answers answer79 = new Answers("I have some knowledge",18,question18);
            Answers answer80 = new Answers("I do not know but i am interested.",12,question18);

            answersRepository.save(answer77);
            answersRepository.save(answer78);
            answersRepository.save(answer79);
            answersRepository.save(answer80);

            Question question19 = new Question("Have you heard about ipv6?",technologyClub);
            questionRepository.save(question19);
            Answers answer81 = new Answers("I do not.",5,question19);
            Answers answer82 = new Answers("I do.",25,question19);
            Answers answer83 = new Answers("I have some knowledge",18,question19);
            Answers answer84 = new Answers("I do not know but i am interested.",12,question19);

            answersRepository.save(answer81);
            answersRepository.save(answer82);
            answersRepository.save(answer83);
            answersRepository.save(answer84);

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

            Event playTennis = new Event();
            playTennis.setName("Tennis Meetup");
            playTennis.setAddress("Tennis Club At Ankara");
            playTennis.setDescription("We play and learn tennis together.");
            playTennis.setEventType(EventType.OFFLINE);
            playTennis.setEventDate(Instant.now());
            playTennis.setClub(sportClub);
            playTennis.setSubClub(tennis);
            eventRepository.save(playTennis);

            Event opera = new Event();
            opera.setName("Opera Meetup");
            opera.setAddress("Ankara Opera Center");
            opera.setDescription("We listen one of the best opera.");
            opera.setEventType(EventType.OFFLINE);
            opera.setEventDate(Instant.now());
            opera.setClub(sportClub);
            eventRepository.save(opera);

            Event paintExhibiton = new Event();
            paintExhibiton.setName("We visit exhibition in Kizilay");
            paintExhibiton.setAddress("Kizilay");
            paintExhibiton.setDescription("We listen one of the best opera.");
            paintExhibiton.setEventType(EventType.OFFLINE);
            paintExhibiton.setEventDate(Instant.now());
            paintExhibiton.setClub(artClub);
            paintExhibiton.setSubClub(painting);
            eventRepository.save(paintExhibiton);

            Event paintBall = new Event();
            paintBall.setName("Paintball Event");
            paintBall.setAddress("Ahlatlibal Paintball Center");
            paintBall.setDescription("Let's shoot some heads :).");
            paintBall.setEventType(EventType.OFFLINE);
            paintBall.setEventDate(Instant.now());
            paintBall.setClub(gameClub);
            paintBall.setSubClub(paintball);
            eventRepository.save(paintBall);

            Comment comment = new Comment();
            comment.setClub(musicClub);
            comment.setRate(5);
            comment.setSender(admin);
            comment.setContent("my favorite club!");
            commentRepository.save(comment);

            Comment comment1 = new Comment();
            comment1.setClub(musicClub);
            comment1.setRate(2);
            comment1.setSender(subClubAdmin);
            comment1.setContent("so so :/");
            commentRepository.save(comment1);

            Comment comment2 = new Comment();
            comment2.setSubClub(drawing);
            comment2.setRate(1);
            comment2.setSender(admin);
            comment2.setContent("very boring");
            commentRepository.save(comment2);

            Comment comment3 = new Comment();
            comment3.setSubClub(drawing);
            comment3.setRate(4);
            comment3.setSender(member);
            comment3.setContent("not bad");
            commentRepository.save(comment3);

            Comment comment4 = new Comment();
            comment4.setSubClub(drawing);
            comment4.setRate(5);
            comment4.setSender(member_2);
            comment4.setContent("We have a lot of fun in the club");
            commentRepository.save(comment4);

            Comment comment5 = new Comment();
            comment5.setClub(sportClub);
            comment5.setRate(5);
            comment5.setSender(member_7);
            comment5.setContent("Best club ever");
            commentRepository.save(comment5);

            Comment comment6 = new Comment();
            comment6.setSubClub(football);
            comment6.setRate(5);
            comment6.setSender(member_8);
            comment6.setContent("I will be balling in this club for sure!");
            commentRepository.save(comment6);

            Comment comment7 = new Comment();
            comment7.setClub(sportClub);
            comment7.setRate(3);
            comment7.setSender(member_9);
            comment7.setContent("Meh!");
            commentRepository.save(comment7);

            Comment commentx = new Comment();
            commentx.setSubClub(basketball);
            commentx.setRate(3);
            commentx.setSender(member_10);
            commentx.setContent("Meh!");
            commentRepository.save(commentx);

            Comment comment8 = new Comment();
            comment8.setClub(artClub);
            comment8.setRate(4);
            comment8.setSender(member_15);
            comment8.setContent("I am enjoying this actually");
            commentRepository.save(comment8);

            Comment comment9= new Comment();
            comment9.setSubClub(piano);
            comment9.setRate(1);
            comment9.setSender(member_16);
            comment9.setContent("****** ******");
            commentRepository.save(comment9);

            Comment comment10 = new Comment();
            comment10.setClub(artClub);
            comment10.setRate(3);
            comment10.setSender(member_17);
            comment10.setContent("Can't say i enjoyed a lot");
            commentRepository.save(comment10);

            Comment comment11 = new Comment();
            comment11.setClub(musicClub);
            comment11.setRate(4);
            comment11.setSender(member_17);
            comment11.setContent("I can recommend this to most of my friends");
            commentRepository.save(comment11);

            Comment comment12 = new Comment();
            comment12.setClub(musicClub);
            comment12.setRate(1);
            comment12.setSender(member_17);
            comment12.setContent("No. Basically no.");
            commentRepository.save(comment12);

            Comment comment13 = new Comment();
            comment13.setClub(musicClub);
            comment13.setRate(5);
            comment13.setSender(member_17);
            comment13.setContent("Thanks to this club i had a lot of fun.");
            commentRepository.save(comment13);

            Comment comment14 = new Comment();
            comment14.setClub(technologyClub);
            comment14.setRate(4);
            comment14.setSender(member_18);
            comment14.setContent("I learnt a lot.");
            commentRepository.save(comment14);

            Comment comment15 = new Comment();
            comment15.setSubClub(onlinegame);
            comment15.setRate(5);
            comment15.setSender(member_19);
            comment15.setContent("Thanks to this club i can game a lot more!");
            commentRepository.save(comment15);

            ClubRequest clubRequest = new ClubRequest();
            List<String> users = Arrays.asList("admin", "UmutOzdemir");
            clubRequest.setParentName("GUITAR CLUB");
            clubRequest.setClubType("SUB-CLUB");
            clubRequest.setUser(users);
            clubRequest.setRequestCount(2);
            clubRequest.setClubName("Piano Club");
            clubRequestRepository.save(clubRequest);

            ClubRequest clubRequest1 = new ClubRequest();
            List<String> users1 = Arrays.asList("admin", "UmutOzdemir", "umutaydemir");
            clubRequest1.setParentName("ONLINE GAME CLUB");
            clubRequest1.setClubType("SUB-CLUB");
            clubRequest1.setUser(users1);
            clubRequest1.setRequestCount(3);
            clubRequest1.setClubName("Lol Club");
            clubRequestRepository.save(clubRequest1);

            ClubRequest clubRequest2 = new ClubRequest();
            List<String> users2 = Arrays.asList("admin", "UmutOzdemir", "umutaydemir", "SalihKeremHarman");
            clubRequest2.setClubType("CLUB");
            clubRequest2.setUser(users2);
            clubRequest2.setRequestCount(4);
            clubRequest2.setClubName("BOOK CLUB");
            clubRequestRepository.save(clubRequest2);

            ClubRequest clubRequest3 = new ClubRequest();
            List<String> users3 = Arrays.asList("UmutOzdemir");
            clubRequest3.setClubType("CLUB");
            clubRequest3.setUser(users3);
            clubRequest3.setRequestCount(1);
            clubRequest3.setClubName("SPORT CLUB");
            clubRequestRepository.save(clubRequest3);
        }
    }
}

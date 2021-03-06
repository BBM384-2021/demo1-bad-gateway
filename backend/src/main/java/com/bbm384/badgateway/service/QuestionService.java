package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.ClubOperationFlowException;
import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.payload.AnswerPayload;
import com.bbm384.badgateway.payload.QuestionCreateRequest;
import com.bbm384.badgateway.payload.QuestionsAnswerPayload;
import com.bbm384.badgateway.payload.QuestionsAnswerRequest;
import com.bbm384.badgateway.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Validated
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    AnswersRepository answersRepository;

    @Autowired
    ClubRepository clubRepository;

    @Autowired
    UserScoresRepository userScoresRepository;

    @Autowired
    UserRepository userRepository;

    public Question createQuestion(QuestionCreateRequest questionCreateRequest){
        Optional<Club> club = clubRepository.findById(questionCreateRequest.getClubId());
        if(!club.isPresent()){
            throw new ClubOperationFlowException("Club does not exists!");
        }
        Question question = new Question();
        question.setClub(clubRepository.findById(questionCreateRequest.getClubId()).get());
        System.out.println("questionCreateRequest.getQuestion()");
        System.out.println(questionCreateRequest.getQuestion());
        question.setQuestion(questionCreateRequest.getQuestion());

        Set<Answers> questionAnswers = new HashSet<>();
        for(AnswerPayload payload : questionCreateRequest.getAnswers()){
            Answers answers = new Answers(payload.getAnswer(),payload.getScore(),question);
            //answersRepository.save(answers);
            questionAnswers.add(answers);
        }
        question.setAnswers(questionAnswers);
        questionRepository.save(question);
        for(Answers answers : questionAnswers){
            answersRepository.save(answers);
        }
        return question;

    }

    public List<Question> getQuestions(){
        return questionRepository.findAll();
    }

    public QuestionsAnswerRequest answerQuestions(QuestionsAnswerRequest questionsAnswerRequest){
        Long userId = questionsAnswerRequest.getUserId();
        List<QuestionsAnswerPayload> questionsAnswerPayloads = questionsAnswerRequest.getAnswerPayloads();
        for(QuestionsAnswerPayload payload : questionsAnswerPayloads){
            UserScores userScores = new UserScores(userId,payload.getClubId(),payload.getTotalScore());
            if(payload.getTotalScore()>=50){
                Optional<Club> club = clubRepository.findById(payload.getClubId());
                Set<User> members = club.get().getMembers();
                members.add(userRepository.findById(userId).get());
                club.get().setMembers(members);
                clubRepository.save(club.get());
            }

            userScoresRepository.save(userScores);
        }
        return questionsAnswerRequest;
    }

    public List<UserScores> getUserScores(Long userId){
        return userScoresRepository.findAllByUserId(userId);
    }
}

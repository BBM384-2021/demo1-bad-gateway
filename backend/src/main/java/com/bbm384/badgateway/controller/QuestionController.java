package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.model.Question;
import com.bbm384.badgateway.payload.QuestionCreateRequest;
import com.bbm384.badgateway.payload.QuestionsAnswerRequest;
import com.bbm384.badgateway.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${app.api_path}/question")
public class QuestionController {
    @Autowired
    QuestionService questionService;

    @PostMapping("/create")
    public Question createQuestion(@RequestBody QuestionCreateRequest questionCreateRequest){
        return questionService.createQuestion(questionCreateRequest);
    }

    @GetMapping("/list")
    public List<Question> getQuestions(){
        return questionService.getQuestions();
    }

    @PostMapping("/answer")
    public QuestionsAnswerRequest answerQuestions(@RequestBody QuestionsAnswerRequest questionsAnswerRequest){
        return questionService.answerQuestions(questionsAnswerRequest);
    }
}

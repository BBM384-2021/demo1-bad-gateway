package com.bbm384.badgateway.payload;

import java.util.Set;

public class QuestionCreateRequest {
    private String question;
    private Set<AnswerPayload> answers;
    private Long clubId;

    public QuestionCreateRequest() {
    }

    public QuestionCreateRequest(String question, Set<AnswerPayload> answers, Long clubId) {
        this.question = question;
        this.answers = answers;
        this.clubId = clubId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Set<AnswerPayload> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<AnswerPayload> answers) {
        this.answers = answers;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }
}

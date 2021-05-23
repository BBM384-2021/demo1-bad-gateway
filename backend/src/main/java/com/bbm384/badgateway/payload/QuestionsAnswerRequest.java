package com.bbm384.badgateway.payload;

import java.util.List;

public class QuestionsAnswerRequest {
    private Long userId;
    private List<QuestionsAnswerPayload> answerPayloads;

    public QuestionsAnswerRequest(Long userId, List<QuestionsAnswerPayload> answerPayloads) {
        this.userId = userId;
        this.answerPayloads = answerPayloads;
    }

    public QuestionsAnswerRequest() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<QuestionsAnswerPayload> getAnswerPayloads() {
        return answerPayloads;
    }

    public void setAnswerPayloads(List<QuestionsAnswerPayload> answerPayloads) {
        this.answerPayloads = answerPayloads;
    }
}

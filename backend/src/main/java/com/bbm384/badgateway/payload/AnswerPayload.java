package com.bbm384.badgateway.payload;

public class AnswerPayload {
    private String answer;
    private int score;

    public AnswerPayload() {
    }

    public AnswerPayload(String answer, int score) {
        this.answer = answer;
        this.score = score;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}

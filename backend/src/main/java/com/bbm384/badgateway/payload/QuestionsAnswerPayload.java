package com.bbm384.badgateway.payload;

public class QuestionsAnswerPayload {
    private Long clubId;
    private int totalScore;

    public QuestionsAnswerPayload(Long clubId, int totalScore) {
        this.clubId = clubId;
        this.totalScore = totalScore;
    }

    public QuestionsAnswerPayload() {
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }
}

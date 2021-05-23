package com.bbm384.badgateway.model;

import com.querydsl.core.annotations.QueryEntity;

import javax.persistence.*;

@Entity
@QueryEntity
@Table(name = "USER_SCORES")
public class UserScores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long userId;

    @Column
    private Long clubId;

    @Column
    private int score;

    public UserScores(Long userId, Long clubId, int score) {
        this.userId = userId;
        this.clubId = clubId;
        this.score = score;
    }

    public UserScores() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}

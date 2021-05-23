package com.bbm384.badgateway.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.querydsl.core.annotations.QueryEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@QueryEntity
@Table(name = "ANSWERS")
public class Answers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    @Size(max = 50)
    private String answer;

    @NotNull
    @Column(name = "SCORE")
    private int score;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="question_id", nullable=false)
    private Question question;

    public Answers() {
    }

    public Answers(@Size(max = 50) String answer, @NotNull int score, Question question) {
        this.answer = answer;
        this.score = score;
        this.question = question;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
}

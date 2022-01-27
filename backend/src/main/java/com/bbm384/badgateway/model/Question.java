package com.bbm384.badgateway.model;

import com.querydsl.core.annotations.QueryEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@QueryEntity
@Table(name = "QUESTION")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 200)
    @NotNull
    private String question;

    @OneToMany(mappedBy="question")
    private Set<Answers> answers;

    @ManyToOne
    @JoinColumn(name="club_id", nullable=false)
    private Club club;

    public Question() {
    }

    public Question(@Size(max = 200) @NotNull String question, @NotNull Club club) {
        this.question = question;
        this.club = club;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public Set<Answers> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<Answers> answers) {
        this.answers = answers;
    }
}

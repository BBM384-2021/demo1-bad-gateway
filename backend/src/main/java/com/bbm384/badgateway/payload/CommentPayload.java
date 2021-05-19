package com.bbm384.badgateway.payload;

import com.bbm384.badgateway.model.Club;
import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.User;
import java.time.Instant;

public class CommentPayload {
    private Long id;
    private User sender;
    private String content;
    private Integer rate;
    private Club club;
    private SubClub subClub;
    private Instant sentAt;


    public CommentPayload(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public SubClub getSubClub() {
        return subClub;
    }

    public void setSubClub(SubClub subClub) {
        this.subClub = subClub;
    }

    public Instant getSentAt() {
        return sentAt;
    }

    public void setSentAt(Instant sentAt) {
        this.sentAt = sentAt;
    }
}

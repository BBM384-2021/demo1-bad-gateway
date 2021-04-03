package com.bbm384.badgateway.model;

import com.bbm384.badgateway.model.audit.DateAudit;

import javax.persistence.*;



@Entity
@Table(name = "NOTIFICATIONS")
public class Notification extends DateAudit {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String title;

    @Column(length = 8192)
    private String content;

    private boolean isRead;

    @ManyToOne
    private User user;

    public Notification(){}

    public Notification(User user, String title, String content){
        this.title = title;
        this.content = content;
        this.user = user;
        this.isRead = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean isRead) {
        this.isRead = isRead;
    }

}
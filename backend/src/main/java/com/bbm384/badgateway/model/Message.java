package com.bbm384.badgateway.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.Instant;

@Entity
@Table(name = "MESSAGES")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull
    private User sender;

    @Size(max = 40)
    private String senderName;

    @NotNull @NotBlank
    @Size(max = 512)
    private String message;

    @NotNull
    private Boolean isRead = Boolean.FALSE;

    @CreatedDate
    @NotNull
    private Instant sentAt;

    @LastModifiedDate
    private Instant readAt;

    @ManyToOne
    private User readBy;

    public Message() {

    }

    public Message(User user, String message){
        this.sender = user;
        this.senderName = user.getName();
        this.message = message;

        this.sentAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getSentAt() {
        return sentAt;
    }

    public void setSentAt(Instant sentAt) {
        this.sentAt = sentAt;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getRead() {
        return isRead;
    }

    public void setRead(Boolean read) {
        isRead = read;
    }

    public Instant getReadAt() {
        return readAt;
    }

    public void setReadAt(Instant readAt) {
        this.readAt = readAt;
    }

    public User getReadBy() {
        return readBy;
    }

    public void setReadBy(User readBy) {
        this.readBy = readBy;
    }
}

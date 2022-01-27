package com.bbm384.badgateway.payload;


public class MessageResponse {
    private Long id;
    private String sentAt;
    private String senderName;
    private String senderUsername;
    private String messageType;
    private String message;
    private boolean isRead;
    private String readAt;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getSentAt() { return sentAt; }

    public void setSentAt(String sentAt) { this.sentAt = sentAt; }

    public String getSenderName() { return senderName; }

    public void setSenderName(String senderName) {
        this.senderName = "";
        if(senderName != null) {
            this.senderName = senderName;
        }
    }

    public String getSenderUsername() { return senderUsername; }

    public void setSenderUsername(String senderUsername) { this.senderUsername = senderUsername; }

    public String getMessageType() { return messageType; }

    public void setMessageType(String messageType) { this.messageType = messageType; }

    public String getMessage() { return message; }

    public void setMessage(String message) { this.message = message; }

    public boolean isRead() { return isRead; }

    public void setRead(boolean read) { isRead = read; }

    public String getReadAt() { return readAt; }

    public void setReadAt(String readAt) { this.readAt = readAt; }
}

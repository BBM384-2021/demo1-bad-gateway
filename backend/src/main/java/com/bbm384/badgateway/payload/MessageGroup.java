package com.bbm384.badgateway.payload;


public class MessageGroup {
    private boolean isRead;

    public MessageGroup(boolean isRead){
        this.isRead = isRead;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }
}

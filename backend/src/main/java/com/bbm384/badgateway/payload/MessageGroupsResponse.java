package com.bbm384.badgateway.payload;

import java.util.List;


public class MessageGroupsResponse {
    private boolean isNew;
    private List<MessageGroup> messageGroups;

    public boolean isNew() {
        return isNew;
    }

    public void setNew(boolean aNew) {
        isNew = aNew;
    }

    public List<MessageGroup> getMessageGroups() {
        return messageGroups;
    }

    public void setMessageGroups(List<MessageGroup> messageGroups) {
        this.messageGroups = messageGroups;
    }

}

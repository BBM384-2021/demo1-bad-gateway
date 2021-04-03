package com.bbm384.badgateway.payload;

import javax.validation.constraints.Positive;


public class UpdateNotificationRequest {
    @Positive
    private Long notificationId;

    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }
}

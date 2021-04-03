package com.bbm384.badgateway.util;

import com.bbm384.badgateway.model.Message;
import com.bbm384.badgateway.model.Notification;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.payload.MessageResponse;
import com.bbm384.badgateway.payload.NotificationResponse;
import com.bbm384.badgateway.payload.UserInfo;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;


public class ModelMapper {
    static DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime( FormatStyle.SHORT ).withLocale( Locale.UK )
            .withZone( ZoneId.systemDefault() );

    public static MessageResponse mapToMessageResponse(Message message) {
        User sender = message.getSender();

        String sentAt = "";
        if(message.getSentAt() != null)
            sentAt =    message.getSentAt().toString();

        String readAt = "";
        if(message.getReadAt() != null)
            readAt = message.getReadAt().toString();

        MessageResponse messageResponse = new MessageResponse();
        messageResponse.setId(message.getId());
        messageResponse.setSentAt(sentAt);
        messageResponse.setSenderName(sender.getName());
        messageResponse.setSenderUsername(sender.getUsername());
        messageResponse.setMessage(message.getMessage());
        messageResponse.setRead(message.getRead());
        messageResponse.setReadAt(readAt);

        return messageResponse;
    }

    public static NotificationResponse mapToNotificationResponse(Notification notification) {

        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setId(notification.getId());
        notificationResponse.setTitle(notification.getTitle());
        notificationResponse.setContent(notification.getContent());
        notificationResponse.setRead(notification.isRead());
        notificationResponse.setCreationDateTime(formatter.format(notification.getCreatedAt()));

        return notificationResponse;
    }


    public static UserInfo mapToUserInfoResponse(User user) {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.getId());
        userInfo.setName(user.getName());
        userInfo.setUsername(user.getUsername());
        userInfo.setStatus(user.getStatus());

        return userInfo;
    }

}

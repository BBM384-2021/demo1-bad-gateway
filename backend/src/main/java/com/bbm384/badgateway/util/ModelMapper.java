package com.bbm384.badgateway.util;


import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.payload.*;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;


public class ModelMapper {
    static DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime( FormatStyle.SHORT ).withLocale( Locale.UK )
            .withZone( ZoneId.systemDefault() );


    public static ClubInfoResponse mapToClubInfoResponse(Club club) {
        ClubInfoResponse clubInfoResponse = new ClubInfoResponse();
        clubInfoResponse.setId(club.getId());
        clubInfoResponse.setName(club.getName());
        clubInfoResponse.setCategory(club.getCategory());
        clubInfoResponse.setDescription(club.getDescription());
        clubInfoResponse.setStatus(club.getStatus());
        clubInfoResponse.setMembers(club.getMembers());
        clubInfoResponse.setUpdatedAt(club.getUpdatedAt());
        clubInfoResponse.setUpdatedBy(club.getUpdatedBy());


        return clubInfoResponse;
    }

    public static CategoryPayload mapToCategoryResponse(Category category) {
        CategoryPayload categoryPayload = new CategoryPayload();
        categoryPayload.setId(category.getId());
        categoryPayload.setName(category.getName());

        return categoryPayload;
    }

    public static UserInfo mapToUserInfoResponse(User user) {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.getId());
        userInfo.setName(user.getName());
        userInfo.setUsername(user.getUsername());
        userInfo.setStatus(user.getStatus());
        userInfo.setPhone(user.getPhone());
        userInfo.setEmail(user.getEmail());

        return userInfo;
    }

    public static SubClubPayload mapToSubClubInfoResponse(SubClub subClub) {
        SubClubPayload subClubPayload = new SubClubPayload();
        subClubPayload.setId(subClub.getId());
        subClubPayload.setName(subClub.getName());
        subClubPayload.setParentClub(subClub.getParentClub().getName());
        subClubPayload.setDescription(subClub.getDescription());
        subClubPayload.setCategory(subClub.getCategory().getName());
        subClubPayload.setMembers(subClub.getMembers());
        subClubPayload.setAdmin(subClub.getAdmin().getName());
        subClub.setCreatedAt(subClub.getCreatedAt());
        subClub.setCreatedBy(subClub.getCreatedBy());
        return subClubPayload;
    }

    public static SubClubChatList mapToMessageList(SubClubChat message) {
        SubClubChatList messageList = SubClubChatList.builder()
                .senderName(message.getSenderName())
                .id(message.getId())
                .message(message.getMessage())
                .subClub(message.getSubClub())
                .sentAt(message.getSentAt())
                .readAt(message.getReadAt())
                .sender(mapToUserInfoResponse(message.getSender()))
                .build();
        return messageList;
    }

    public static PrivateMessageList mapToPrivateMessageList(PrivateMessage message) {
        PrivateMessageList messageList = PrivateMessageList.builder()
                .id(message.getId())
                .message(message.getMessage())
                .sentAt(message.getSentAt())
                .sender(mapToUserInfoResponse(message.getSender()))
                .receiver(mapToUserInfoResponse(message.getReceiver()))
                .build();
        return messageList;
    }

    public static CommentPayload mapToCommentInfoResponse(Comment comment) {
        CommentPayload commentPayload = new CommentPayload();
        commentPayload.setId(comment.getId());
        commentPayload.setSender(comment.getSender());
        commentPayload.setContent(comment.getContent());
        commentPayload.setRate(comment.getRate());
        commentPayload.setClub(comment.getClub());
        commentPayload.setSubClub(comment.getSubClub());
        commentPayload.setSentAt(comment.getSentAt());
        return commentPayload;
    }

    public static EventPayload mapToEventPayload(Event event){
        EventPayload eventPayload = EventPayload.builder()
                .id(event.getId())
                .name(event.getName())
                .address(event.getAddress())
                .eventType(event.getEventType())
                .attendees(event.getAttendees())
                .eventDate(event.getEventDate())
                .club(event.getClub())
                .subClub(event.getSubClub())
                .build();
        return eventPayload;
    }
}

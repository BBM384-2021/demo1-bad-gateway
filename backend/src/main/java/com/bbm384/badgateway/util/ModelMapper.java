package com.bbm384.badgateway.util;


import com.bbm384.badgateway.model.Club;
import com.bbm384.badgateway.model.Message;
import com.bbm384.badgateway.model.Notification;
import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.payload.ClubInfoResponse;
import com.bbm384.badgateway.payload.MessageResponse;
import com.bbm384.badgateway.payload.NotificationResponse;
import com.bbm384.badgateway.payload.SubClubPayload;
import com.bbm384.badgateway.payload.UserInfo;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;


public class ModelMapper {
    static DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime( FormatStyle.SHORT ).withLocale( Locale.UK )
            .withZone( ZoneId.systemDefault() );


    public static ClubInfoResponse mapToClubInfoResponse(Club club) {
        ClubInfoResponse clubInfoResponse = new ClubInfoResponse();
        clubInfoResponse.setName(club.getName());
        clubInfoResponse.setCategory(club.getCategory());
        clubInfoResponse.setDescription(club.getDescription());
        clubInfoResponse.setStatus(club.getStatus());
        clubInfoResponse.setMembers(club.getMembers());
        clubInfoResponse.setUpdatedAt(club.getUpdatedAt());
        clubInfoResponse.setUpdatedBy(club.getUpdatedBy());


        return clubInfoResponse;
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
        subClubPayload.setParentClub(subClub.getParentClub());
        subClubPayload.setCategory(subClub.getCategory());
        subClubPayload.setMembers(subClub.getMembers());
        subClubPayload.setAdmin(subClub.getAdmin());
        return subClubPayload;
    }
}

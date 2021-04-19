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
        subClubPayload.setName(subClub.getName());
        subClubPayload.setParentClub(subClub.getParentClub());
        subClubPayload.setCategory(subClub.getCategory());
        subClubPayload.setMembers(subClub.getMembers());
        subClubPayload.setAdmin(subClub.getAdmin());
        subClub.setCreatedAt(subClub.getCreatedAt());
        subClub.setCreatedBy(subClub.getCreatedBy());
        return subClubPayload;
    }
}

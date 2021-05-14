package com.bbm384.badgateway.payload;


import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Builder
public class SubClubChatList {
    private Long id;
    private SubClub subClub;
    private UserInfo sender;
    private String senderName;
    private String message;
    private Instant sentAt;
    private Instant readAt;
}

package com.bbm384.badgateway.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;


@Getter
@Setter
@Builder
public class PrivateMessageList {
    private Long id;
    private UserInfo sender;
    private UserInfo receiver;
    private String message;
    private Instant sentAt;
}

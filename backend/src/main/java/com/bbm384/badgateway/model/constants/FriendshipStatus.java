package com.bbm384.badgateway.model.constants;

public enum FriendshipStatus {
    ACCEPTED ("ACCEPTED"),
    WAITING ("WAITING"),
    REJECTED ("REJECTED");

    private final String value;

    FriendshipStatus(final String newValue) { value=newValue; }

    public String getValue() { return value; }

}

package com.bbm384.badgateway.model.constants;

public enum UserType {
    ADMIN ("ADMIN"),
    MEMBER ("MEMBER"),
    SUB_CLUB_ADMIN ("SUB_CLUB_ADMIN");

    private final String value;

    UserType(final String newValue) { value=newValue; }

    public String getValue() { return value; }
}

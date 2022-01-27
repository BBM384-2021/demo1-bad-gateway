package com.bbm384.badgateway.model.constants;


public enum UserRole {
    ADMIN ("ADMIN"),
    MEMBER ("MEMBER"),
    SUB_CLUB_ADMIN ("SUB_CLUB_ADMIN");

    private final String value;

    UserRole(final String newValue) {
        value = newValue;
    }

    public String getValue() { return value; }
}

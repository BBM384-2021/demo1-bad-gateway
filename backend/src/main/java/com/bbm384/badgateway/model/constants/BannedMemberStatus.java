package com.bbm384.badgateway.model.constants;

public enum BannedMemberStatus {
    ACTIVE ("ACTIVE"),
    BANNED ("BANNED"),
    DISMISSED ("DISMISSED");

    private final String value;

    BannedMemberStatus(final String newValue) { value=newValue; }

    public String getValue() { return value; }
}

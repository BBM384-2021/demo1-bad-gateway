package com.bbm384.badgateway.model.constants;

public enum ClubStatus {
    ACTIVE("ACTIVE"),
    PASSIVE("PASSIVE");

    private final String value;

    ClubStatus(final String value) {
        this.value = value;
    }

    public String getValue() { return value; }
}

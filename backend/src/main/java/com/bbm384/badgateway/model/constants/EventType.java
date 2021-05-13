package com.bbm384.badgateway.model.constants;

public enum EventType {
    ONLINE ("ONLINE"),
    OFFLINE ("OFFLINE");

    private final String value;

    EventType(final String newValue) { value=newValue; }

    public String getValue() { return value; }
}

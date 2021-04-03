package com.bbm384.badgateway.payload;

import com.bbm384.badgateway.model.constants.UserStatus;


public class UserInfo {
    private Long id;
    private String username;
    private String name;
    private boolean isCentral;
    private UserStatus status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCentral() {
        return isCentral;
    }

    public void setCentral(boolean central) {
        isCentral = central;
    }

    public UserStatus getStatus() { return status; }

    public void setStatus(UserStatus status) { this.status = status; }

}

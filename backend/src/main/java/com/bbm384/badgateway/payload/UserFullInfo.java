package com.bbm384.badgateway.payload;


import com.bbm384.badgateway.model.MemberBan;

import java.util.HashMap;
import java.util.Set;

public class UserFullInfo {
    private Long id;
    private String username;
    private String name;
    private String email;
    private String phone;
    private HashMap<String, String> bans;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public HashMap<String, String> getBans() {
        return bans;
    }

    public void setBans(HashMap<String, String> bans) {
        this.bans = bans;
    }
}

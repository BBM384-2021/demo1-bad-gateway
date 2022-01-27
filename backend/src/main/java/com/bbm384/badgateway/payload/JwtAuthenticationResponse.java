package com.bbm384.badgateway.payload;

import com.bbm384.badgateway.model.UserScores;

import java.util.ArrayList;
import java.util.List;

public class JwtAuthenticationResponse {
    private String token;
    private String tokenType = "Bearer";
    private String[] roles;
    private List<UserScores> userScores;

    public JwtAuthenticationResponse(String token, String[] roles) {
        this.token = token;
        this.roles = roles;
        this.userScores = new ArrayList<>();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    public List<UserScores> getUserScores() {
        return userScores;
    }

    public void setUserScores(List<UserScores> userScores) {
        this.userScores = userScores;
    }
}

package com.bbm384.badgateway.payload;

public class JwtAuthenticationResponse {
    private String token;
    private String tokenType = "Bearer";
    private String[] roles;

    public JwtAuthenticationResponse(String token, String[] roles) {
        this.token = token;
        this.roles = roles;
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
}

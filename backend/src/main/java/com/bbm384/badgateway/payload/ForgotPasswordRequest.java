package com.bbm384.badgateway.payload;

import javax.validation.constraints.NotBlank;

public class ForgotPasswordRequest {
    @NotBlank
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

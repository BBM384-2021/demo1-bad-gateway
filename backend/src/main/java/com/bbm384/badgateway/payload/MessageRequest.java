package com.bbm384.badgateway.payload;

import javax.validation.constraints.NotBlank;


public class MessageRequest {
    @NotBlank
    private String message;

    public String getMessage() { return message; }

    public void setMessage(String message) { this.message = message; }
}

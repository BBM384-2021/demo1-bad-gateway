package com.bbm384.badgateway.payload;

public class ApiResponse {
    private Boolean success;
    private String message;
    private Long userId;

    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
        this.userId = Long.valueOf(0);
    }

    public ApiResponse(){

    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}

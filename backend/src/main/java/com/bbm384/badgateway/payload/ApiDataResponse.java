package com.bbm384.badgateway.payload;


public class ApiDataResponse<T> extends ApiResponse {
    private T data;

    public ApiDataResponse(Boolean success, String message) {
        super(success, message);
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}

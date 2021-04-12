package com.bbm384.badgateway.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class ClubOperationFlowException extends RuntimeException {
    public ClubOperationFlowException(String message) {
        super(message);
    }

    public ClubOperationFlowException(String message, Throwable cause) {
        super(message, cause);
    }
}
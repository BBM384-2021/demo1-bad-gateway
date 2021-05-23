package com.bbm384.badgateway.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class EventOperationFlowException extends RuntimeException {
    public EventOperationFlowException(String message) {
        super(message);
    }

    public EventOperationFlowException(String message, Throwable cause) {
        super(message, cause);
    }
}
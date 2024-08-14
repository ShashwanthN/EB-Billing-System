package com.tangedco.spring.eb_billing_system.security;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("statusCode", HttpStatus.CONFLICT.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }


}

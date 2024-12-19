package com.tangedco.spring.eb_billing_system.security;

public class AadharIdAlreadyExistsException extends RuntimeException {
    public AadharIdAlreadyExistsException(String message) {
        super(message);
    }
}

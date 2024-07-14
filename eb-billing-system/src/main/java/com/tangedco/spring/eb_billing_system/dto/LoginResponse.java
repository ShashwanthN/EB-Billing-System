package com.tangedco.spring.eb_billing_system.dto;
import com.tangedco.spring.eb_billing_system.entity.User;
public class LoginResponse {
    private String message;
    private User user;

    // Constructor
    public LoginResponse(String message, User user) {
        this.message = message;
        this.user = user;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
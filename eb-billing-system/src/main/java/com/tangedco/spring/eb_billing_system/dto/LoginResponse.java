package com.tangedco.spring.eb_billing_system.dto;

import com.tangedco.spring.eb_billing_system.entity.User;

public class LoginResponse {
    private String message;
    private User user;
    private String token;

    public LoginResponse(String message, User user, String token) {
        this.message = message;
        this.user = user;
        this.token = token;
    }

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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

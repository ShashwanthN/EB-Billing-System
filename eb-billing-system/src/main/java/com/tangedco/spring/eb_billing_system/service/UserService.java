package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.dto.LoginRequest;
import com.tangedco.spring.eb_billing_system.dto.LoginResponse;
import com.tangedco.spring.eb_billing_system.entity.User;

public interface UserService {
    User findById(int theId);
    User registerUser(User user);
    LoginResponse loginUser(LoginRequest loginRequest);
}
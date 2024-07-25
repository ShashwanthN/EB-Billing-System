package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.dto.LoginRequest;
import com.tangedco.spring.eb_billing_system.dto.LoginResponse;
import com.tangedco.spring.eb_billing_system.entity.User;

public interface UserService {

    User findById(String theId);
    User registerUser(User user);

    User resetPassword(String email, String password);

    User updateUser(String userId, String email, String phoneNumber);

    LoginResponse loginUser(LoginRequest loginRequest);
}
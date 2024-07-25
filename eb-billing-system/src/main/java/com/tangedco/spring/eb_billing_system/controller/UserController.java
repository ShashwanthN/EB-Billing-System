package com.tangedco.spring.eb_billing_system.controller;

import com.tangedco.spring.eb_billing_system.dto.*;
import com.tangedco.spring.eb_billing_system.entity.User;
import com.tangedco.spring.eb_billing_system.security.AadharIdAlreadyExistsException;
import com.tangedco.spring.eb_billing_system.service.OtpService;
import com.tangedco.spring.eb_billing_system.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private final OtpService otpService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @PostMapping("/otp/validate")
    public OtpInfoResponse validateOtp(@RequestBody OtpValidationRequest otpValidationRequest) {
        return otpService.validateOtp(otpValidationRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegistrationRequest userRegistrationRequest) {
        OtpValidationRequest otpValidationRequest = userRegistrationRequest.getOtpValidationRequest();
        OtpInfoResponse otpInfoResponse = otpService.validateOtp(otpValidationRequest);

        if (otpInfoResponse.getStatusCode() == 200) {
            User registeredUser = userService.registerUser(userRegistrationRequest.getUser());
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/update")
    public ResponseEntity<User> updateUser(
            @RequestParam("userId") String userId,
            @RequestParam("email") String email,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestBody OtpValidationRequest otpValidationRequest) {

        if (otpValidationRequest == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        OtpInfoResponse otpInfoResponse = otpService.validateOtp(otpValidationRequest);

        if (otpInfoResponse.getStatusCode() == 200) {
            logger.info("Updating user with userId: " + userId);
            User updatedUser = userService.updateUser(userId, email, phoneNumber);
            if (updatedUser != null) {
                return ResponseEntity.ok(updatedUser);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping(value = "/update", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<User> updateUserForm(
            @RequestParam("userId") String userId,
            @RequestParam("email") String email,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestBody OtpValidationRequest otpValidationRequest) {

        if (otpValidationRequest == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        OtpInfoResponse otpInfoResponse = otpService.validateOtp(otpValidationRequest);

        if (otpInfoResponse.getStatusCode() == 200) {
            logger.info("Updating user with userId: " + userId);
            User updatedUser = userService.updateUser(userId, email, phoneNumber);
            if (updatedUser != null) {
                return ResponseEntity.ok(updatedUser);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        logger.info("Logging in user with userId: " + loginRequest.getUserId());
        LoginResponse response = userService.loginUser(loginRequest);
        if (response.getUser() != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @ExceptionHandler(AadharIdAlreadyExistsException.class)
    public ResponseEntity<String> handleAadharIdAlreadyExistsException(AadharIdAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
}
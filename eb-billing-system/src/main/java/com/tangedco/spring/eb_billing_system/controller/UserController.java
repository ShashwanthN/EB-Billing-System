package com.tangedco.spring.eb_billing_system.controller;

import com.tangedco.spring.eb_billing_system.dao.UserRepository;
import com.tangedco.spring.eb_billing_system.dto.*;
import com.tangedco.spring.eb_billing_system.entity.User;
import com.tangedco.spring.eb_billing_system.security.AadharIdAlreadyExistsException;
import com.tangedco.spring.eb_billing_system.security.EmailAlreadyExistsException;
import com.tangedco.spring.eb_billing_system.service.OtpService;
import com.tangedco.spring.eb_billing_system.service.UserService;
import com.tangedco.spring.eb_billing_system.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private JwtUtil jwtUtil;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final OtpService otpService;
    private final UserService userService;
    private UserRepository userRepository;

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

    @PostMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        Optional<User> userByEmail = userRepository.findByEmail(email);

        if (userByEmail.isPresent()) {

            throw new EmailAlreadyExistsException("Email already exists");
        }


        return ResponseEntity.ok(false);
    }
    @PostMapping("/validateToken")
    public ResponseEntity<Boolean> validateToken(@RequestBody ValidateTokenRequest validateTokenRequest) {
        String token = validateTokenRequest.getToken();

        boolean isValidToken = jwtUtil.validateToken(token);

        if (isValidToken) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<User> updateUser(
            @RequestBody UpdateUserRequest updateUserRequest) {
        
        
        if (updateUserRequest == null || updateUserRequest.getOtpValidationRequest() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
       
        OtpInfoResponse otpInfoResponse = otpService.validateOtp(updateUserRequest.getOtpValidationRequest());

        if (otpInfoResponse.getStatusCode() == 200) {
            logger.info("Updating user with userId: " + updateUserRequest.getUserId());
            User updatedUser = userService.updateUser(updateUserRequest.getUserId(), updateUserRequest.getEmail(), updateUserRequest.getPhoneNumber());
            if (updatedUser != null) {
                return ResponseEntity.ok(updatedUser);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<User> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        if (resetPasswordRequest == null || resetPasswordRequest.getOtpValidationRequest() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String email = resetPasswordRequest.getEmail();

        OtpInfoResponse otpInfoResponse = otpService.validateOtp(resetPasswordRequest.getOtpValidationRequest());

        if (otpInfoResponse.getStatusCode() == 200) {
            logger.info("Updating password for email: " + email);
            User updatedUser = userService.resetPassword(email, resetPasswordRequest.getPassword());
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

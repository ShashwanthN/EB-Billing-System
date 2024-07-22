package com.tangedco.spring.eb_billing_system.controller;
import com.tangedco.spring.eb_billing_system.dto.LoginRequest;
import com.tangedco.spring.eb_billing_system.dto.LoginResponse;
import com.tangedco.spring.eb_billing_system.entity.User;
import com.tangedco.spring.eb_billing_system.security.AadharIdAlreadyExistsException;
import com.tangedco.spring.eb_billing_system.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User registerUser(@RequestBody User user) {
        logger.info("Registering user with aadhar ID: " + user.getAadharId());
        return userService.registerUser(user);
    }
    @PostMapping("update/{userId}/{email}/{phoneNumber}")
    public User updateUser( @RequestParam("userId") String userId,
                           @RequestParam("email") String email,
                           @RequestParam("phoneNumber") String phoneNumber
                           ) {

        return userService.updateUser(userId,email, phoneNumber);
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
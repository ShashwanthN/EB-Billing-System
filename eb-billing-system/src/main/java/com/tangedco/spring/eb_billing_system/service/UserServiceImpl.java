package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.dao.UserRepository;
import com.tangedco.spring.eb_billing_system.dto.LoginRequest;
import com.tangedco.spring.eb_billing_system.dto.LoginResponse;
import com.tangedco.spring.eb_billing_system.entity.User;
import com.tangedco.spring.eb_billing_system.security.AadharIdAlreadyExistsException;
import com.tangedco.spring.eb_billing_system.security.InvalidPasswordException;
import com.tangedco.spring.eb_billing_system.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public User findById(String theId) {
        Optional<User> result = userRepository.findById(theId);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new RuntimeException("Did not find user id - " + theId);
        }
    }

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByAadharId(user.getAadharId())) {
            throw new AadharIdAlreadyExistsException("aadhar ID already exists");
        }

        validatePassword(user.getPassword());

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        String lastFourAadhar = user.getAadharId().substring(user.getAadharId().length() - 4);
        int maxUserIdSuffix = userRepository.findMaxUserIdSuffix();
        String customUserId = lastFourAadhar + String.format("%04d", maxUserIdSuffix + 1);

        user.setUserId(customUserId);
        return userRepository.save(user);
    }
    @Override
    public User resetPassword(String email, String password) {


        validatePassword(password);

        String encodedPassword = passwordEncoder.encode(password);

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(encodedPassword);
            userRepository.save(user);
            return user;
        }
        return null;
    }

    @Override
    public User updateUser(String userId, String email, String phoneNumber) {
        Optional<User> userOptional = userRepository.findByUserId(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setEmail(email);
            user.setPhoneNumber(phoneNumber);
            userRepository.save(user);
            return user;
        }
        return null;
    }

    @Override
    public LoginResponse loginUser(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUserId(loginRequest.getUserId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user.getUserId());
                return new LoginResponse("Login successful", user, token);
            } else {
                return new LoginResponse("Invalid credentials", null, null);
            }
        } else {
            return new LoginResponse("User not found", null, null);
        }
    }

    private void validatePassword(String password) {
        String passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        if (!Pattern.matches(passwordPattern, password)) {
            throw new InvalidPasswordException("Password does not meet the required criteria");
        }
    }
}

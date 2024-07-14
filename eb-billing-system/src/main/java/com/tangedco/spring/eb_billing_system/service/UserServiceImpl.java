package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.dao.UserRepository;
import com.tangedco.spring.eb_billing_system.dto.LoginRequest;
import com.tangedco.spring.eb_billing_system.dto.LoginResponse;
import com.tangedco.spring.eb_billing_system.entity.User;
import com.tangedco.spring.eb_billing_system.security.AadharIdAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findById(int theId) {
        Optional<User> result = userRepository.findById((long) theId);

        User theUser;

        if (result.isPresent()) {
            theUser = result.get();
        } else {
            throw new RuntimeException("Did not find user id - " + theId);
        }

        return theUser;
    }

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByAadharId(user.getAadharId())) {
            throw new AadharIdAlreadyExistsException("Aadhar ID already exists");
        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        // Generate custom user ID
        String lastFourAadhar = user.getAadharId().substring(user.getAadharId().length() - 4);
        int maxUserId = userRepository.findMaxUserIdSuffix();
        String customUserId = lastFourAadhar + String.format("%04d", maxUserId + 1);
        user.setUserId(customUserId);

        return userRepository.save(user);
    }

    @Override
    public LoginResponse loginUser(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUserId(loginRequest.getUserId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return new LoginResponse("Login successful", user);
            } else {
                return new LoginResponse("Invalid credentials", null);
            }
        } else {
            return new LoginResponse("User not found", null);
        }
    }

}

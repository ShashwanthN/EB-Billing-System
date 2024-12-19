package com.tangedco.spring.eb_billing_system.dto;

import com.tangedco.spring.eb_billing_system.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationRequest {
    private User user;
    private OtpValidationRequest otpValidationRequest;
}

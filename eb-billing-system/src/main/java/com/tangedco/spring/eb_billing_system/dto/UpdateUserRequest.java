package com.tangedco.spring.eb_billing_system.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String userId;
    private String email;
    private String phoneNumber;
    private OtpValidationRequest otpValidationRequest;
}

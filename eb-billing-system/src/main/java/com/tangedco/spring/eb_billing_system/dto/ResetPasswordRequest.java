package com.tangedco.spring.eb_billing_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ResetPasswordRequest {
    private String email;
    private String password;
    private OtpValidationRequest otpValidationRequest;
}

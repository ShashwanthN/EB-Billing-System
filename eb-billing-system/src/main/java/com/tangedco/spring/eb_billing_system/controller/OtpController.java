package com.tangedco.spring.eb_billing_system.controller;

import com.tangedco.spring.eb_billing_system.dto.OtpInfoResponse;
import com.tangedco.spring.eb_billing_system.dto.OtpRequest;
import com.tangedco.spring.eb_billing_system.dto.OtpValidationRequest;
import com.tangedco.spring.eb_billing_system.service.OtpService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/get/otp")
@AllArgsConstructor
public class OtpController {

    private final OtpService otpService;
    @PostMapping("/sendOtpForVerification")
    public OtpInfoResponse sendOtp(@RequestBody OtpRequest otpRequest) {
        return otpService.sendOtp(otpRequest);
    }
    @PostMapping("/sendOtp")
    public OtpInfoResponse sendOtpForRegistration(@RequestBody OtpRequest otpRequest) {
        return otpService.sendOtpForRegistration(otpRequest);
    }

    @PostMapping("/validateOtp")
    public OtpInfoResponse validateOtp(@RequestBody OtpValidationRequest otpValidationRequest){
        return otpService.validateOtp(otpValidationRequest);
    }
}

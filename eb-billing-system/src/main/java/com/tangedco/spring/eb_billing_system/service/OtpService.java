package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.dao.OtpRepository;
import com.tangedco.spring.eb_billing_system.dto.*;
import com.tangedco.spring.eb_billing_system.entity.Otp;
import com.tangedco.spring.eb_billing_system.utils.AppUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class OtpService {
    private final OtpRepository otpRepository;
    private final EmailService emailService;

    public OtpInfoResponse sendOtp(OtpRequest otpRequest) {
        String otp = AppUtils.generateOtp();
        log.info("otp: {}", otp);
        otpRepository.save(Otp.builder()
                .email(otpRequest.getEmail())
                .otp(otp)
                .expiredAt(LocalDateTime.now().plusMinutes(2))
                .build());

        emailService.sendEmail(EmailDetails.builder()
                .subject("Email Verification")
                .recipient(otpRequest.getEmail())
                .messageBody("this is to verify the email that you have provided at TANGEDCO. Use this OTP to confirm. " + otp + " *note that the otp expires in 2 minutes")
                .build());
        return OtpInfoResponse.builder()
                .statusCode(200)
                .responseMessage("success")
                .build();
    }

    public OtpInfoResponse validateOtp(OtpValidationRequest otpValidationRequest) {
        List<Otp> otps = otpRepository.findByEmail(otpValidationRequest.getEmail());
        log.info("Email " + otpValidationRequest.getEmail());

        if (otps.isEmpty()) {
            return OtpInfoResponse.builder()
                    .statusCode(400)
                    .responseMessage("You have not sent an OTP")
                    .build();
        }

        Otp otp = otps.get(0);
        for (Otp o : otps) {
            if (o.getExpiredAt().isAfter(otp.getExpiredAt())) {
                otp = o;
            }
        }

        if (otp.getExpiredAt().isBefore(LocalDateTime.now())) {
            return OtpInfoResponse.builder()
                    .statusCode(400)
                    .responseMessage("Expired OTP")
                    .build();
        }

        if (!otp.getOtp().equals(otpValidationRequest.getOtp())) {
            return OtpInfoResponse.builder()
                    .statusCode(400)
                    .responseMessage("Invalid OTP")
                    .build();
        }

        return OtpInfoResponse.builder()
                .statusCode(200)
                .responseMessage("Success")
                .otpResponse(OtpResponse.builder()
                        .isOtpValid(true)
                        .build())
                .build();
    }
}

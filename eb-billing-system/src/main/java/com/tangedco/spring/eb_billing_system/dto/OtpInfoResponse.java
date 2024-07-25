package com.tangedco.spring.eb_billing_system.dto;

import com.tangedco.spring.eb_billing_system.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OtpInfoResponse {

    private int statusCode;
    private String responseMessage;
    private User userInfo;
    private OtpResponse otpResponse;
}

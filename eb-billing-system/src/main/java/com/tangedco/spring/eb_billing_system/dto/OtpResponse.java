package com.tangedco.spring.eb_billing_system.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.tangedco.spring.eb_billing_system.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OtpResponse {

    private int statusCode;
    private String responseMessage;
    private User userInfo;
    private Boolean isOtpValid;

}

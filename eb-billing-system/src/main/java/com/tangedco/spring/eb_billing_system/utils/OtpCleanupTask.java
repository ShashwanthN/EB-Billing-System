package com.tangedco.spring.eb_billing_system.utils;

import com.tangedco.spring.eb_billing_system.dao.OtpRepository;
import com.tangedco.spring.eb_billing_system.entity.Otp;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@AllArgsConstructor
@Slf4j
public class OtpCleanupTask {

    private final OtpRepository otpRepository;

    @Scheduled(fixedRate = 43200000)
    public void cleanUpExpiredOtps() {
        List<Otp> expiredOtps = otpRepository.findByExpiredAtBefore(LocalDateTime.now());
        otpRepository.deleteAll(expiredOtps);
        log.info("Deleted {} expired OTPs", expiredOtps.size());
    }
}

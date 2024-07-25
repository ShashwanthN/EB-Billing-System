package com.tangedco.spring.eb_billing_system.dao;

import com.tangedco.spring.eb_billing_system.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    List<Otp> findByEmail(String email);
    List<Otp> findByExpiredAtBefore(LocalDateTime now);
}

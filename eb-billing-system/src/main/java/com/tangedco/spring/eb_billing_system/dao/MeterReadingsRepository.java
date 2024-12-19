package com.tangedco.spring.eb_billing_system.dao;

import com.tangedco.spring.eb_billing_system.entity.MeterReadings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeterReadingsRepository extends JpaRepository<MeterReadings, Integer> {
    List<MeterReadings> findByUserId(String userId);
    List<MeterReadings> findByPaymentStatus(String paymentStatus);
    List<MeterReadings> findByUserIdAndPaymentStatus(String userId, String paymentStatus);

    MeterReadings findByReadingId(int readingId);
}

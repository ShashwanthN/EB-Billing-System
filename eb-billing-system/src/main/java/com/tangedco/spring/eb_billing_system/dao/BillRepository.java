
package com.tangedco.spring.eb_billing_system.dao;

import com.tangedco.spring.eb_billing_system.entity.Bill;
import com.tangedco.spring.eb_billing_system.entity.MeterReadings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Integer> {
    List<Bill> findByMeterReadingUserId(String userId);
    List<Bill> findByMeterReading_UserIdAndMeterReading_PaymentStatusOrderByBillDateDesc(String userId, String paymentStatus);
    Optional<Bill> findByMeterReading(MeterReadings reading);


    Bill findByMeterReading_ReadingId(int readingId);
}

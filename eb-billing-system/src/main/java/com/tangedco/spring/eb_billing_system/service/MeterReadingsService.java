package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.entity.MeterReadings;
import com.tangedco.spring.eb_billing_system.entity.Bill;
import com.tangedco.spring.eb_billing_system.entity.MeterReadingsWithBill;

import java.util.List;

public interface MeterReadingsService {
    List<MeterReadings> getMeterReadingsByUserId(String userId);

    List<MeterReadings> getUnpaidMeterReadingsByUserId(String userId);

    List<Bill> getBillsByUserId(String userId);
Bill getBillByReadingId(int readingId);
    List<MeterReadingsWithBill> getUnpaidMeterReadingsWithBillsByUserId(String userId);

    MeterReadings getMeterReadingByReadingId(int readingId);

    void saveMeterReading(MeterReadings meter);
}
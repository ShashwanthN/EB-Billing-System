package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.entity.MeterReadings;
import com.tangedco.spring.eb_billing_system.entity.Bill;

import java.util.List;

public interface MeterReadingsService {
    List<MeterReadings> getMeterReadingsByUserId(String userId);

    List<MeterReadings> getUnpaidMeterReadingsByUserId(String userId);

}
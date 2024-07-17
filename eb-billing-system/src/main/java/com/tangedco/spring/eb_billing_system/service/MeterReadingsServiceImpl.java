package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.dao.BillRepository;
import com.tangedco.spring.eb_billing_system.dao.MeterReadingsRepository;
import com.tangedco.spring.eb_billing_system.entity.Bill;
import com.tangedco.spring.eb_billing_system.entity.MeterReadings;
import com.tangedco.spring.eb_billing_system.entity.MeterReadingsWithBill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MeterReadingsServiceImpl implements MeterReadingsService {

    @Autowired
    private MeterReadingsRepository meterReadingsRepository;

    @Autowired
    private BillRepository billRepository;

    @Override
    public List<MeterReadings> getMeterReadingsByUserId(String userId) {
        return meterReadingsRepository.findByUserId(userId);
    }

    @Override
    public List<MeterReadings> getUnpaidMeterReadingsByUserId(String userId) {
        return meterReadingsRepository.findByUserIdAndPaymentStatus(userId, "not_paid");
    }

    @Override
    public List<Bill> getBillsByUserId(String userId) {
        return billRepository.findByMeterReadingUserId(userId);
    }

    public List<MeterReadingsWithBill> getUnpaidMeterReadingsWithBillsByUserId(String userId) {
        List<MeterReadings> unpaidReadings = meterReadingsRepository.findByUserIdAndPaymentStatus(userId, "not_paid");
        List<MeterReadingsWithBill> result = new ArrayList<>();

        for (MeterReadings reading : unpaidReadings) {
            Optional<Bill> bill = billRepository.findByMeterReading(reading);
            result.add(new MeterReadingsWithBill(reading, bill.orElse(null)));
        }

        return result;
    }
}

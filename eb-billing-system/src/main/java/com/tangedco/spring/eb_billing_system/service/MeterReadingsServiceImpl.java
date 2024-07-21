package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.controller.PaymentController;
import com.tangedco.spring.eb_billing_system.dao.BillRepository;
import com.tangedco.spring.eb_billing_system.dao.MeterReadingsRepository;
import com.tangedco.spring.eb_billing_system.entity.Bill;
import com.tangedco.spring.eb_billing_system.entity.MeterReadings;
import com.tangedco.spring.eb_billing_system.entity.MeterReadingsWithBill;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MeterReadingsServiceImpl implements MeterReadingsService {
    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
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

    @Override
    public MeterReadings getMeterReadingByReadingId(int readingId) {
        return meterReadingsRepository.findByReadingId(readingId);
    }
    @Transactional
    public void saveMeterReading(MeterReadings meterReadings) {
        meterReadingsRepository.save(meterReadings);
        logger.info("Meter reading saved to database with reading ID: {}", meterReadings.getReadingId());
    }
    public Bill getBillByReadingId(int readingId) {
        return billRepository.findByMeterReading_ReadingId(readingId);
    }

}

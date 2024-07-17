package com.tangedco.spring.eb_billing_system.controller;

import com.tangedco.spring.eb_billing_system.entity.Bill;
import com.tangedco.spring.eb_billing_system.entity.MeterReadings;
import com.tangedco.spring.eb_billing_system.service.MeterReadingsService;
import com.tangedco.spring.eb_billing_system.entity.MeterReadingsWithBill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/readings")
public class MeterReadingsController {

    @Autowired
    private MeterReadingsService meterReadingsService;

    @GetMapping("/user/{userId}")
    public List<MeterReadings> getMeterReadings(@PathVariable String userId) {
        return meterReadingsService.getMeterReadingsByUserId(userId);
    }

    @GetMapping("/user/{userId}/unpaid")
    public List<MeterReadingsWithBill> getUnpaidMeterReadingsWithBillsByUserId(@PathVariable String userId) {
        return meterReadingsService.getUnpaidMeterReadingsWithBillsByUserId(userId);
    }

    @GetMapping("/user/{userId}/bills")
    public List<Bill> getBillsByUserId(@PathVariable String userId) {
        return meterReadingsService.getBillsByUserId(userId);
    }
}

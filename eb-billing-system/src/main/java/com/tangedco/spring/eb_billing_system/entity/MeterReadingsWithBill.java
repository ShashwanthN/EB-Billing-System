package com.tangedco.spring.eb_billing_system.entity;

public class MeterReadingsWithBill {
    private MeterReadings meterReadings;
    private Bill bill;

    public MeterReadingsWithBill(MeterReadings meterReadings, Bill bill) {
        this.meterReadings = meterReadings;
        this.bill = bill;
    }

    public MeterReadings getMeterReadings() {
        return meterReadings;
    }

    public void setMeterReadings(MeterReadings meterReadings) {
        this.meterReadings = meterReadings;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }
}
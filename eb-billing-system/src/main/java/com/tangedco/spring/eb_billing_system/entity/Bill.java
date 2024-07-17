package com.tangedco.spring.eb_billing_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int billId;

    @ManyToOne
    @JoinColumn(name = "reading_id", nullable = false)
    private MeterReadings meterReading;  // Ensure the field name matches with the getter and setter methods

    @Column(nullable = false)
    private LocalDateTime billDate = LocalDateTime.now();

    @Column(nullable = false)
    private double amount;

    // Getters and setters
    public int getBillId() {
        return billId;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }

    public MeterReadings getMeterReading() {
        return meterReading;
    }

    public void setMeterReading(MeterReadings meterReading) {
        this.meterReading = meterReading;
    }

    public LocalDateTime getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDateTime billDate) {
        this.billDate = billDate;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}

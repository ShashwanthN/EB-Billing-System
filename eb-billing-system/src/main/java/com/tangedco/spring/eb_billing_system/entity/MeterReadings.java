package com.tangedco.spring.eb_billing_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "meter_readings")
public class MeterReadings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reading_id")
    private int readingId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "connection_type", nullable = false)
    private String connectionType;

    @Column(name = "reading_date", nullable = false)
    private LocalDateTime readingDate;

    @Column(name = "units_consumed", nullable = false)
    private int unitsConsumed;

    @Column(name = "payment_status")
    private String paymentStatus;

    public int getReadingId() {
        return readingId;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setReadingId(int readingId) {
        this.readingId = readingId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getConnectionType() {
        return connectionType;
    }

    public void setConnectionType(String connectionType) {
        this.connectionType = connectionType;
    }

    public LocalDateTime getReadingDate() {
        return readingDate;
    }

    public void setReadingDate(LocalDateTime readingDate) {
        this.readingDate = readingDate;
    }

    public int getUnitsConsumed() {
        return unitsConsumed;
    }

    public void setUnitsConsumed(int unitsConsumed) {
        this.unitsConsumed = unitsConsumed;
    }
}

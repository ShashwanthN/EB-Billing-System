package com.tangedco.spring.eb_billing_system.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int billId;

    @ManyToOne
    @JoinColumn(name = "reading_id", nullable = false)
    private MeterReadings meterReading;

    @Column(nullable = false)
    private LocalDateTime billDate = LocalDateTime.now();

    @Column(nullable = false)
    private double amount;

}

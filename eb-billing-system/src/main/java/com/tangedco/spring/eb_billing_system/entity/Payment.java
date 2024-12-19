package com.tangedco.spring.eb_billing_system.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "payments")
@Data
@Getter
@Setter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "bill_id", nullable = false)
    private Bill bill;

    @Column(name = "service_no", nullable = false)
    private long serviceNo;

    @Column(name = "receipt_no", nullable = false)
    private String receiptNo;

    @Column(name = "amount_debited", nullable = false)
    private Double amountDebited;

    @Column(name = "transaction_no", nullable = false)
    private String transactionNo;

    @Column(name = "receipt_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date receiptDate;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "card_type")
    private String cardType;
}

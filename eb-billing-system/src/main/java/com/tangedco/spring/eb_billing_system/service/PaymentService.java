package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.entity.Payment;

public interface PaymentService {
    Payment processPayment(int billId, String paymentMethod, String transactionId);
}

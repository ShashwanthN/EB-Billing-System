package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.entity.Bill;
import com.tangedco.spring.eb_billing_system.entity.Payment;

import java.util.Optional;
import java.util.List;
public interface PaymentService {

    List<Payment> getPaymentsByBillId(int billId);
}

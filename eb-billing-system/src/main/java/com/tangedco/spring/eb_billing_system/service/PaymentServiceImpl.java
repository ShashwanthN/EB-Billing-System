package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.dao.BillRepository;
import com.tangedco.spring.eb_billing_system.dao.MeterReadingsRepository;
import com.tangedco.spring.eb_billing_system.dao.PaymentRepository;
import com.tangedco.spring.eb_billing_system.entity.Bill;
import com.tangedco.spring.eb_billing_system.entity.MeterReadings;
import com.tangedco.spring.eb_billing_system.entity.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private MeterReadingsRepository meterReadingsRepository;

    @Override
    @Transactional
    public Payment processPayment(int billId, String paymentMethod, String transactionId) {
        Optional<Bill> optionalBill = billRepository.findById(billId);
        if (!optionalBill.isPresent()) {
            throw new RuntimeException("Bill not found with ID: " + billId);
        }

        Bill bill = optionalBill.get();
        MeterReadings meterReading = bill.getMeterReading();

        Payment payment = new Payment();
        payment.setBill(bill);
        payment.setAmount(bill.getAmount());
        payment.setPaymentMethod(paymentMethod);
        payment.setTransactionId(transactionId);

        meterReading.setPaymentStatus("paid");
        meterReadingsRepository.save(meterReading);

        return paymentRepository.save(payment);
    }
}

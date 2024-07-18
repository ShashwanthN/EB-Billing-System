package com.tangedco.spring.eb_billing_system.controller;

import com.tangedco.spring.eb_billing_system.dto.PaymentRequest;
import com.tangedco.spring.eb_billing_system.entity.Payment;
import com.tangedco.spring.eb_billing_system.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/payments")
    public ResponseEntity<Payment> processPayment(@RequestBody PaymentRequest paymentRequest) {
        Payment payment = paymentService.processPayment(
                paymentRequest.getBillId(),
                paymentRequest.getPaymentMethod(),
                paymentRequest.getTransactionId()
        );
        return ResponseEntity.ok(payment);
    }


}

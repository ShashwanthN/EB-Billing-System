package com.tangedco.spring.eb_billing_system.dao;

import com.tangedco.spring.eb_billing_system.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
